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

export default async function Page() {
	const data = await fetchData();

	return (
		data && (
			<div className='container py-10 mx-auto'>
				<DataTable columns={columns} data={data} />
			</div>
		)
	);
}
