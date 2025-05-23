import type { Banner, BannerLocale, BannerType } from '$types';
import defaultJson from './banners/vi.json';
import { addTranslations, locale } from '$utils/translation';

export const bannerTypes = ['character', 'lightcone', 'standard', 'beginner'] as const;

type BannerLocaleJson = { [key: string]: BannerLocale };
const defaultLocale: BannerLocaleJson = defaultJson;

function load(json: BannerLocaleJson, locale: string) {
	const names = Object.values(json).reduce((acc: { [key: string]: string }, item) => {
		acc[`banner.${item.id}`] = item.name;
		return acc;
	}, {});

	addTranslations(
		{
			[locale]: names
		},
		{ [locale]: ['banner'] }
	);
}

load(defaultLocale, 'en');

locale.subscribe(async (value) => {
	if (value === undefined) return;
	const localeJson: BannerLocaleJson = (await import(`./banners/${value}.json`)).default;
	load(localeJson, value);
});

export const maxPities: { [key in BannerType]: number } = {
	character: 90,
	lightcone: 80,
	standard: 90,
	beginner: 50
};

export type Banners = {
	[key in BannerType]: [Banner, ...Banner[]];
};

export const banners: Banners = {
	character: [
		{
			code: 2003,
			type: 'character',
			name: 'Butterfly on Swordtip',
			start: '2023-04-26 06:00:00',
			end: '2023-05-17 17:59:00',
			color: '#dfb6ff',
			version: '1.0',
			image: 'Butterfly on Swordtip 2003.png',
			pos: '60% 0%',
			zoom: 1.1,
			featured5: ['seele'],
			featured4: ['hook', 'pela', 'natasha'],
			timezoneDependent: true
		},
		{
			code: 2004,
			type: 'character',
			name: 'Swirl of Heavenly Spear',
			start: '2023-05-17 18:00:00',
			end: '2023-06-06 14:59:00',
			color: '#fdfdfb',
			version: '1.0',
			image: 'Swirl of Heavenly Spear 2004.png',
			pos: '83% 0%',
			zoom: 1.1,
			featured5: ['jing-yuan'],
			featured4: ['tingyun', 'sushang', 'march-7th']
		},
		{
			code: 2005,
			type: 'character',
			name: 'Contract Zero',
			start: '2023-06-07 06:00:00',
			end: '2023-06-28 11:59:00',
			color: '#8dd1f5',
			version: '1.1',
			image: 'Contract Zero 2005.png',
			pos: '83% 0%',
			zoom: 1.1,
			featured5: ['silver-wolf'],
			featured4: ['dan-heng', 'asta', 'serval'],
			timezoneDependent: true
		},
		{
			code: 2006,
			type: 'character',
			name: 'Laic Pursuit',
			start: '2023-06-28 12:00:00',
			end: '2023-07-18 14:59:49',
			color: '#f9f3e6',
			version: '1.1',
			image: 'Laic Pursuit 2006.png',
			pos: '83% 0%',
			zoom: 1.1,
			featured5: ['luocha'],
			featured4: ['yukong', 'pela', 'qingque']
		},
		{
			code: 2007,
			type: 'character',
			name: 'A Lost Soul',
			start: '2023-07-19 06:00:00',
			end: '2023-08-09 11:59:00',
			color: '#7d90c3',
			version: '1.2',
			image: 'A Lost Soul 2007.png',
			pos: '55% 20%',
			zoom: 1.2,
			featured5: ['blade'],
			featured4: ['arlan', 'sushang', 'natasha'],
			timezoneDependent: true
		},
		{
			code: 2008,
			type: 'character',
			name: 'Nessun Dorma',
			start: '2023-08-09 12:00:00',
			end: '2023-08-29 14:59:00',
			color: '#7d90c3',
			version: '1.2',
			image: 'Nessun Dorma 2008.png',
			pos: '55% 20%',
			zoom: 1.2,
			featured5: ['kafka'],
			featured4: ['luka', 'sampo', 'serval']
		},
		{
			code: 2009,
			type: 'character',
			name: 'Epochal Spectrum',
			start: '2023-08-30 06:00:00',
			end: '2023-09-20 11:59:00',
			color: '#7d90c3',
			version: '1.3',
			image: 'Epochal Spectrum 2009.png',
			pos: '75% 20%',
			zoom: 1.2,
			featured5: ['dan-heng-imbibitor-lunae'],
			featured4: ['yukong', 'asta', 'march-7th'],
			timezoneDependent: true
		},
		{
			code: 2010,
			type: 'character',
			name: 'Foreseen, Foreknown, Foretold',
			start: '2023-09-20 12:00:00',
			end: '2023-10-10 14:59:00',
			color: '#e2a6cc',
			version: '1.3',
			image: 'Foreseen, Foreknown, Foretold 2010.png',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['fu-xuan'],
			featured4: ['lynx', 'hook', 'pela']
		},
		{
			code: 2011,
			type: 'character',
			name: 'Gentle Eclipse of the Moon',
			start: '2023-10-11 06:00:00',
			end: '2023-10-27 11:59:00',
			color: '#51aaff',
			version: '1.4',
			image: 'Gentle Eclipse of the Moon 2011.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['jingliu'],
			featured4: ['tingyun', 'qingque', 'sampo'],
			timezoneDependent: true
		},
		{
			code: 2012,
			type: 'character',
			name: 'Sunset Clause',
			start: '2023-10-27 12:00:00',
			end: '2023-11-14 14:59:00',
			color: '#c1c4f8',
			version: '1.4',
			image: 'Sunset Clause 2012.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['topaz-numby'],
			featured4: ['guinaifen', 'luka', 'sushang']
		},
		{
			code: 2013,
			type: 'character',
			name: 'Butterfly on Swordtip',
			start: '2023-10-27 12:00:00',
			end: '2023-11-14 14:59:00',
			color: '#dfb6ff',
			version: '1.4',
			image: 'Butterfly on Swordtip 2013.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['seele'],
			featured4: ['guinaifen', 'luka', 'sushang']
		},
		{
			code: 2014,
			type: 'character',
			name: 'Bloom in Gloom',
			start: '2023-11-15 06:00:00',
			end: '2023-12-06 11:59:00',
			color: '#dcedc9',
			version: '1.5',
			image: 'Bloom in Gloom 2014.png',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['huohuo'],
			featured4: ['dan-heng', 'arlan', 'serval'],
			timezoneDependent: true
		},
		{
			code: 2015,
			type: 'character',
			name: 'Thorns of Scented Crown',
			start: '2023-12-06 12:00:00',
			end: '2023-12-26 14:59:00',
			color: '#e97762',
			version: '1.5',
			image: 'Thorns of Scented Crown 2015.png',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['argenti'],
			featured4: ['hanya', 'lynx', 'asta']
		},
		{
			code: 2016,
			type: 'character',
			name: 'Contract Zero',
			start: '2023-12-06 12:00:00',
			end: '2023-12-26 14:59:00',
			color: '#e97762',
			version: '1.5',
			image: 'Contract Zero 2016.png',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['silver-wolf'],
			featured4: ['hanya', 'lynx', 'asta']
		},
		{
			code: 2017,
			type: 'character',
			name: 'Floral Triptych',
			start: '2023-12-27 06:00:00',
			end: '2024-01-17 14:59:00',
			color: '#ccdde1',
			version: '1.6',
			image: 'Floral Triptych 2017.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['ruan-mei'],
			featured4: ['xueyi', 'march-7th', 'tingyun'],
			timezoneDependent: true
		},
		{
			code: 2018,
			type: 'character',
			name: 'A Lost Soul',
			start: '2023-12-27 06:00:00',
			end: '2024-01-17 14:59:00',
			color: '#7d90c3',
			version: '1.6',
			image: 'A Lost Soul 2018.jpg',
			pos: '55% 20%',
			zoom: 1.2,
			featured5: ['ruan-mei'],
			featured4: ['xueyi', 'march-7th', 'tingyun'],
			timezoneDependent: true
		},
		{
			code: 2019,
			type: 'character',
			name: 'Panta Rhei',
			start: '2024-01-17 12:00:00',
			end: '2024-02-05 14:59:00',
			color: '#7d90c3',
			version: '1.6',
			image: 'Panta Rhei 2019.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['dr-ratio'],
			featured4: ['sushang', 'natasha', 'hook']
		},
		{
			code: 2020,
			type: 'character',
			name: 'Nessun Dorma',
			start: '2024-01-17 12:00:00',
			end: '2024-02-05 14:59:00',
			color: '#7d90c3',
			version: '1.6',
			image: 'Panta Rhei 2019.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['kafka'],
			featured4: ['sushang', 'natasha', 'hook']
		},
		{
			code: 2021,
			type: 'character',
			name: 'Ripples in Reflection',
			start: '2024-02-06 06:00:00',
			end: '2024-02-29 14:59:00',
			color: '#d1b9ff',
			version: '2.0',
			image: 'Ripples in Reflection 2021.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['black-swan'],
			featured4: ['misha', 'tingyun', 'guinaifen'],
			timezoneDependent: true
		},
		{
			code: 2022,
			type: 'character',
			name: 'Epochal Spectrum',
			start: '2024-02-06 06:00:00',
			end: '2024-02-29 14:59:00',
			color: '#b0e4e5',
			version: '2.0',
			image: 'Epochal Spectrum 2022.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['dan-heng-imbibitor-lunae'],
			featured4: ['misha', 'tingyun', 'guinaifen'],
			timezoneDependent: true
		},
		{
			code: 2023,
			type: 'character',
			name: 'Sparkling Splendor',
			start: '2024-02-29 12:00:00',
			end: '2024-03-26 14:59:00',
			color: '#5bb1e3',
			version: '2.0',
			image: 'Sparkling Splendor 2023.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['sparkle'],
			featured4: ['sampo', 'qingque', 'hanya']
		},
		{
			code: 2024,
			type: 'character',
			name: 'Swirl of Heavenly Spear',
			start: '2024-02-29 12:00:00',
			end: '2024-03-26 14:59:00',
			color: '#e4c6a2',
			version: '2.0',
			image: 'Swirl of Heavenly Spear 2024.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['jing-yuan'],
			featured4: ['sampo', 'qingque', 'hanya']
		},
		{
			code: 2025,
			type: 'character',
			name: 'Words of Yore',
			start: '2024-03-27 06:00:00',
			end: '2024-04-17 11:59:00',
			color: '#b2b0d1',
			version: '2.1',
			image: 'Words of Yore 2025.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['acheron'],
			featured4: ['gallagher', 'dan-heng', 'pela'],
			timezoneDependent: true
		},
		{
			code: 2026,
			type: 'character',
			name: 'Laic Pursuit',
			start: '2024-03-27 06:00:00',
			end: '2024-04-17 11:59:00',
			color: '#f7f0da',
			version: '2.1',
			image: 'Laic Pursuit 2026.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['luocha'],
			featured4: ['gallagher', 'dan-heng', 'pela'],
			timezoneDependent: true
		},
		{
			code: 2027,
			type: 'character',
			name: 'Gilded Imprisonment',
			start: '2024-04-17 12:00:00',
			end: '2024-05-07 15:00:00',
			color: '#fff9ea',
			version: '2.1',
			image: 'Gilded Imprisonment 2027.jpg',
			pos: '75% 0%',
			zoom: 1.2,
			featured5: ['aventurine'],
			featured4: ['lynx', 'luka', 'serval']
		},
		{
			code: 2028,
			type: 'character',
			name: 'Gentle Eclipse of the Moon',
			start: '2024-04-17 12:00:00',
			end: '2024-05-07 15:00:00',
			color: '#51aaff',
			version: '2.1',
			image: 'Gentle Eclipse of the Moon 2028.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['jingliu'],
			featured4: ['lynx', 'luka', 'serval']
		},
		{
			code: 2029,
			type: 'character',
			name: 'Just Intonation',
			start: '2024-05-08 06:00:00',
			end: '2024-05-29 11:59:00',
			color: '#ff6934',
			version: '2.2',
			image: 'Just Intonation 2029.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['robin'],
			featured4: ['march-7th', 'hanya', 'xueyi'],
			timezoneDependent: true
		},
		{
			code: 2030,
			type: 'character',
			name: 'Sunset Clause',
			start: '2024-05-08 06:00:00',
			end: '2024-05-29 11:59:00',
			color: '#ff6934',
			version: '2.2',
			image: 'Sunset Clause 2030.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['topaz-numby'],
			featured4: ['march-7th', 'hanya', 'xueyi'],
			timezoneDependent: true
		},
		{
			code: 2031,
			type: 'character',
			name: "Dusty Trail's Lone Star",
			start: '2024-05-29 12:00:00',
			end: '2024-06-18 15:00:00',
			color: '#f1f1ef',
			version: '2.2',
			image: "Dusty Trail's Lone Star 2031.jpg",
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['boothill'],
			featured4: ['pela', 'luka', 'hook']
		},
		{
			code: 2032,
			type: 'character',
			name: 'Foreseen, Foreknown, Foretold',
			start: '2024-05-29 12:00:00',
			end: '2024-06-18 15:00:00',
			color: '#e2a6cc',
			version: '2.2',
			image: 'Foreseen, Foreknown, Foretold 2032.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['fu-xuan'],
			featured4: ['pela', 'luka', 'hook']
		},
		{
			code: 2033,
			type: 'character',
			name: 'Firefull Flyshine',
			start: '2024-06-19 06:00:00',
			end: '2024-07-10 11:59:00',
			color: '#dcffe5',
			version: '2.3',
			image: 'Firefull Flyshine 2033.jpg',
			pos: '75% 20%',
			zoom: 1.2,
			featured5: ['firefly'],
			featured4: ['gallagher', 'misha', 'xueyi'],
			timezoneDependent: true
		},
		{
			code: 2034,
			type: 'character',
			name: 'Floral Triptych',
			start: '2024-06-19 06:00:00',
			end: '2024-07-10 11:59:00',
			color: '#ccdde1',
			version: '2.3',
			image: 'Floral Triptych 2034.jpg',
			pos: '65% 20%',
			zoom: 1.2,
			featured5: ['ruan-mei'],
			featured4: ['gallagher', 'misha', 'xueyi'],
			timezoneDependent: true
		}
	],
	lightcone: [
		{
			code: 3003,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-04-26 06:00:00',
			end: '2023-05-17 17:59:00',
			color: '#dfb6ff',
			version: '1.0',
			image: 'Brilliant Fixation 3003.png',
			pos: '70% 8%',
			zoom: 1.2,
			featured5: ['in-the-night'],
			featured4: ['the-moles-welcome-you', 'good-night-and-sleep-well', 'post-op-conversation'],
			timezoneDependent: true
		},
		{
			code: 3004,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-05-17 18:00:00',
			end: '2023-06-06 14:59:00',
			color: '#fff9d2',
			version: '1.0',
			image: 'Brilliant Fixation 3004.png',
			pos: '70% 8%',
			zoom: 1.2,
			featured5: ['before-dawn'],
			featured4: ['planetary-rendezvous', 'only-silence-remains', 'day-one-of-my-new-life']
		},
		{
			code: 3005,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-06-07 06:00:00',
			end: '2023-06-28 11:59:00',
			color: '#c2aefd',
			version: '1.1',
			image: 'Brilliant Fixation 3005.png',
			pos: '70% 8%',
			zoom: 1.2,
			featured5: ['incessant-rain'],
			featured4: ['subscribe-for-more', 'memories-of-the-past', 'make-the-world-clamor'],
			timezoneDependent: true
		},
		{
			code: 3006,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-06-28 12:00:00',
			end: '2023-07-18 14:59:49',
			color: '#d0d3ac',
			version: '1.1',
			image: 'Brilliant Fixation 3006.png',
			pos: '70% 8%',
			zoom: 1.2,
			featured5: ['echoes-of-the-coffin'],
			featured4: ['good-night-and-sleep-well', 'geniuses-repose', 'dance-dance-dance']
		},
		{
			code: 3007,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-07-19 06:00:00',
			end: '2023-08-09 11:59:00',
			color: '#8c9ba5',
			version: '1.1',
			image: 'Brilliant Fixation 3007.png',
			pos: '70% 8%',
			zoom: 1.2,
			featured5: ['the-unreachable-side'],
			featured4: ['a-secret-vow', 'shared-feeling', 'swordplay'],
			timezoneDependent: true
		},
		{
			code: 3008,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-08-09 12:00:00',
			end: '2023-08-29 14:59:00',
			color: '#8c9ba5',
			version: '1.2',
			image: 'Brilliant Fixation 3008.png',
			pos: '70% 0%',
			zoom: 1.2,
			featured5: ['patience-is-all-you-need'],
			featured4: [
				'resolution-shines-as-pearls-of-sweat',
				'eyes-of-the-prey',
				'the-birth-of-the-self'
			]
		},
		{
			code: 3009,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-08-30 06:00:00',
			end: '2023-09-20 11:59:00',
			color: '#8c9ba5',
			version: '1.3',
			image: 'Brilliant Fixation 3009.png',
			pos: '70% 0%',
			zoom: 1.2,
			featured5: ['brighter-than-the-sun'],
			featured4: ['dance-dance-dance', 'planetary-rendezvous', 'landaus-choice'],
			timezoneDependent: true
		},
		{
			code: 3010,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-09-20 12:00:00',
			end: '2023-10-10 14:59:00',
			color: '#fbc6e6',
			version: '1.3',
			image: 'Brilliant Fixation 3010.png',
			pos: '70% 0%',
			zoom: 1.2,
			featured5: ['she-already-shut-her-eyes'],
			featured4: ['perfect-timing', 'under-the-blue-sky', 'trend-of-the-universal-market']
		},
		{
			code: 3011,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-10-11 06:00:00',
			end: '2023-10-27 11:59:00',
			color: '#c6d2ff',
			version: '1.4',
			image: 'Brilliant Fixation 3011.jpg',
			pos: '70% 0%',
			zoom: 1.2,
			featured5: ['i-shall-be-my-own-sword'],
			featured4: ['memories-of-the-past', 'make-the-world-clamor', 'eyes-of-the-prey'],
			timezoneDependent: true
		},
		{
			code: 3012,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-10-27 12:00:00',
			end: '2023-11-14 14:59:00',
			color: '#f7f6fd',
			version: '1.4',
			image: 'Brilliant Fixation 3012.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['worrisome-blissful'],
			featured4: [
				'the-moles-welcome-you',
				'resolution-shines-as-pearls-of-sweat',
				'only-silence-remains'
			]
		},
		{
			code: 3013,
			type: 'lightcone',
			name: 'Bygone Reminiscence',
			start: '2023-10-27 12:00:00',
			end: '2023-11-14 14:59:00',
			color: '#f7f6fd',
			version: '1.4',
			image: 'Bygone Reminiscence 3013.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['in-the-night'],
			featured4: [
				'the-moles-welcome-you',
				'resolution-shines-as-pearls-of-sweat',
				'only-silence-remains'
			]
		},
		{
			code: 3014,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-11-15 06:00:00',
			end: '2023-12-06 11:59:00',
			color: '#cee6da',
			version: '1.5',
			image: 'Brilliant Fixation 3014.png',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['night-of-fright'],
			featured4: ['shared-feeling', 'subscribe-for-more', 'trend-of-the-universal-market'],
			timezoneDependent: true
		},
		{
			code: 3015,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-12-06 12:00:00',
			end: '2023-12-26 14:59:00',
			color: '#e97762',
			version: '1.5',
			image: 'Brilliant Fixation 3015.png',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['an-instant-before-a-gaze'],
			featured4: ['under-the-blue-sky', 'post-op-conversation', 'the-birth-of-the-self']
		},
		{
			code: 3016,
			type: 'lightcone',
			name: 'Bygone Reminiscence',
			start: '2023-12-06 12:00:00',
			end: '2023-12-26 14:59:00',
			color: '#e97762',
			version: '1.5',
			image: 'Bygone Reminiscence 3016.png',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['incessant-rain'],
			featured4: ['under-the-blue-sky', 'post-op-conversation', 'the-birth-of-the-self']
		},
		{
			code: 3017,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2023-12-27 06:00:00',
			end: '2024-01-17 14:59:00',
			color: '#e9e9e9',
			version: '1.6',
			image: 'Brilliant Fixation 3017.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['past-self-in-mirror'],
			featured4: ['planetary-rendezvous', 'day-one-of-my-new-life', 'a-secret-vow'],
			timezoneDependent: true
		},
		{
			code: 3018,
			type: 'lightcone',
			name: 'Bygone Reminiscence',
			start: '2023-12-27 06:00:00',
			end: '2024-01-17 14:59:00',
			color: '#7d90c3',
			version: '1.6',
			image: 'Bygone Reminiscence 3018.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['the-unreachable-side'],
			featured4: ['planetary-rendezvous', 'day-one-of-my-new-life', 'a-secret-vow'],
			timezoneDependent: true
		},
		{
			code: 3019,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2024-01-17 12:00:00',
			end: '2024-02-05 14:59:00',
			color: '#7d90c3',
			version: '1.6',
			image: 'Brilliant Fixation 3019.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['baptism-of-pure-thought'],
			featured4: ['perfect-timing', 'only-silence-remains', 'landaus-choice']
		},
		{
			code: 3020,
			type: 'lightcone',
			name: 'Bygone Reminiscence',
			start: '2024-01-17 12:00:00',
			end: '2024-02-05 14:59:00',
			color: '#7d90c3',
			version: '1.6',
			image: 'Bygone Reminiscence 3020.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['patience-is-all-you-need'],
			featured4: ['perfect-timing', 'only-silence-remains', 'landaus-choice']
		},
		{
			code: 3021,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2024-02-06 06:00:00',
			end: '2024-02-29 14:59:00',
			color: '#7d90c3',
			version: '2.0',
			image: 'Brilliant Fixation 3021.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['reforged-remembrance'],
			featured4: ['indelible-promise', 'resolution-shines-as-pearls-of-sweat', 'dance-dance-dance'],
			timezoneDependent: true
		},
		{
			code: 3022,
			type: 'lightcone',
			name: 'Bygone Reminiscence',
			start: '2024-02-06 06:00:00',
			end: '2024-02-29 14:59:00',
			color: '#9fc6bb',
			version: '2.0',
			image: 'Bygone Reminiscence 3022.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['brighter-than-the-sun'],
			featured4: ['indelible-promise', 'resolution-shines-as-pearls-of-sweat', 'dance-dance-dance'],
			timezoneDependent: true
		},
		{
			code: 3023,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2024-02-29 12:00:00',
			end: '2024-03-26 14:59:00',
			color: '#9fc6bb',
			version: '2.0',
			image: 'Brilliant Fixation 3023.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['earthly-escapade'],
			featured4: ['planetary-rendezvous', 'under-the-blue-sky', 'geniuses-repose']
		},
		{
			code: 3024,
			type: 'lightcone',
			name: 'Bygone Reminiscence',
			start: '2024-02-29 12:00:00',
			end: '2024-03-26 14:59:00',
			color: '#9fc6bb',
			version: '2.0',
			image: 'Bygone Reminiscence 3024.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['before-dawn'],
			featured4: ['planetary-rendezvous', 'under-the-blue-sky', 'geniuses-repose']
		},
		{
			code: 3025,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2024-03-27 06:00:00',
			end: '2024-04-17 11:59:00',
			color: '#adbfbd',
			version: '2.1',
			image: 'Brilliant Fixation 3025.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['along-the-passing-shore'],
			featured4: ['good-night-and-sleep-well', 'post-op-conversation', 'subscribe-for-more'],
			timezoneDependent: true
		},
		{
			code: 3026,
			type: 'lightcone',
			name: 'Bygone Reminiscence',
			start: '2024-03-27 06:00:00',
			end: '2024-04-17 11:59:00',
			color: '#fbefd1',
			version: '2.1',
			image: 'Bygone Reminiscence 3026.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['echoes-of-the-coffin'],
			featured4: ['good-night-and-sleep-well', 'post-op-conversation', 'subscribe-for-more'],
			timezoneDependent: true
		},
		{
			code: 3027,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2024-04-17 12:00:00',
			end: '2024-05-07 15:00:00',
			color: '#fdf5c9',
			version: '2.1',
			image: 'Brilliant Fixation 3027.jpg',
			pos: '70% 0%',
			zoom: 1.2,
			featured5: ['inherently-unjust-destiny'],
			featured4: ['concert-for-two', 'shared-feeling', 'make-the-world-clamor']
		},
		{
			code: 3028,
			type: 'lightcone',
			name: 'Bygone Reminiscence',
			start: '2024-04-17 12:00:00',
			end: '2024-05-07 15:00:00',
			color: '#c6d2ff',
			version: '2.1',
			image: 'Bygone Reminiscence 3028.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['i-shall-be-my-own-sword'],
			featured4: ['concert-for-two', 'shared-feeling', 'make-the-world-clamor']
		},
		{
			code: 3029,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2024-05-08 06:00:00',
			end: '2024-05-29 11:59:00',
			color: '#c99ae4',
			version: '2.2',
			image: 'Brilliant Fixation 3029.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['flowing-nightglow'],
			featured4: ['boundless-choreo', 'swordplay', 'perfect-timing'],
			timezoneDependent: true
		},
		{
			code: 3030,
			type: 'lightcone',
			name: 'Bygone Reminiscence',
			start: '2024-05-08 06:00:00',
			end: '2024-05-29 11:59:00',
			color: '#f7f6fd',
			version: '2.2',
			image: 'Bygone Reminiscence 3030.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['worrisome-blissful'],
			featured4: ['boundless-choreo', 'swordplay', 'perfect-timing'],
			timezoneDependent: true
		},
		{
			code: 3031,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2024-05-29 12:00:00',
			end: '2024-06-18 15:00:00',
			color: '#cac3bb',
			version: '2.2',
			image: 'Brilliant Fixation 3031.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['sailing-towards-a-second-life'],
			featured4: ['geniuses-repose', 'a-secret-vow', 'landaus-choice']
		},
		{
			code: 3032,
			type: 'lightcone',
			name: 'Bygone Reminiscence',
			start: '2024-05-29 12:00:00',
			end: '2024-06-18 15:00:00',
			color: '#fbc6e6',
			version: '2.2',
			image: 'Bygone Reminiscence 3032.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['she-already-shut-her-eyes'],
			featured4: ['geniuses-repose', 'a-secret-vow', 'landaus-choice']
		},
		{
			code: 3033,
			type: 'lightcone',
			name: 'Brilliant Fixation',
			start: '2024-06-19 06:00:00',
			end: '2024-07-10 11:59:00',
			color: '#a3d1aa',
			version: '2.3',
			image: 'Brilliant Fixation 3033.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['whereabouts-should-dreams-rest'],
			featured4: ['memories-of-the-past', 'day-one-of-my-new-life', 'eyes-of-the-prey'],
			timezoneDependent: true
		},
		{
			code: 3034,
			type: 'lightcone',
			name: 'Bygone Reminiscence',
			start: '2024-06-19 06:00:00',
			end: '2024-07-10 11:59:00',
			color: '#e9e9e9',
			version: '2.3',
			image: 'Bygone Reminiscence 3034.jpg',
			pos: '70% 20%',
			zoom: 1.2,
			featured5: ['past-self-in-mirror'],
			featured4: ['memories-of-the-past', 'day-one-of-my-new-life', 'eyes-of-the-prey'],
			timezoneDependent: true
		}
	],
	standard: [
		{
			code: 1001,
			type: 'standard',
			name: 'Stellar Warp',
			start: '2023-04-26 06:00:00',
			end: '2100-12-31 00:00:00',
			color: '#dfb6ff',
			version: '1.0',
			image: 'Stellar Warp.png',
			pos: '100% 0%',
			zoom: 1.1,
			featured5: [],
			featured4: []
		}
	],
	beginner: [
		{
			code: 4001,
			type: 'beginner',
			name: 'Departure Warp',
			start: '2023-04-26 06:00:00',
			end: '2100-12-31 00:00:00',
			color: '#dfb6ff',
			version: '1.0',
			image: 'Departure Warp.png',
			pos: '85% 0%',
			zoom: 1.2,
			featured5: [],
			featured4: []
		}
	]
};

export const bannersMap: { [x: number]: Banner | undefined } = Object.values(banners)
	.flat()
	.reduce((acc, item) => {
		acc[item.code] = item;
		return acc;
	}, {} as { [key: number]: Banner });
