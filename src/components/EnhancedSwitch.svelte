<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	export let characterId: string;

	const isEnhanced = derived(page, ($page) => {
		return $page.params.id === `${characterId}-enhanced`;
	});

	function toggleEnhanced($isEnhanced: boolean) {
		const next = $isEnhanced ? characterId : `${characterId}-enhanced`;
		goto(`/characters/${next}`);
	}
</script>

<div class="flex flex-row items-center gap-1 md:gap-2">
	<!-- svelte-ignore a11y-interactive-supports-focus -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#if $isEnhanced !== undefined}
		<div
			role="switch"
			aria-checked={$isEnhanced}
			class="relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out"
			class:bg-gray-500={!$isEnhanced}
			class:bg-green-500={$isEnhanced}
			on:click={() => toggleEnhanced($isEnhanced)}
		>
			<span
				class="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out"
				class:translate-x-6={$isEnhanced}
				class:translate-x-1={!$isEnhanced}
			/>
		</div>
		<span class="text-white text-sm md:text-base">Enhanced</span>
	{/if}
</div>
