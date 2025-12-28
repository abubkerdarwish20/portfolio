<script lang="ts">
	import Contact from '$lib/components/contactSection/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/heroSection/Hero.svelte';
	import Experience from '$lib/components/experienceSection/Experience.svelte';
	// import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/techSection/Skills.svelte';
</script>

<svelte:head>
	<title>Abubker Portfolio | Frontend Developer</title>
	<meta
		name="description"
		content="Abubker Darwish is a Frontend Developer who crafts user-friendly and aesthetic digital experiences with a passion for clean code and modern design."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://abubker-portfolio.vercel.app/" />
	<meta property="og:title" content="Abubker Portfolio | Frontend Developer" />
	<meta
		property="og:description"
		content="I craft user-friendly and aesthetic digital experiences. With a passion for clean code and modern design, I turn complex problems into elegant solutions."
	/>
	<meta property="og:image" content="https://abubker-portfolio.vercel.app/og-image.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://abubker-portfolio.vercel.app/" />
	<meta property="twitter:title" content="Abubker Portfolio | Frontend Developer" />
	<meta
		property="twitter:description"
		content="I craft user-friendly and aesthetic digital experiences. With a passion for clean code and modern design, I turn complex problems into elegant solutions."
	/>
	<meta property="twitter:image" content="https://abubker-portfolio.vercel.app/og-image.png" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&amp;display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&amp;display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
</svelte:head>

<Header />
<main>
	<Hero />
	<Skills />
	<Experience />
	<!-- <Projects /> -->
	<Contact />
</main>
<Footer />
