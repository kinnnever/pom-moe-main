<script lang="ts">
	import { page } from '$app/stores';

	export let label = '';
	export let icon = '';
	export let target = '/';
	export let iconOnly = false;
	export let close = () => {};

	$: active = $page.url.pathname.startsWith(target);
</script>

<a
	href={target}
	class="relative flex w-fit select-none items-center rounded-md py-1 pl-4 duration-150 hover:opacity-100 {active
		? 'opacity-100'
		: 'opacity-70'}"
	on:click={close}
>
	<img src="/icons/{icon}" alt="" class="h-8 w-8" />
	<span class="block md:hidden lg:block whitespace-nowrap pl-2 font-semibold text-white">{label}</span>
	{#if active && !iconOnly}
		<div class="absolute -right-2 bottom-2 h-4 w-[1px] rounded-full bg-yellow-100" />
		<div
			class="absolute -right-2 bottom-2 h-[1px] w-full max-w-[calc(100%-4rem)] rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-yellow-100"
		/>
	{/if}
</a>
