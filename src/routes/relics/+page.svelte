<script lang="ts">
	import { t } from '$utils/translation';
	import Title from '$components/Title.svelte';
	import relics from '$data/relics';
	import RelicCard from './relicsCard.svelte';
	import type { Relic } from '$types';
	import { db } from '$utils/db';
	import { onMount } from 'svelte';

	// Danh sách phân loại relics theo type
	let list: Record<'cavern' | 'planar', Relic[]> = { cavern: [], planar: [] };

	// Bộ lọc type
	let filter = {
		cavern: true,
		planar: true
	};

	// Tổng số relics được lưu
	let showTotal = false;
	let total: Record<string, number> = {};

	function filterList() {
		const categorized: Record<'cavern' | 'planar', Relic[]> = { cavern: [], planar: [] };

		for (const relic of $relics) {
			if (filter[relic.type]) {
				categorized[relic.type].push(relic);
			}
		}

		list = categorized;
	}

	function toggleFilter(type: 'cavern' | 'planar') {
		const both = filter.cavern && filter.planar;
		const onlyThis = filter[type] && !filter[otherType(type)];

		if (both) {
			filter[type] = true;
			filter[otherType(type)] = false;
		} else if (onlyThis) {
			filter.cavern = true;
			filter.planar = true;
		} else {
			filter[type] = !filter[type];
		}

		filterList();
	}

	function otherType(type: 'cavern' | 'planar'): 'cavern' | 'planar' {
		return type === 'cavern' ? 'planar' : 'cavern';
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
	<title>Pom.moe - Di Vật</title>
</svelte:head>

<Title>Di Vật</Title>

<!-- Bộ lọc -->
<div class="mb-8 flex flex-wrap justify-center gap-3 md:justify-normal">
	{#each Object.entries(filter) as [type, isEnabled]}
		<button
			class="duration-150 hover:opacity-80 {isEnabled ? '' : 'opacity-30'}"
			on:click={() => toggleFilter(type)}
		>
			<img
				class="inline-block h-12 w-12 md:h-10 md:w-10 rounded-md border border-white/20 bg-white/10 bg-transparent"
				width={32}
				height={32}
				src={`/images/${type}.png`}
				alt={type}
			/>
			<span class="inline-block pl-0.5 text-md font-bold leading-none gap-3 text-white/90">
				{type === 'cavern' ? 'Di Vật Hang Động' : 'Phụ Kiện Vị Diện'}
			</span>
		</button>
	{/each}
</div>

<!-- Danh sách relics -->
<div class="flex flex-col gap-3">
	{#each Object.entries(list) as [type, relicList]}
		{#if relicList.length}
			<div class="mb-8 flex flex-wrap justify-center gap-3 md:justify-normal">
				{#each relicList as relic (relic.id)}
					<RelicCard {relic} {showTotal} total={total[relic.id] ?? 0} />
				{/each}
			</div>
		{/if}
	{/each}
</div>
