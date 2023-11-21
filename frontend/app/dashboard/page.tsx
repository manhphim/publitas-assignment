'use client';

import { DataTable } from './data-table';
import React, { useState, useEffect } from 'react';
import { columns } from './columns';
import { getCategories } from '@/api/category';
export default function Page() {
	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
		getCategories().then((categories) => {
			setData(categories);
		});
	}, []);

	return (
		data && (
			<div className='container py-10 mx-auto'>
				<DataTable columns={columns} data={data} />
			</div>
		)
	);
}
