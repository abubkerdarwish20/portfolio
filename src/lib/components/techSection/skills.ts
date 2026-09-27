const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export type Category = 'core' | 'frameworks' | 'backend' | 'quality';

export type Skill = {
	name: string;
	icon: string;
	category: Category;
	/** Monochrome black logos that disappear on dark backgrounds */
	invertOnDark?: boolean;
};

export const categories: Array<{ id: Category; label: string; blurb: string }> = [
	{ id: 'core', label: 'Core & Styling', blurb: 'The fundamentals every interface stands on.' },
	{ id: 'frameworks', label: 'Frameworks', blurb: 'Component architectures I ship to production.' },
	{ id: 'backend', label: 'Backend & Data', blurb: 'The APIs and data layers behind the UI.' },
	{ id: 'quality', label: 'Quality & Workflow', blurb: 'Testing, versioning and design handoff.' }
];

export const skills: Skill[] = [
	{ name: 'HTML5', icon: devicon('html5/html5-original.svg'), category: 'core' },
	{ name: 'CSS3', icon: devicon('css3/css3-original.svg'), category: 'core' },
	{ name: 'JavaScript', icon: devicon('javascript/javascript-original.svg'), category: 'core' },
	{ name: 'TypeScript', icon: devicon('typescript/typescript-original.svg'), category: 'core' },
	{
		name: 'Tailwind',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
		category: 'core'
	},
	{ name: 'React', icon: devicon('react/react-original.svg'), category: 'frameworks' },
	{
		name: 'Next.js',
		icon: devicon('nextjs/nextjs-original.svg'),
		category: 'frameworks',
		invertOnDark: true
	},
	{ name: 'Vue', icon: devicon('vuejs/vuejs-original.svg'), category: 'frameworks' },
	{ name: 'Svelte', icon: devicon('svelte/svelte-original.svg'), category: 'frameworks' },
	{ name: 'Node.js', icon: devicon('nodejs/nodejs-original.svg'), category: 'backend' },
	{
		name: 'Express',
		icon: devicon('express/express-original.svg'),
		category: 'backend',
		invertOnDark: true
	},
	{ name: 'MongoDB', icon: devicon('mongodb/mongodb-original.svg'), category: 'backend' },
	{ name: 'Firebase', icon: devicon('firebase/firebase-original.svg'), category: 'backend' },
	{ name: 'Vitest', icon: devicon('vitest/vitest-original.svg'), category: 'quality' },
	{ name: 'Git', icon: devicon('git/git-original.svg'), category: 'quality' },
	{ name: 'Figma', icon: devicon('figma/figma-original.svg'), category: 'quality' }
];

export const byCategory = (id: Category) => skills.filter((s) => s.category === id);
