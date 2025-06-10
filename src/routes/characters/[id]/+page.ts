// src/routes/characters/[id]/+page.ts
import { error } from '@sveltejs/kit';

export const prerender = false;

export function load({ params }) {
	const id = params.id;

	// Nếu bạn muốn kiểm tra ID tồn tại, có thể dùng list JSON để check ở đây
	return { id };
}
