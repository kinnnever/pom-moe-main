<script lang="ts">
	import { t } from '$utils/translation';
	import Title from '$components/Title.svelte';
	import relics from '$data/relics';
	import RelicCard from './relicsCard.svelte';
	import type { Relic } from '$types';
	import { db } from '$utils/db';
	import { onMount } from 'svelte';

	let searchQuery = '';

	function removeVietnameseTones(str: string) {
		return str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase();
	}

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
		const q = removeVietnameseTones(searchQuery.trim());
		const categorized: Record<'cavern' | 'planar', Relic[]> = { cavern: [], planar: [] };

		for (const relic of $relics) {
			if (!filter[relic.type]) continue;
			if (q !== '' && !removeVietnameseTones(relic.name).includes(q)) continue;
			categorized[relic.type].push(relic);
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

<!-- Ô tìm kiếm -->
<div class="form__group field mb-4">
    <input type="text" class="form__field" placeholder="Name"
		bind:value={searchQuery}
		on:input={filterList}>
    <label for="name" class="form__label">Tìm Kiếm</label>
</div>

<!-- Bộ lọc -->
<div class="mb-8 flex flex-wrap justify-center gap-3 md:justify-normal">
	{#each Object.entries(filter) as [type, isEnabled]}
		<button
			class="duration-150 hover:opacity-80 {isEnabled ? '' : 'opacity-30'}"
			on:click={() => toggleFilter(type)}
		>
			<img
				class="inline-block h-12 w-12 md:h-10 md:w-10 rounded-md border border-white/20"
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

<style>
	.form__group {
		position: relative;
		padding: 20px 0 0;
		width: 100%;
		max-width: 180px;
	}

	.form__field {
		font-family: inherit;
		width: 100%;
		border: none;
		border-bottom: 2px solid #9b9b9b;
		outline: 0;
		font-size: 17px;
		color: #fff;
		padding: 7px 0;
		background: transparent;
		transition: border-color 0.2s;
	}

	.form__field::placeholder {
		color: transparent;
	}

	.form__field:placeholder-shown ~ .form__label {
		font-size: 17px;
		cursor: text;
		top: 30px;
	}

	.form__label {
		position: absolute;
		top: 30px;
		display: block;
		transition: 0.2s;
		font-size: 17px;
		color: #9b9b9b;
		pointer-events: none;
	}

	.form__field:focus {
		padding-bottom: 6px;
		font-weight: 700;
		border-width: 3px;
		border-image: linear-gradient(to right, #116399, #38caef);
		border-image-slice: 1;
	}

	.form__field:focus ~ .form__label {
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s;
		font-size: 17px;
		color: #38caef;
		font-weight: 700;
	}

	/* reset input */
	.form__field:required, .form__field:invalid {
		box-shadow: none;
	}
</style>
