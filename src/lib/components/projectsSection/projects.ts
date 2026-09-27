export type Project = {
	id: string;
	title: string;
	category: string;
	description: string;
	tags: string[];
	/** Short phrases lifted from the description, shown as floating chips */
	features: string[];
	/** Base path of the optimized screenshots: `${image}-800.webp` / `${image}-1600.webp` */
	image: string;
	accent: string;
	github: string;
	live: string;
};

export const projects: Project[] = [
	{
		id: 'react-ds',
		title: 'React DS',
		category: 'React Package',
		description:
			'A modern, lightweight design system for React applications, featuring customizable components and Tailwind CSS integration.',
		tags: ['React', 'TailwindCSS', 'storybook', 'TypeScript'],
		features: ['Customizable components', 'Tailwind CSS integration', 'Documented in Storybook'],
		image: '/projects/ds',
		accent: '#ea580c',
		github: 'https://github.com/abubkerdarwish20/react-ds',
		live: 'https://react-ds-001.netlify.app/'
	},
	{
		id: 'image-bluray',
		title: 'Image Bluray',
		category: 'Next.js App',
		description:
			'An ultra-fast image gallery built with Next.js and Unsplash API, featuring intelligent blurring and stripe integration.',
		tags: ['Next.js', 'TypeScript'],
		features: ['Unsplash API', 'Intelligent blurring', 'Ultra-fast gallery'],
		image: '/projects/upslashy',
		accent: '#3b82f6',
		github: 'https://github.com/abubkerdarwish20/image-bluray',
		live: 'https://image-bluray.netlify.app/'
	}
];

/** Responsive, lazy screenshot attributes — the source PNGs are ~3800px wide */
export const shot = (p: Project) => ({
	src: `${p.image}-1600.webp`,
	srcset: `${p.image}-800.webp 800w, ${p.image}-1600.webp 1600w`,
	width: 1600,
	height: 787,
	alt: `${p.title} screenshot`
});

export const host = (url: string) => new URL(url).host;

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

/** Tag → logo; black logos are flagged so they can be inverted on dark backgrounds */
const icons: Record<string, { src: string; invertOnDark?: boolean }> = {
	react: { src: devicon('react/react-original.svg') },
	tailwindcss: { src: devicon('tailwindcss/tailwindcss-original.svg') },
	storybook: { src: devicon('storybook/storybook-original.svg') },
	typescript: { src: devicon('typescript/typescript-original.svg') },
	'next.js': { src: devicon('nextjs/nextjs-original.svg'), invertOnDark: true }
};

export const iconFor = (tag: string) => icons[tag.toLowerCase()];
