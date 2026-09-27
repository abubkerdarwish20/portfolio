<script lang="ts">
	// Reactive dot grid. Listens on its parent element, so drop it inside any
	// `relative` container and the whole container becomes interactive.
	const { gap = 26, radius = 150 }: { gap?: number; radius?: number } = $props();

	let canvas: HTMLCanvasElement;

	$effect(() => {
		const ctx = canvas.getContext('2d');
		const host = canvas.parentElement;
		if (!ctx || !host) return;

		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const pointer = { x: 0, y: 0, active: false };
		const ripples: Array<{ x: number; y: number; t: number }> = [];
		let pts: Array<{ x: number; y: number; ox: number; oy: number; f: number }> = [];
		let w = 0;
		let h = 0;
		let visible = true;
		let raf = 0;

		const local = (e: PointerEvent) => {
			const r = canvas.getBoundingClientRect();
			return { x: e.clientX - r.left, y: e.clientY - r.top };
		};
		const onMove = (e: PointerEvent) => Object.assign(pointer, local(e), { active: true });
		const onLeave = () => (pointer.active = false);
		const onDown = (e: PointerEvent) => ripples.push({ ...local(e), t: performance.now() });

		function resize() {
			const r = canvas.getBoundingClientRect();
			const dpr = Math.min(devicePixelRatio, 2);
			w = r.width;
			h = r.height;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			pts = [];
			for (let y = gap / 2; y < h; y += gap)
				for (let x = gap / 2; x < w; x += gap) pts.push({ x, y, ox: 0, oy: 0, f: 0 });
			draw(performance.now());
		}

		function draw(now: number) {
			const dark = document.documentElement.classList.contains('dark');
			const [br, bg, bb] = dark ? [255, 255, 255] : [15, 23, 42];
			ctx!.clearRect(0, 0, w, h);

			// Idle: a virtual pointer drifts on a Lissajous path so the field never looks dead
			const px = pointer.active ? pointer.x : w * (0.62 + 0.28 * Math.sin(now / 2800));
			const py = pointer.active ? pointer.y : h * (0.5 + 0.25 * Math.sin(now / 1900));

			for (let i = ripples.length - 1; i >= 0; i--)
				if (now - ripples[i].t > 1500) ripples.splice(i, 1);

			for (const p of pts) {
				const dx = p.x - px;
				const dy = p.y - py;
				const d = Math.hypot(dx, dy) || 1;
				let f = d < radius ? 1 - d / radius : 0;
				f = f * f * (3 - 2 * f);
				let tx = (dx / d) * f * 26;
				let ty = (dy / d) * f * 26;

				for (const r of ripples) {
					const age = now - r.t;
					const rdx = p.x - r.x;
					const rdy = p.y - r.y;
					const rd = Math.hypot(rdx, rdy) || 1;
					const band = Math.max(0, 1 - Math.abs(rd - age * 0.8) / 45) * Math.max(0, 1 - age / 1500);
					if (band > 0) {
						tx += (rdx / rd) * band * 14;
						ty += (rdy / rd) * band * 14;
						f = Math.max(f, band);
					}
				}

				if (reduce) {
					p.ox = p.oy = p.f = 0;
				} else {
					p.ox += (tx - p.ox) * 0.12;
					p.oy += (ty - p.oy) * 0.12;
					p.f += (f - p.f) * 0.15;
				}

				const k = p.f;
				const r = Math.round(br + (234 - br) * k);
				const g = Math.round(bg + (88 - bg) * k);
				const b = Math.round(bb + (12 - bb) * k);
				ctx!.fillStyle = `rgba(${r},${g},${b},${Math.min(1, (dark ? 0.16 : 0.14) + k * 0.95)})`;
				ctx!.beginPath();
				ctx!.arc(p.x + p.ox, p.y + p.oy, 1.1 + k * 2.6, 0, Math.PI * 2);
				ctx!.fill();
			}
		}

		function loop(now: number) {
			if (visible) draw(now);
			raf = requestAnimationFrame(loop);
		}

		const ro = new ResizeObserver(resize);
		ro.observe(canvas);
		const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
		io.observe(canvas);
		// Repaint on theme flips even when the loop is paused or disabled
		const mo = new MutationObserver(() => draw(performance.now()));
		mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

		host.addEventListener('pointermove', onMove);
		host.addEventListener('pointerleave', onLeave);
		host.addEventListener('pointerdown', onDown);
		if (!reduce) raf = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
			mo.disconnect();
			host.removeEventListener('pointermove', onMove);
			host.removeEventListener('pointerleave', onLeave);
			host.removeEventListener('pointerdown', onDown);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="field pointer-events-none absolute inset-0 h-full w-full"
	aria-hidden="true"
></canvas>

<style>
	.field {
		mask-image: radial-gradient(ellipse 85% 80% at 55% 50%, #000 35%, transparent 90%);
	}
</style>
