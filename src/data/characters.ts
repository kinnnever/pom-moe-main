import type { Character} from '$types';
import { addTranslations, locale } from '$utils/translation';
import { writable } from 'svelte/store';
import defaulCharacterJson from './characters/vi.json';


type CharacterJson = { [key: string]: Character };
const defaultLocale: CharacterJson = defaulCharacterJson;

const characters = writable<Character[]>([]);


let currentLocale = 'vi';

function load(json: CharacterJson, locale: string) {
	const list = Object.values(json)
		.filter((char) => !char.enhancedOnly)
		.sort((a, b) => a.name.localeCompare(b.name));
	characters.set(list);

	const names = list.reduce((acc: { [key: string]: string }, item) => {
		acc[`character.${item.id}`] = item.name;
		return acc;
	}, {});

	addTranslations(
		{
			[locale]: names
		},
		{ [locale]: ['character'] }
	);
}

load(defaultLocale, 'vi');

locale.subscribe(async (value) => {
	if (value === undefined || value === currentLocale) return;
	currentLocale = value;

	const localeJson: CharacterJson = (await import(`./characters/vi.json`)).default;
	load(localeJson, value);

});

export default characters;
