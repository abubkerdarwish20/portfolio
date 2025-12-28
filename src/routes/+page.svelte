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
	<title>Abubker Portfolio</title>
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
