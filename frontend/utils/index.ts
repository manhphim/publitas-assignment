import { parseISO } from 'date-fns';

const filterActiveCategories = (data: any[]) => {
	const currentDate = new Date();

	return data.filter((category) => {
		if (category.activeFrom && category.activeUntil) {
			const activeFrom = parseISO(
				`${new Date().getFullYear()}-${category.activeFrom}`
			);
			const activeUntil = parseISO(
				`${new Date().getFullYear()}-${category.activeUntil}`
			);
			return currentDate >= activeFrom && currentDate <= activeUntil;
		}
		return false;
	});
};

export { filterActiveCategories };
