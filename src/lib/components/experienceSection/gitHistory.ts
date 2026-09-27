import { endIndex, experiences, formatMonth, startIndex, type Experience } from './experience';

export type Ref = { label: string; kind: 'head' | 'branch' | 'tag' };

export type Commit = {
	lane: 0 | 1;
	hash: string;
	message: string;
	/** Longer text shown in the `git show` pane */
	body?: string;
	refs: Ref[];
	/** Only real dates (role start/end) are shown — highlight commits carry none */
	date?: string;
	strong: boolean;
	exp: Experience;
};

type Event = Omit<Commit, 'hash'> & { at: number; order: number };

// Stable decorative hash (FNV-1a) so SSR and client markup match
function hash(seed: string, length = 7) {
	let out = '';
	let h = 2166136261;
	while (out.length < length) {
		for (const ch of seed + out.length) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
		out += (h >>> 0).toString(16).padStart(8, '0');
	}
	return out.slice(0, length);
}

export const fullHash = (short: string) => short + hash(short, 33);

/**
 * Turns the experience list into a `git log --graph`:
 * full-time roles live on `main`; part-time roles branch off and merge back.
 * Highlights are spread evenly across each role's date range (display order only).
 */
function buildEvents(): Event[] {
	const events: Event[] = [];
	const mainRoles = experiences.filter((e) => e.type === 'Full-time');
	const firstMainStart = Math.min(...mainRoles.map(startIndex));

	for (const exp of experiences) {
		const start = startIndex(exp);
		const end = endIndex(exp);
		const onMain = exp.type === 'Full-time';
		const lane = onMain ? 0 : 1;
		const spread = (k: number) => start + ((end - start) * (k + 1)) / (exp.highlights.length + 1);

		if (onMain) {
			events.push({
				at: end,
				order: 3,
				lane,
				exp,
				strong: true,
				message: `${exp.role} @ ${exp.company}`,
				body: exp.description,
				refs: exp.end ? [] : [{ label: 'HEAD → main', kind: 'head' }],
				date: formatMonth(exp.end)
			});
			exp.highlights.forEach((h, k) =>
				events.push({ at: spread(k), order: 1, lane, exp, strong: false, message: h, refs: [] })
			);
			events.push({
				at: start,
				order: 0,
				lane,
				exp,
				strong: true,
				message: `${start === firstMainStart ? 'init' : 'feat'}: joined ${exp.company}`,
				body: `${exp.type} · ${exp.role}`,
				refs: [{ label: exp.type.toLowerCase(), kind: 'tag' }],
				date: formatMonth(exp.start)
			});
		} else {
			events.push({
				at: end,
				order: 2,
				lane: 0,
				exp,
				strong: false,
				message: `Merge branch '${exp.id}'`,
				body: `${exp.role} @ ${exp.company} wrapped up.`,
				refs: [],
				date: formatMonth(exp.end)
			});
			exp.highlights.forEach((h, k) =>
				events.push({ at: spread(k), order: 1, lane, exp, strong: false, message: h, refs: [] })
			);
			events.push({
				at: start,
				order: 0,
				lane,
				exp,
				strong: true,
				message: `${exp.role} @ ${exp.company}`,
				body: exp.description,
				refs: [
					{ label: exp.id, kind: 'branch' },
					{ label: exp.type.toLowerCase(), kind: 'tag' }
				],
				date: formatMonth(exp.start)
			});
		}
	}

	// Newest first, like `git log`
	return events.sort((a, b) => b.at - a.at || b.order - a.order);
}

export const commits: Commit[] = buildEvents().map(({ at: _at, order: _order, ...c }, i) => ({
	...c,
	hash: hash(`${i}:${c.message}`)
}));

/** Row ranges for each branch: from its merge commit on main down to the main commit it forked from */
export const branches = experiences
	.filter((e) => e.type !== 'Full-time')
	.map((exp) => {
		const merge = commits.findIndex((c) => c.lane === 0 && c.exp.id === exp.id);
		const last = commits.map((c) => c.lane === 1 && c.exp.id === exp.id).lastIndexOf(true);
		const fork = Math.min(last + 1, commits.length - 1);
		return { exp, merge, last, fork };
	});
