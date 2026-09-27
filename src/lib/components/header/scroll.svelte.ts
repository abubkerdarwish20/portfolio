import { navItems } from '$lib/nav';

/**
 * One scroll listener for the header: page progress, direction, whether we've left the top,
 * and which section is under the viewport's midline.
 */
export class ScrollState {
	y = $state(0);
	progress = $state(0);
	direction = $state<'up' | 'down'>('up');
	active = $state(navItems[0].id);

	/** Past the very top — headers usually condense here */
	scrolled = $derived(this.y > 40);
	/** Scrolling down past the hero — headers that auto-hide get out of the way */
	hidden = $derived(this.direction === 'down' && this.y > 400);

	start() {
		let frame = 0;
		let lastY = scrollY;

		const update = () => {
			frame = 0;
			const y = scrollY;
			// Small dead-zone so tiny trackpad jitters don't flip direction
			if (Math.abs(y - lastY) > 6) {
				this.direction = y > lastY ? 'down' : 'up';
				lastY = y;
			}
			this.y = y;
			const max = document.documentElement.scrollHeight - innerHeight;
			this.progress = max > 0 ? Math.min(1, y / max) : 0;
		};
		const onScroll = () => (frame ||= requestAnimationFrame(update));

		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) this.active = e.target.id;
			},
			{ rootMargin: '-50% 0px -50% 0px' }
		);
		for (const item of navItems) {
			const el = document.getElementById(item.id);
			if (el) io.observe(el);
		}

		update();
		addEventListener('scroll', onScroll, { passive: true });
		addEventListener('resize', onScroll);
		return () => {
			cancelAnimationFrame(frame);
			io.disconnect();
			removeEventListener('scroll', onScroll);
			removeEventListener('resize', onScroll);
		};
	}
}
