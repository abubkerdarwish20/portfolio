<script lang="ts">
	import { skills, type Category } from './skills';

	const { focus = null }: { focus?: Category | null } = $props();

	// Evenly spread points on a unit sphere (Fibonacci lattice)
	const N = skills.length;
	const golden = Math.PI * (3 - Math.sqrt(5));
	const points = skills.map((s, i) => {
		const y = 1 - (i / (N - 1)) * 2;
		const r = Math.sqrt(1 - y * y);
		return { ...s, x: Math.cos(golden * i) * r, y, z: Math.sin(golden * i) * r };
	});

	// Rotation that brings a category's centroid to the front (+z, facing the viewer)
	const facing = Object.fromEntries(
		(['core', 'frameworks', 'backend', 'quality'] as Category[]).map((id) => {
			const members = points.filter((p) => p.category === id);
			const c = members.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y, z: a.z + p.z }), {
				x: 0,
				y: 0,
				z: 0
			});
			const r = Math.hypot(c.x, c.z);
			return [id, { ay: Math.atan2(-c.x, c.z), ax: Math.atan2(c.y, r) }];
		})
	) as Record<Category, { ax: number; ay: number }>;

	const clampX = (v: number) => Math.max(-1.2, Math.min(1.2, v));

	let size = $state(420);
	let rot = $state({ ax: -0.3, ay: 0 });
	let hovered = $state<string | null>(null);
	let dragging = $state(false);

	let vel = { x: 0, y: 0.00035 };
	let last = { x: 0, y: 0, t: 0 };

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let raf = 0;
		let prev = performance.now();
		const loop = (now: number) => {
			const dt = Math.min(now - prev, 50);
			prev = now;
			if (!dragging) {
				if (focus) {
					// Ease toward the category's facing angle, taking the shortest way round
					const target = facing[focus];
					const turns = Math.round((rot.ay - target.ay) / (Math.PI * 2));
					const ay = target.ay + turns * Math.PI * 2;
					rot = {
						ax: rot.ax + (clampX(target.ax) - rot.ax) * 0.07,
						ay: rot.ay + (ay - rot.ay) * 0.07
					};
					vel = { x: 0, y: 0 };
				} else {
					// Inertia decays back to a slow idle spin; hovering nearly stops it
					const idle = hovered ? 0.00004 : 0.00035;
					vel.y += (idle - vel.y) * 0.03;
					vel.x += (0 - vel.x) * 0.03;
					rot = { ax: clampX(rot.ax + vel.x * dt), ay: rot.ay + vel.y * dt };
				}
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	});

	const projected = $derived.by(() => {
		const R = size * 0.38;
		const [cx, sx, cy, sy] = [
			Math.cos(rot.ax),
			Math.sin(rot.ax),
			Math.cos(rot.ay),
			Math.sin(rot.ay)
		];
		return points.map((p) => {
			const x1 = p.x * cy + p.z * sy;
			const z1 = -p.x * sy + p.z * cy;
			const y1 = p.y * cx - z1 * sx;
			const z2 = p.y * sx + z1 * cx;
			const depth = (z2 + 1) / 2;
			const lit = focus === p.category;
			const dim = focus !== null && !lit;
			return {
				...p,
				lit,
				sx: x1 * R,
				sy: y1 * R,
				scale: (0.55 + depth * 0.6) * (lit ? 1.12 : 1),
				// Focused skills stay legible even when they sit on the far side
				opacity: dim ? 0.12 : lit ? Math.max(0.85, 0.3 + depth * 0.7) : 0.3 + depth * 0.7,
				blur: dim ? 2 : lit ? 0 : (1 - depth) * 1.5,
				z: Math.round(depth * 100) + (lit ? 100 : 0)
			};
		});
	});

	function onpointerdown(e: PointerEvent) {
		dragging = true;
		last = { x: e.clientX, y: e.clientY, t: performance.now() };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onpointermove(e: PointerEvent) {
		if (!dragging) return;
		const now = performance.now();
		const dt = Math.max(now - last.t, 1);
		const dx = e.clientX - last.x;
		const dy = e.clientY - last.y;
		rot = { ax: clampX(rot.ax - dy * 0.006), ay: rot.ay + dx * 0.006 };
		vel = { x: (-dy * 0.006) / dt, y: (dx * 0.006) / dt };
		last = { x: e.clientX, y: e.clientY, t: now };
	}

	const endDrag = () => (dragging = false);
</script>

<div
	class="relative mx-auto aspect-square w-full max-w-[520px] touch-none select-none {dragging
		? 'cursor-grabbing'
		: 'cursor-grab'}"
	bind:clientWidth={size}
	role="application"
	aria-label="Skills sphere — drag to rotate"
	{onpointerdown}
	{onpointermove}
	onpointerup={endDrag}
	onpointercancel={endDrag}
>
	<div class="glow absolute inset-[18%] rounded-full" class:focused={focus !== null}></div>
	<div
		class="absolute inset-[12%] rounded-full border border-dashed border-gray-200 dark:border-white/10"
	></div>

	{#each projected as p (p.name)}
		<div
			class="absolute top-1/2 left-1/2"
			style="transform: translate(-50%, -50%) translate({p.sx}px, {p.sy}px) scale({hovered ===
			p.name
				? p.scale * 1.2
				: p.scale}); z-index: {hovered === p.name ? 200 : p.z}; opacity: {hovered === p.name
				? 1
				: p.opacity}; filter: blur({hovered === p.name ? 0 : p.blur}px)"
		>
			<div
				class="orb grid size-16 place-items-center rounded-2xl"
				class:lit={p.lit}
				role="img"
				aria-label={p.name}
				onpointerenter={() => (hovered = p.name)}
				onpointerleave={() => (hovered = null)}
			>
				<img
					src={p.icon}
					alt=""
					draggable="false"
					class="size-9 {p.invertOnDark ? 'dark:invert' : ''}"
				/>
			</div>
			{#if hovered === p.name || p.lit}
				<span
					class="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs font-semibold whitespace-nowrap text-white dark:bg-white dark:text-gray-900"
					>{p.name}</span
				>
			{/if}
		</div>
	{/each}

	<p class="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-400">
		Drag to spin
	</p>
</div>

<style>
	.glow {
		background: radial-gradient(circle, rgb(234 88 12 / 0.16), transparent 70%);
		filter: blur(20px);
		transition: transform 0.8s var(--ease-out-expo);
	}
	.glow.focused {
		transform: scale(1.15);
	}
	.orb {
		background: white;
		border: 1px solid rgb(229 231 235);
		box-shadow: 0 12px 30px -12px rgb(0 0 0 / 0.25);
		transition:
			border-color 0.4s,
			box-shadow 0.4s;
	}
	:global(.dark) .orb {
		background: #18181c;
		border-color: rgb(255 255 255 / 0.08);
	}
	.orb.lit,
	:global(.dark) .orb.lit {
		border-color: rgb(234 88 12 / 0.6);
		box-shadow: 0 14px 34px -10px rgb(234 88 12 / 0.55);
	}
</style>
