type InviewOptions = {
	/** Stop observing after the first reveal (default: true) */
	once?: boolean;
	rootMargin?: string;
	onenter?: () => void;
};

/**
 * Flips `data-inview` to "true" when the node scrolls into view.
 * Render the node with `data-inview="false"` so SSR markup starts paused —
 * `.reveal-line` / `.reveal-fade` children then play only once they are visible.
 */
export function inview(node: HTMLElement, options: InviewOptions = {}) {
	let { once = true, rootMargin = '0px 0px -12% 0px', onenter } = options;

	const io = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.dataset.inview = 'true';
			onenter?.();
			if (once) io.disconnect();
		},
		{ rootMargin }
	);
	io.observe(node);

	return {
		update(next: InviewOptions) {
			({ once = true, rootMargin = '0px 0px -12% 0px', onenter } = next);
		},
		destroy: () => io.disconnect()
	};
}
