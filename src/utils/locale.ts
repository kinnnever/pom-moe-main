import { writable } from 'svelte/store';

export type Locale = 'vi' | 'en';

function createLocale() {
	let initial: Locale = 'vi';

	if (typeof localStorage !== 'undefined') {
		const saved = localStorage.getItem('locale');
		if (saved === 'vi' || saved === 'en') {
			initial = saved;
		}
	}

	const { subscribe, set } = writable<Locale>(initial);

	return {
		subscribe,
		set: (value: Locale) => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('locale', value);
			}
			set(value);
		}
	};
}

export const locale = createLocale();
