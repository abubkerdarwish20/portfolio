import { contact } from './contact';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Live clock for Mukalla. Starts empty so SSR and hydration agree,
 * then ticks once a second on the client.
 */
export class LocalClock {
	/** Epoch ms of the last tick — a plain number keeps state immutable */
	now = $state<number | null>(null);

	#parts = $derived.by(() => {
		if (!this.now) return null;
		const parts = new Intl.DateTimeFormat('en-US', {
			timeZone: contact.timeZone,
			weekday: 'short',
			hour: 'numeric',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).formatToParts(this.now);
		const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
		return {
			day: WEEKDAYS.indexOf(get('weekday')),
			hour: Number(get('hour')) % 24,
			minute: get('minute'),
			second: get('second')
		};
	});

	/** e.g. "14:05" */
	time = $derived(
		this.#parts ? `${String(this.#parts.hour).padStart(2, '0')}:${this.#parts.minute}` : '--:--'
	);
	seconds = $derived(this.#parts?.second ?? '--');

	online = $derived.by(() => {
		const p = this.#parts;
		if (!p) return false;
		const { days, start, end } = contact.hours;
		return days.includes(p.day) && p.hour >= start && p.hour < end;
	});

	/** Hours between the visitor and Mukalla, e.g. "+5h" / "same time zone" */
	offset = $derived.by(() => {
		if (!this.now) return '';
		// Visitor's UTC offset in hours (getTimezoneOffset is minutes, sign-inverted)
		// eslint-disable-next-line svelte/prefer-svelte-reactivity -- throwaway read, never stored or mutated
		const here = -new Date(this.now).getTimezoneOffset() / 60;
		const there = 3; // Asia/Aden is UTC+3 year-round (no DST)
		const diff = there - here;
		if (diff === 0) return 'same time as you';
		const h = Math.abs(diff);
		return `${h}h ${diff > 0 ? 'ahead of' : 'behind'} you`;
	});

	start() {
		this.now = Date.now();
		const id = setInterval(() => (this.now = Date.now()), 1000);
		return () => clearInterval(id);
	}
}
