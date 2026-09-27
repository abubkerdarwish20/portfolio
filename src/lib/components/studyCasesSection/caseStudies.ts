import { BankIcon, Analytics01Icon } from '@hugeicons/core-free-icons';

export type Metric = { value: number; decimals?: number; suffix: string; label: string };

export type CaseStudy = {
	id: 'payroll' | 'infrastructure';
	title: string;
	description: string;
	challenge: string;
	solution: string;
	outcome: string;
	/** The numbers already stated in `outcome`, pulled out so they can be animated */
	metrics: Metric[];
	icon: typeof BankIcon;
	accent: string;
	link: string;
};

export const caseStudies: CaseStudy[] = [
	{
		id: 'payroll',
		title: 'Automated Payroll & Financial Systems',
		description:
			'Engineering a robust financial core for Jisr HR, bridging complex HR data with international accounting standards.',
		challenge:
			'Managing high-volume financial transactions while ensuring 100% data integrity and compliance across various banking formats.',
		solution:
			'Developed an automated payroll engine with real-time sync with general ledgers and complex banking integration modules.',
		outcome:
			'Streamlined payroll for thousands of companies, reducing processing errors by 95% and improving financial reporting speed.',
		metrics: [{ value: 95, suffix: '%', label: 'fewer processing errors' }],
		icon: BankIcon,
		accent: '#ea580c',
		link: 'http://jisr.net/'
	},
	{
		id: 'infrastructure',
		title: 'Front-end Infrastructure & Excellence',
		description:
			'Driving technical innovation and developer productivity across the front-end team at Jisr HR.',
		challenge:
			'Scaling a large-scale React application while maintaining performance, consistency, and high developer velocity.',
		solution:
			'Led the implementation of modern front-end architectures, shared component libraries, and automated testing strategies.',
		outcome:
			'Increased team productivity by 40% and established a high-standard engineering culture with 99.9% uptime on core UI services.',
		metrics: [
			{ value: 40, suffix: '%', label: 'team productivity' },
			{ value: 99.9, decimals: 1, suffix: '%', label: 'uptime on core UI' }
		],
		icon: Analytics01Icon,
		accent: '#3b82f6',
		link: 'http://jisr.net/'
	}
];

export type Step = 0 | 1 | 2;
