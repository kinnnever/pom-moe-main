import type { PageLoad } from './$types';
import lightconesData from '$data/lightcones/vi.json';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
	const id = params.id.toLowerCase();
	const relic = lightconesData[params.id];

	if (!relic) {
		throw error(404, 'Lightcone not found');
	}

	return {
		relic
	};
};
