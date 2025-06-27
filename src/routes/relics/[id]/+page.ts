import type { PageLoad } from './$types';
import relicsData from '$data/relics/vi.json';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
	const id = params.id.toLowerCase();
	const relic = relicsData[params.id];

	if (!relic) {
		throw error(404, 'Relic not found');
	}

	return {
		relic
	};
};
