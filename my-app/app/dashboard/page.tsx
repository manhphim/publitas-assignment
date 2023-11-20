import { DataTable } from './data-table';
import React from 'react';
import { columns } from './columns';
import fsPromises from 'fs/promises';
import path from 'path';

const fetchData = async () => {
	const filePath = path.join(process.cwd(), 'static/categories.json');
	const jsonData = await fsPromises.readFile(filePath, 'utf-8');
	const objectData = JSON.parse(jsonData);
	return objectData;
};

// const deleteCategory = async (id: string) => {
// 	const objectData = await fetchData();
// 	const filteredData = objectData.filter((item: any) => item.id !== id);
// 	// const stringifiedData = JSON.stringify(filteredData);
// };

export default async function Page() {
	const data = await fetchData();

	const handleDeleteCategory = (id: string) => {
		console.log(id);
	};

	return (
		data && (
			<div className='container py-10 mx-auto'>
				<DataTable columns={columns} data={data} />
			</div>
		)
	);
}
