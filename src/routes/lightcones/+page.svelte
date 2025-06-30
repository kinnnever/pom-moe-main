<script lang="ts">
	import { t } from '$utils/translation';
	import Title from '$components/Title.svelte';
	import lightcones from '$data/lightcones';
	import LightconeCard from './LightconeCard.svelte';
	import type { Lightcone } from '$types';
	import '$data/lightcones';
	import paths from '$data/paths';
	import { db } from '$utils/db';
	import { onMount } from 'svelte';

	let list: Array<Lightcone[]> = [[], [], []];

	let filter: { 
		rarities: { [key: number]: boolean};
		paths: { [key: string]: boolean }
	} = {
		paths: {
			...$paths.reduce<{ [key: string]: boolean }>((prev, cur) => {
				prev[cur.id] = true;
				return prev;
			}, {})
		},
		rarities: {
			3: true,
			4: true,
			5: true
		}
	};

	function filterList() {
		list = [[], [], []];
		for (const lightcone of $lightcones) {
			if (!filter.rarities[lightcone.rarity]) continue;
			if (!filter.paths[lightcone.path]) continue;
			list[5 - lightcone.rarity].push(lightcone);
		}

		list = list;
	}

	let showTotal = false;
	let total: Record<string, number> = {};

	function toggleFilter(type: 'rarities' | 'paths', id: number | string) {
		const current = Object.values(filter[type]);
		const trueCount = current.filter((e) => e).length;

		filter[type][id] = !filter[type][id];

		if (trueCount === current.length) {
			for (const key in filter[type]) {
				filter[type][key] =  key == id;
			}
		} else if (trueCount === 1 && !filter[type][id]) {
			for (const key in filter[type]) {
				filter[type][key] = true;
			}
		}

		filterList();
	}

	async function getCount() {
		const count = await db.items.toArray();
		showTotal = count.length > 0;
		for (const item of count) {
			total[item.name] = item.count;
		}
	}

	filterList();

	onMount(() => {
		getCount();
	});
</script>

<svelte:head>
	<title>Pom.moe - Nón ánh sáng</title>
</svelte:head>

<Title>Nón Ánh Sáng</Title>
<div class="flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-start mb-8">
	<div class="flex flex-wrap justify-center gap-2 md:justify-normal">
		{#each [5, 4, 3] as rarity}
			<button
			class="duration-150 hover:opacity-80 {filter.rarities[rarity] ? '' : 'opacity-30'}"
			on:click={() => toggleFilter('rarities', rarity)}
			>
			<img
				class="inline-block h-8 w-8 border md:border-none rounded-md"
				width={32}
				height={32}
				src={`/images/rarity${rarity}.png`}
				alt={`Rarity ${rarity}`}
			/>
			</button>
		{/each}
	</div>

	<div class="flex flex-wrap justify-center gap-3 md:justify-normal">
		{#each $paths as path}
			<button
				class="duration-150 hover:opacity-80 {filter.paths[path.id] ? '' : 'opacity-30'}"
				on:click={() => toggleFilter('paths', path.id)}
			>
				<img
					class="inline-block h-8 w-8"
					width={32}
					height={32}
					src="/images/paths/{path.id}.png"
					alt={path.name}
				/>
				<span class="inline-block pl-0.5 text-sm leading-none text-white/80">{path.name}</span>
			</button>
		{/each}
	</div>
</div>
<div class="flex flex-col gap-3">
	{#each list as lightcones}
		<div class="mb-8 flex flex-wrap justify-center gap-3 md:justify-normal">
			{#each lightcones as lightcone (lightcone.id)}
				<LightconeCard {lightcone} {showTotal} total={total[lightcone.id] ?? 0} />
			{/each}
		</div>
	{/each}
</div>
