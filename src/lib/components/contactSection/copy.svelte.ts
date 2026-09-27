/** Clipboard copy with a short-lived "copied" flag for UI feedback */
export class Copier {
	copied = $state<string | null>(null);
	#timer: ReturnType<typeof setTimeout> | undefined;

	async copy(text: string, key = text) {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			// Clipboard API blocked (insecure context / permissions) — fall back to a hidden textarea
			const el = Object.assign(document.createElement('textarea'), { value: text });
			el.style.cssText = 'position:fixed;opacity:0';
			document.body.append(el);
			el.select();
			document.execCommand('copy');
			el.remove();
		}
		this.copied = key;
		clearTimeout(this.#timer);
		this.#timer = setTimeout(() => (this.copied = null), 1800);
	}
}
