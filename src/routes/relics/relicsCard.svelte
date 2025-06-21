<script lang="ts">
	import type { KeyValueObject, Relic } from '$types';
	import Icon from '@iconify/svelte';
	import XIcon from '@iconify-icons/mdi/multiply';

	export let relic: Relic;
	export let showTotal = false;
	export let total = 0;

	const bgColors: KeyValueObject = {
		cavern: 'bg-cavern',
		planar: 'bg-planar'
	};
</script>

<button class="relic relative cursor-pointer pb-6 {bgColors[relic.type]}">
	<div class="background" />
	<img
		src={`/images/relics/${relic.id}.png`}
		alt={relic.name}
		class="relative h-auto w-28 md:w-32 {showTotal && total === 0 ? 'brightness-50' : ''} drop-shadow-[0_0_8px_rgba(0,0,0,1)]"
		width={128}
		height={128}
	/>
	<span
		class="absolute bottom-1 left-0 right-0 px-1 text-center text-sm font-semibold leading-none text-white "
		style="text-shadow: 5px 5px 5px black"
	>
		{relic.name}
	</span>
	{#if total > 0}
		<span class="absolute right-1 top-1 font-medium leading-none text-white/80">
			<Icon class="mb-0.5 inline" icon={XIcon} />{total}
		</span>
	{/if}
</button>

<style lang="postcss">
	.background {
		content: '';
		@apply absolute inset-0 duration-150;
	}

	.relic:hover > .background {
		opacity: 50%;
	}

	.bg-cavern > .background {
		background: linear-gradient(
			to top,
			transparent 0%,
			#9f9f9f 30%,
			#9f9f9f 40%,
			transparent 80%
		);
		opacity: 30%;
	}

	.bg-planar > .background {
		background: linear-gradient(
			to top,
			transparent 0%,
			#9f9f9f 30%,
			#9f9f9f 40%,
			transparent 80%
		);
		opacity: 30%;
	}
</style>
