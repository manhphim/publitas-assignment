const BASE_URL = 'http://localhost:3001';

export async function getCategories() {
	const data = await fetch(`${BASE_URL}/categories`);

	return data.json();
}

export async function deleteCategory(id: number) {
	await fetch(`${BASE_URL}/categories/${id}`, {
		method: 'DELETE',
	});
}
