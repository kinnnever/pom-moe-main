import { error } from '@sveltejs/kit';

const modules = import.meta.glob('../*.svelte'); // lấy tất cả các file nhân vật

export const load = async ({ params }) => {
	const id = params.id;
	const path = `../${id}.svelte`;

	// Nếu không tồn tại file svelte tương ứng, trả về 404
	if (!(path in modules)) {
		throw error(404, 'Not found');
	}

	return { id };
};

export const prerender = false; // nếu bạn đang dùng dynamic import thì nên để false
