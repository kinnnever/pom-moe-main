import en from '../data/i18n/en.json';
import vi from '../data/i18n/vi.json';
import { locale } from './locale';
import { derived } from 'svelte/store';

const dictionaries = { en, vi };

export const t = derived(locale, ($locale) => {
	return dictionaries[$locale];
});
