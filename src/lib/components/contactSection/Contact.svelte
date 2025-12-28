<script lang="ts">
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let errors = $state({ name: '', email: '', message: '' });
	let isSubmitting = $state(false);

	function validate() {
		let isValid = true;
		const newErrors = { name: '', email: '', message: '' };

		if (!name.trim()) {
			newErrors.name = 'Name is required';
			isValid = false;
		}

		if (!email.trim()) {
			newErrors.email = 'Email is required';
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = 'Invalid email format';
			isValid = false;
		}

		if (!message.trim()) {
			newErrors.message = 'Message is required';
			isValid = false;
		}

		errors = newErrors;
		return isValid;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!validate()) return;

		isSubmitting = true;
	}
</script>

<section
	class="scroll-m-16 scroll-section relative z-10 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-gray-200 dark:border-white/5"
	id="contact"
>
	<div class="absolute inset-0 z-0 bg-hero-glow-light dark:bg-hero-glow pointer-events-none"></div>
	<div
		class="absolute left-[-10%] top-[20%] w-200 h-200 rounded-full border border-gray-200/40 dark:border-white/5 opacity-40 pointer-events-none"
	></div>
	<div
		class="absolute left-[-5%] top-[25%] w-150 h-150 rounded-full border border-gray-200/40 dark:border-white/5 opacity-30 pointer-events-none"
	></div>
	<div
		class="absolute left-[0%] top-[30%] w-100 h-100 rounded-full border border-gray-200/40 dark:border-white/5 opacity-20 pointer-events-none"
	></div>
	<div
		class="absolute left-[10%] top-[20%] w-24 h-24 rounded-2xl bg-linear-to-br from-primary to-accent-orange opacity-10 blur-2xl animate-float pointer-events-none"
	></div>

	<div class="max-w-6xl mx-auto relative z-10">
		<div class="text-center mb-16 space-y-4">
			<h5 class="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
				Contact Me
			</h5>
			<h2 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
				Request Free <span class="text-brand-primary">Consultancy</span>
			</h2>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
			<div
				class="lg:col-span-5 w-full bg-white dark:bg-dark-card border border-gray-100 dark:border-white/5 shadow-2xl rounded-2xl p-8 md:p-10 space-y-8"
			>
				<div class="space-y-2">
					<h4
						class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
					>
						Mobile
					</h4>
					<p class="text-3xl font-bold text-gray-900 dark:text-white">(+967) 7710 749 44</p>
				</div>
				<div class="space-y-4 pt-2">
					<div class="flex items-start gap-4">
						<span class="font-bold text-gray-900 dark:text-white min-w-22.5">Address:</span>
						<span class="text-gray-600 dark:text-gray-400 leading-relaxed"
							>Yemen-Hadramout-Mukalla</span
						>
					</div>
					<div class="flex items-start gap-4">
						<span class="font-bold text-gray-900 dark:text-white min-w-22.5">Email:</span>
						<span class="text-gray-600 dark:text-gray-400">Abubker.darwish@gmail.com</span>
					</div>

					<div class="flex items-start gap-4">
						<span class="font-bold text-gray-900 dark:text-white min-w-22.5">Work Hour:</span>
						<span class="text-gray-600 dark:text-gray-400">Sun - Thu: 8:00 - 17:00</span>
					</div>
				</div>
			</div>

			<div class="lg:col-span-7 w-full">
				<form class="space-y-6" onsubmit={handleSubmit}>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="space-y-2">
							<input
								class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-white/10 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 {errors.name
									? 'border-red-500'
									: ''}"
								id="name"
								placeholder="Name*"
								type="text"
								bind:value={name}
							/>
							{#if errors.name}
								<p class="text-red-500 text-sm ml-1">{errors.name}</p>
							{/if}
						</div>
						<div class="space-y-2">
							<input
								class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-white/10 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 {errors.email
									? 'border-red-500'
									: ''}"
								id="email"
								placeholder="Email Address*"
								type="email"
								bind:value={email}
							/>
							{#if errors.email}
								<p class="text-red-500 text-sm ml-1">{errors.email}</p>
							{/if}
						</div>
					</div>

					<div class="space-y-2">
						<textarea
							class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-white/10 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 resize-none h-32 {errors.message
								? 'border-red-500'
								: ''}"
							id="message"
							placeholder="How can we help you?"
							bind:value={message}
						></textarea>
						{#if errors.message}
							<p class="text-red-500 text-sm ml-1">{errors.message}</p>
						{/if}
					</div>

					<button
						class="w-full cursor-pointer sm:w-auto px-10 py-3 rounded-full bg-brand-primary hover:bg-orange-700 text-white font-bold text-lg shadow-lg shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Sending...' : 'Request Now'}
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
