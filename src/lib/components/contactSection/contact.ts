export const contact = {
	name: 'Abubker Darwish',
	email: 'abubker.darwish@gmail.com',
	phone: { display: '(+967) 7710 749 44', href: 'tel:+967771074944' },
	location: 'Mukalla, Hadramout, Yemen',
	/** IANA zone for Mukalla — drives the live clock and availability */
	timeZone: 'Asia/Aden',
	/** Sun–Thu, 08:00–17:00 local time (0 = Sunday) */
	hours: { days: [0, 1, 2, 3, 4], start: 8, end: 17, label: 'Sun – Thu · 8:00 – 17:00' },
	github: 'https://github.com/abubkerdarwish20',
	linkedin: 'https://www.linkedin.com/in/abubker-darwish/',
	cv: '/abubker-darwish-cv.pdf'
};

export function mailto(subject = '', body = '') {
	const params = new URLSearchParams();
	if (subject) params.set('subject', subject);
	if (body) params.set('body', body);
	const query = params.toString().replace(/\+/g, '%20');
	return `mailto:${contact.email}${query ? `?${query}` : ''}`;
}
