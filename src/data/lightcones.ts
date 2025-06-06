import type { Lightcone } from '$types';
import { addTranslations, locale } from '$utils/translation';
import { writable } from 'svelte/store';
import defaultLocaleJson from './lightcones/vi.json';

type LightconeJson = { [key: string]: Lightcone };
const defaultLocale: LightconeJson = defaultLocaleJson;

const lightcones = writable<Lightcone[]>([]);
let currentLocale = 'vi';

function load(json: LightconeJson, locale: string) {
	const list = Object.values(json).sort((a, b) => a.name.localeCompare(b.name));
	lightcones.set(list);

	const names = list.reduce((acc: { [key: string]: string }, item) => {
		acc[`lightcone.${item.id}`] = item.name;
		return acc;
	}, {});

	addTranslations(
		{
			[locale]: names
		},
		{ [locale]: ['lightcone'] }
	);
}

load(defaultLocale, 'vi');

locale.subscribe(async (value) => {
	if (value === undefined || value === currentLocale) return;
	currentLocale = value;

	const localeJson: LightconeJson = (await import(`./lightcones/vi.json`)).default;

	load(localeJson, value);
});

export default lightcones;
