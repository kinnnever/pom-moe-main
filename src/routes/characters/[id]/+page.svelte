<script lang="ts">
	import Title from '$components/Title.svelte';
	import characters, { ascensions, skills as skillList, stats } from '$data/characters';
	import { t } from '$utils/translation';
	import Skill from './Skill.svelte';

	export let data;

	const { id } = data;

	const character = $characters.find((c) => c.id === id);
	if (character === undefined) throw new Error(`Character ${id} not found`);

	$: skills = $skillList[id];

	const stat = stats[id];
	const statTable = [
		{ breakthrough: 0, levels: [1, 20] },
		{ breakthrough: 1, levels: [20, 30] },
		{ breakthrough: 2, levels: [30, 40] },
		{ breakthrough: 3, levels: [40, 50] },
		{ breakthrough: 4, levels: [50, 60] },
		{ breakthrough: 5, levels: [60, 70] },
		{ breakthrough: 6, levels: [70, 80] },
		{ breakthrough: 6, levels: [80, 90] }
	];
	const ascension = ascensions[id];
</script>

<div class="flex flex-col items-center">
	<img
		src="/images/characters-full/{character.id}.png"
		alt=""
		class="mb-4 h-[80dvh] object-contain"
	/>
	<Title>{$t(`character.${character.id}`)}</Title>
</div>
<!-- <h2 class="mb-2 mt-8 text-center text-3xl font-bold text-white">Trace</h2> -->
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	<Skill character={id} type="attack" skill={skills.attack} />
	<Skill character={id} type="skill" skill={skills.skill} />
	<Skill character={id} type="ultimate" skill={skills.ultimate} />
	<Skill character={id} type="talent" skill={skills.talent} />
	<Skill character={id} type="technique" skill={skills.technique} />
</div>
