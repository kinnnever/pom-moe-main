import type { KeyValueObject } from '$types';
import i18n from 'sveltekit-i18n';
import type { Config } from 'sveltekit-i18n';

export const languages: KeyValueObject = {
	vi: 'Tiếng Việt',
	en: 'English'
};

type Params = {
	filename: string;
};

const config: Config<Params> = {
	initLocale: 'en',
	fallbackLocale: 'en',
	loaders: [
		...Object.entries(languages).map(([locale]) => ({
			locale,
			key: 'common',
			loader: async () => await import(`../locales/common/${locale}.json`)
		})),
		{
			locale: 'en',
			key: '',
			loader: async () => await import('../locales/strings/en.json')
		}
	]
};

export const { t, locale, locales, loading, loadTranslations, addTranslations } = new i18n(config);
