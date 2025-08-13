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
	let searchQuery = '';

	function removeVietnameseTones(str: string) {
		return str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase();
	}

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
		const q = removeVietnameseTones(searchQuery.trim());
		list = [[], [], []];
		for (const lightcone of $lightcones) {
			if (!filter.rarities[lightcone.rarity]) continue;
			if (!filter.paths[lightcone.path]) continue;
			if (q !== '' && !removeVietnameseTones(lightcone.name).includes(q)) continue;
			list[5 - lightcone.rarity].push(lightcone);
		}
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

<!-- Ô tìm kiếm -->
<div class="form__group field mb-4">
    <input type="text" class="form__field" placeholder="Name"
		bind:value={searchQuery}
		on:input={filterList}>
    <label for="name" class="form__label">Tìm kiếm</label>
</div>

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
