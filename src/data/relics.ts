import type { Relic } from '$types';
import { addTranslations } from '$utils/translation';
import { writable, derived } from 'svelte/store';
import relicsJson from './relics/vi.json';

type RelicJson = { [key: string]: Relic };
const defaultLocale: RelicJson = relicsJson;

const relics = writable<Relic[]>([]);

// Derived stores
export const cavernRelics = derived(relics, $relics =>
	$relics.filter((r) => r.type === 'cavern')
);

export const planarRelics = derived(relics, $relics =>
	$relics.filter((r) => r.type === 'planar')
);

function load(json: RelicJson) {
	const list = Object.values(json).sort((a, b) => a.name.localeCompare(b.name));
	relics.set(list);

	const names = list.reduce((acc: { [key: string]: string }, item) => {
		acc[`relic.${item.id}`] = item.name;
		return acc;
	}, {});

	addTranslations({ vi: names }, { vi: ['relic'] });
}

load(defaultLocale);

export default relics;
