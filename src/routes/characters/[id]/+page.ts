import characters from '$data/characters';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load = ({ params }) => {
	const id = params.id;
	const validIds = ['acheron','male-destruction'];
	if (!validIds.includes(id)) throw error(404, 'Not found');

	return { id };
};
export const prerender = false;
