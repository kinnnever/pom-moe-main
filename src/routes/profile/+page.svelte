<script lang="ts">
	import Title from '$components/Title.svelte';
	import Icon from '@iconify/svelte';
	import GithubIcon from '@iconify-icons/mdi/github';
	import FacebookIcon from '@iconify-icons/mdi/facebook';
	import YoutubeIcon from '@iconify-icons/mdi/youtube';
	import { onMount } from 'svelte';

	import { t } from '$utils/i18n';
	import { locale } from '$utils/locale';

	const skills = [
		{ name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
		{ name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
		{ name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
		{ name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
		{ name: "Svelte", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
		{ name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
		{ name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
		{ name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
		{ name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
		{ name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
		{ name: "TailwindCSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
		{ name: "Unity", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" }
	];

	type Quote = { text: string; author: string };

	let currentQuote: Quote | null = null;
	let visible = false;
	let endSection: HTMLElement;

	function pickRandomQuote() {
		if ($t?.quotes?.length) {
			const list = $t.quotes;
			currentQuote = list[Math.floor(Math.random() * list.length)];
		}
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					pickRandomQuote();
					observer.disconnect();
				}
			},
			{ threshold: 0.4 }
		);

		if (endSection) observer.observe(endSection);
	});
	$: if (visible && $locale) {
		pickRandomQuote();
	}
</script>


<svelte:head>
	<title>Pom.moe</title>
</svelte:head>
<div class="group fixed md:hidden top-5 md:top-12 right-12 md:right-4 z-50 cursor-pointer">
	<div class="flex items-center opacity-70 duration-150 hover:opacity-100">
		<img class="h-6 w-6" src="/icons/language.png" alt="Language" />
	</div>

	<div class="absolute right-0 hidden origin-top pt-5 group-hover:block">
		<div
			class="grid w-48 grid-cols-2 gap-2 rounded-md border border-white/5 bg-dark/30 px-3 py-2 font-semibold backdrop-blur-md text-white"
		>
			<button
				on:click={() => locale.set('vi')}
				class="rounded py-1 text-white/70 hover:bg-white/10 hover:text-white"
			>
				Tiếng Việt
			</button>

			<button
				on:click={() => locale.set('en')}
				class="rounded py-1 text-white/70 hover:bg-white/10 hover:text-white"
			>
				English
			</button>
		</div>
	</div>
</div>

<!-- HERO -->
<div class="flex flex-row gap-8">
	<div class="lg:w-2/3 p-4">
		<div class="text-white text-5xl font-bold">
			<p>{$t.hero.hello}</p>
			{$t.hero.intro} <Title>Lưu Thế Kiên</Title>{$t.hero.role}
			<span class="text-[#16f2b3]">{$t.hero.job}</span>

			<div class="text-white/60 text-lg font-normal mt-8">
				<p>{$t.about[0]}</p>
				<p class="mt-4">{$t.about[1]}</p>
				<p class="mt-4">{$t.about[2]}</p>
			</div>

			<div class="flex gap-2 mt-4 text-white/40">
				<a href="https://github.com/kinnnever" class="duration-150 hover:text-white mode-card" target="_blank"><Icon icon={GithubIcon} height={40} /></a>
				<a href="https://facebook.com/kienluu.21.10" class="duration-150 hover:text-white mode-card" target="_blank"><Icon icon={FacebookIcon} height={40} /></a>
				<a href="https://www.youtube.com/@kien_nghien" class="duration-150 hover:text-white mode-card" target="_blank"><Icon icon={YoutubeIcon} height={40} /></a>
			</div>
		</div>
	</div>

	<div class="lg:w-1/2 flex items-center justify-center relative">
		<img src="/images/Portrait_-_Fixed.webp" alt="Lưu Thế Kiên" class="rounded-lg shadow-lg w-auto h-auto object-cover"/> 
		<span class="text-sm text-gray-400 absolute bottom-5 hover:text-white/80">
			<a href="https://www.facebook.com/kienluu.21.10" target="_blank" class="underline">Lưu Thế Kiên</a>
		</span>
	</div>
</div>

<!-- SKILLS -->
<div class="flex flex-col items-center mt-12">
	<Title>{$t.sections.skills}</Title>
</div>

<div class="relative overflow-hidden w-full group">
	<div class="flex gap-6 p-2 animate-scroll group-hover:[animation-play-state:paused]">
		{#each [...skills, ...skills] as skill (skill.name + Math.random())}
			<div class="min-w-[120px] bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 text-center mode-card">
				<img src={skill.logo} alt={skill.name} class="w-12 h-12 mx-auto" />
				<p class="text-white mt-2 text-sm">{skill.name}</p>
			</div>
		{/each}
	</div>
</div>

<!-- TIMELINE -->
<div class="flex flex-col items-center mt-12">
	<Title>{$t.sections.timeline}</Title>

	<div class="timeline-wrapper">
		{#each $t.timeline as item}
			<div class="timeline-item">
				<div class="card">
					<span class="year">{item.year}</span>
				</div>
				<div class="content bg-white/10 backdrop-blur-sm rounded-lg p-4 ml-2 mr-4">
					{item.content}
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- EPILOGUE -->
<section bind:this={endSection} class="end-section {visible ? 'visible' : ''}">
	<div class="flex flex-col items-center mt-12">
		<Title>{$t.sections.epilogue}</Title>
	</div>

	<div class="flex px-8 gap-8 justify-center flex-wrap md:flex-nowrap">
		<div class="w-1/2 text-center">
			{#if currentQuote}
				<p class="quote ml-10">“{currentQuote.text}”</p>
				<p class="text-right mt-4 text-sm text-gray-400">— {currentQuote.author}</p>
			{/if}
		</div>

		<!-- svelte-ignore a11y-missing-attribute -->
		<iframe
			src="https://open.spotify.com/embed/playlist/3S6TJcHHeMbzegWmlKtKFw"
			class="w-1/2 rounded-xl mr-10"
			height="160"
			loading="lazy"
		/>
	</div>
</section>

<style> 
	@keyframes scroll { 
		0% { 
			transform: translateX(0); 
		} 
		100% { 
			transform: translateX(-50%); 
		} } 
	.animate-scroll { 
		width: max-content; 
		animation: scroll 25s linear infinite; 
	} 
	.group:hover .animate-scroll { 
		animation-play-state: paused; 
	} 
	.mode-card { 
		transition: transform 300ms, filter 300ms; 
	} 
	.mode-card:hover { 
		transform: scale(1.1); 
	} 

	.timeline-wrapper { 
		display: flex; 
		width: 100%; 
		max-width: full; 
		height: 100px; 
		overflow: hidden; 
		} 
	.timeline-item { 
		position: relative; 
		flex: 1; 
		display: flex; 
		transition: flex 500ms ease; 
	} 
	.timeline-item:hover { 
		flex: 4; 
	} 
	.year { 
		font-size: 1.8rem; 
		font-weight: 800; 
		color: #faf5ef; 
		text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3); 
		transition: transform 500ms ease, opacity 500ms ease; 
		z-index: 10; 
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		} 
	.timeline-wrapper:hover .year { 
		opacity: 0.6; 
		transform: scale(0.6); 
	} 
	.timeline-item:hover .year { 
		transform: scale(0.7); 
		opacity: 1; 
	} 
	.content { 
		position: absolute; 
		background: fff; 
		inset: 0; 
		left: 130px; 
		display: flex; 
		align-items: center; 
		padding: 0 32px; 
		color: white; 
		font-size: 1rem; 
		line-height: 1.5rem; 
		opacity: 0; 
		transform: translateX(20px); 
		transition: all 500ms ease; 
		pointer-events: none; 
	} 
	.timeline-item:hover .content { 
		opacity: 1; 
		transform: translateX(0); 
	} 
	.card {
		width: 135px; 
		height: 100px; 
		background: #07182E; 
		position: relative; 
		display: flex; 
		place-content: center; 
		place-items: center; 
		overflow: hidden; border-radius: 20px; 
	}
	.card::before { 
		content: ''; 
		position: absolute; 
		width: 60px; 
		background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255)); 
		height: 150%; 
		animation: rotBGimg 3s linear infinite; 
		transition: all 0.2s linear; 
	} 
	@keyframes rotBGimg { 
		from { 
			transform: rotate(0deg); 
		} 
		to { 
			transform: rotate(360deg); 
		} 
	} 
	.card::after { 
		content: ''; 
		position: absolute; 
		background: #07182E; 
		inset: 5px; 
		border-radius: 15px;
	} 
	.timeline-item:hover .card::before { 
		background-image: linear-gradient(180deg, violet, purple, blue, cyan); 
		animation: rotBGimg 3s linear infinite; 
	} 
	.end-section { 
		opacity: 0; 
		transform: translateY(40px); 
		transition: all 0.9s ease; 
	} 
	.end-section.visible { 
		opacity: 1; 
		transform: translateY(0); 
	} 
	.quote { 
		color: rgba(255, 255, 255, 0.8); 
		font-size: 1.2rem; 
		font-style: italic; 
		text-align: center; 
	} 
</style>
