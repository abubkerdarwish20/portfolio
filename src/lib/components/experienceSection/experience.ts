export type Experience = {
	id: string;
	role: string;
	company: string;
	link: string;
	/** ISO month, e.g. '2019-05' */
	start: string;
	/** ISO month, or null while ongoing */
	end: string | null;
	type: 'Full-time' | 'Part-time';
	description: string;
	highlights: string[];
	tags: string[];
	/** Brand accent used for lines, dots and chips */
	accent: string;
};

// Newest first
export const experiences: Experience[] = [
	{
		id: 'jisr',
		role: 'Senior Front-end Developer',
		company: 'Jisr HR',
		link: 'https://www.jisr.net/en',
		start: '2019-05',
		end: null,
		type: 'Full-time',
		description:
			'Led a team of developers in designing and implementing highly scalable and performant web applications using React.js. Developing and maintaining core product services while ensuring high-quality software solutions.',
		highlights: [
			'Developed and maintained reusable components and libraries for efficient UI implementation.',
			'Implemented responsive designs and optimized applications for multiple devices and screen sizes.',
			'Collaborated closely with product managers and designers to translate business requirements into technical specifications.',
			'Mentored junior developers through guidance, knowledge-sharing, and React.js workshops.'
		],
		tags: ['Reactjs', 'TypeScript', 'Redux', 'Node.js', 'Cypress', 'Vitest', 'Vite'],
		accent: '#ea580c'
	},
	{
		id: 'resal',
		role: 'Front-end Engineer',
		company: 'Resal',
		link: 'https://resal.me/en/',
		start: '2023-04',
		end: '2023-08',
		type: 'Part-time',
		description: 'Working as part time for Resal company as Front-end Engineer.',
		highlights: [
			'Working as part time for Resal company as Front-end Engineer.',
			'Implemented responsive designs and optimized applications for multiple devices and screen sizes.'
		],
		tags: ['Reactjs', 'TypeScript', 'Nextjs', 'Node.js', 'Docker', 'Tailwind', 'Vite'],
		accent: '#3b82f6'
	}
];

const monthIndex = (iso: string) => {
	const [y, m] = iso.split('-').map(Number);
	return y * 12 + (m - 1);
};

const nowIndex = () => {
	const d = new Date();
	return d.getFullYear() * 12 + d.getMonth();
};

export const startIndex = (e: Experience) => monthIndex(e.start);
export const endIndex = (e: Experience) => (e.end ? monthIndex(e.end) : nowIndex());

/** Inclusive month count, e.g. Apr → Aug = 5 */
export const months = (e: Experience) => endIndex(e) - startIndex(e) + 1;

export function formatDuration(total: number) {
	const y = Math.floor(total / 12);
	const m = total % 12;
	return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`]
		.filter(Boolean)
		.join(' ');
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatMonth(iso: string | null) {
	if (!iso) return 'Present';
	const [y, m] = iso.split('-').map(Number);
	return `${MONTHS[m - 1]} ${y}`;
}

export const period = (e: Experience) => `${formatMonth(e.start)} — ${formatMonth(e.end)}`;

/** Earliest start → now, for career-wide stats and rulers */
export const careerStart = Math.min(...experiences.map(startIndex));
export const careerEnd = () => Math.max(...experiences.map(endIndex));

/** Single source for every "X+ years" claim on the site */
export const careerMonths = () => careerEnd() - careerStart + 1;
export const careerYears = () => Math.floor(careerMonths() / 12);
export const careerStartYear = Math.floor(careerStart / 12);
