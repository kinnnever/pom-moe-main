<script lang="ts">
	import CharacterCard from './CharacterCard.svelte';
	import Title from '$components/Title.svelte';
	import characters from '$data/characters';
	import elements from '$data/elements';
	import paths from '$data/paths';
	import { t } from '$utils/translation';
	import { onMount } from 'svelte';
	import { db } from '$utils/db';

	let list = $characters;
	let filter: { 
			elements: { [key: string]: boolean }; 
			paths: { [key: string]: boolean } 
			rarity: { [key: string]: boolean };
	} = {
		elements: {
			...$elements.reduce<{ [key: string]: boolean }>((prev, cur) => {
				prev[cur.id] = true;
				return prev;
			}, {})
		},
		paths: {
			...$paths.reduce<{ [key: string]: boolean }>((prev, cur) => {
				prev[cur.id] = true;
				return prev;
			}, {})
		},
		rarity: {
			4: true,
			5: true
		}
	};

	let showTotal = false;
	let total: Record<string, number> = {
		
	};

	function filterList() {
		list = $characters.filter(
			(c) => (
				filter.rarity[c.rarity.toString()] &&
				filter.elements[c.element] && 
				filter.paths[c.path]
			)
		);
	}

	function toggleRarity(r: string) {
		const others = r === '5' ? '4' : '5';

		// Nếu đang bật cả hai → bật riêng cái vừa click, tắt cái còn lại
		if (filter.rarity['4'] && filter.rarity['5']) {
			filter.rarity[r] = true;
			filter.rarity[others] = false;
		}
		// Nếu chỉ đang bật cái vừa click → bật lại cả hai
		else if (filter.rarity[r] && !filter.rarity[others]) {
			filter.rarity['4'] = true;
			filter.rarity['5'] = true;
		}
		// Nếu đang bật cái còn lại → bật cái vừa click, tắt cái kia
		else {
			filter.rarity[r] = true;
			filter.rarity[others] = false;
		}

		filterList();
	}


	function toggleFilter(type: 'elements' | 'paths' | 'rarity', id: string) {
		const current = Object.values(filter[type]);
		const trueCount = current.filter((e) => e).length;

		filter[type][id] = !filter[type][id];

		if (trueCount === current.length) {
			for (const key in filter[type]) {
				filter[type][key] = false || key === id;
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
			total[item.name] = total[item.name] ?? 0;
			total[item.name] += item.count;
		}
	}

	onMount(() => {
		const unsub = characters.subscribe(() => {
			filterList();
		});
		getCount();

		return () => unsub();
	});
</script>

<svelte:head>
	<title>Pom.moe - Nhân vật</title>
</svelte:head>

<Title>{$t('common.character')}</Title>
<div class="flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-start mb-4">
	<div class="flex justify-center gap-2 md:justify-normal">
		{#each ['5', '4'] as r}
			<button
				class="duration-150 hover:opacity-80 border md:border-0 border-white/60 rounded-md {filter.rarity[r] ? '' : 'opacity-30'}"
				on:click={() => toggleRarity(r)}
			>
				<img
					class="inline-block h-8 w-8"
					src={`/images/rarity${r}.png`}
					alt="Rarity {r}"
					width={32}
					height={32}
				/>
			</button>
		{/each}
	</div>
	<div class="flex justify-center gap-2 md:justify-normal">
		{#each $elements as element}
			<button
				class="duration-150 hover:opacity-80 {filter.elements[element.id] ? '' : 'opacity-30'}"
				on:click={() => toggleFilter('elements', element.id)}
			>
				<img
					class="inline-block h-8 w-8"
					width={32}
					height={32}
					src="/images/elements/{element.id}.png"
					alt={element.name}
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
				<span class="hidden md:block inline-block pl-0.5 text-sm leading-none text-white/80">{path.name}</span>
			</button>
		{/each}
	</div>
	</div>
<div class="flex flex-wrap justify-center gap-2 md:justify-normal md:gap-3">
	{#each list as character (character.id)}
		<CharacterCard {character} {showTotal} total={total[character.id] ?? 0} />
	{/each}
</div>
