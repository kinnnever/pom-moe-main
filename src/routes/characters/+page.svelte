<script lang="ts">
	import CharacterCard from './CharacterCard.svelte';
	import Title from '$components/Title.svelte';
	import characters from '$data/characters';
	import elements from '$data/elements';
	import paths from '$data/paths';
	import { t } from '$utils/translation';
	import { onMount } from 'svelte';
	import { db } from '$utils/db';

	let searchQuery = '';

	function removeVietnameseTones(str: string) {
		return str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase();
	}

	let list = $characters;
	let filter: { 
		elements: { [key: string]: boolean }; 
		paths: { [key: string]: boolean };
		rarities: { [key: number]: boolean };
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
		rarities: {
			4: true,
			5: true
		}
	};

	let showTotal = false;
	let total: Record<string, number> = {};

	function filterList() {
		const q = removeVietnameseTones(searchQuery.trim());
		list = $characters.filter(
			(c) => (
				!c.hidden &&
				filter.rarities[c.rarity] &&
				filter.elements[c.element] && 
				filter.paths[c.path] &&
				(q === '' || removeVietnameseTones(c.name).includes(q))
			)
		);
	}

	function toggleFilter(type: 'elements' | 'paths' | 'rarities', id: string | number) {
		const current = Object.values(filter[type]);
		const trueCount = current.filter((e) => e).length;

		filter[type][id] = !filter[type][id];

		if (trueCount === current.length) {
			for (const key in filter[type]) {
				filter[type][key] = key == id;
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

<div class="form__group field  mb-2">
    <input type="input" class="form__field" placeholder="Name" required=""
		bind:value={searchQuery}
		on:input={filterList}>
    <label for="name" class="form__label">Tìm Kiếm</label>
</div>

<div class="flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-start mb-4">
	<div class="flex justify-center gap-2 md:justify-normal">
		{#each ['5', '4'] as rarity}
			<button
				class="duration-150 hover:opacity-80 border md:border-0 border-white/60 rounded-md {filter.rarities[rarity] ? '' : 'opacity-30'}"
				on:click={() => toggleFilter('rarities', rarity)}
			>
				<img
					class="inline-block h-8 w-8"
					src={`/images/rarity${rarity}.png`}
					alt="Rarity {rarity}"
					width={32}
					height={32}
				/>
			</button>
		{/each}
	</div>
	<div class="flex flex-wrap justify-center gap-2 md:justify-normal">
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

	<div class="flex flex-wrap justify-center gap-2 lg:gap-3 md:justify-normal">
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
				<span class="pl-0.5 text-sm leading-none text-white/80">{path.name}</span>
			</button>
		{/each}
	</div>
</div>

<div class="flex flex-wrap justify-center gap-2 md:gap-3 md:justify-normal">
	{#each list as character (character.id)}
		<CharacterCard {character} {showTotal} total={total[character.id] ?? 0} />
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