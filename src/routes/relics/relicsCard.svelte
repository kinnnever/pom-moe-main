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
	<div class="background">
		<div class="inner-border"></div>
	</div>
	<img
		src={`/images/relics/${relic.id}.png`}
		alt={relic.name}
		class="relative h-auto w-28 md:w-32 {showTotal && total === 0 ? 'brightness-50' : ''} drop-shadow-[0_0_3px_rgba(0,0,0,1)]"
		width={128}
		height={128}
	/>
	<span
		class="absolute bottom-1 left-0 right-0 px-1 text-center text-sm font-semibold leading-none text-white "
		style="text-shadow: 1px 1px 3px black"
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
		@apply absolute inset-0 duration-150 rounded-tl-none rounded-tr-lg rounded-br-none;
		border-top-right-radius: 1rem;	
		background: linear-gradient(to bottom, #8E5C57, #CBA36D);
	}

	.inner-border {
		position: absolute;
		border-top-right-radius: 1rem;		
		inset: 5px;
		border: 1px solid rgba(214, 214, 214, 0.684);
		pointer-events: none;
	}


	.relic:hover > .background {
		opacity: 70%;
	}

	.bg-cavern > .background {
		
		opacity: 100%;
	}

	.bg-planar > .background {
		
		opacity: 100%;
	}
</style>
