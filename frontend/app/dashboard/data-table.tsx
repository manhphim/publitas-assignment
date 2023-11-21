'use client';

import React, { useEffect, useState } from 'react';

import {
	ColumnDef,
	SortingState,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	ColumnFiltersState,
	getFilteredRowModel,
	VisibilityState,
} from '@tanstack/react-table';

import { DataTableBody } from '@/components/TableBody';
import { DataTablePagination } from '@/components/Pagination';
import { isWithinRange } from './columns';
import { deleteCategory } from '@/api/category';
import TableControl from '@/components/TableControl';
import { filterActiveCategories } from '@/utils';
import VisibilityToggler from '@/components/VisibilityToggler';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [internalData, setInternalData] = useState(data);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	useEffect(() => {
		setInternalData(data);
	}, [data]);

	const table = useReactTable({
		data: internalData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		filterFns: {
			getActiveCategories: isWithinRange,
		},
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const handleDeleteCategory = async () => {
		const selectedRows = table.getSelectedRowModel().rows;

		const items = selectedRows.map((row) => row.original);

		try {
			for (const item of items) {
				await deleteCategory(item.id);
			}

			const newData = data.filter((item) => !items.includes(item));
			setInternalData(newData);
		} catch (error) {
			console.log(error);
		}

		table.toggleAllRowsSelected(false);
	};

	const handleFilterActiveCategories = (value: boolean) => {
		if (value) {
			const filteredData = filterActiveCategories(data);
			setInternalData(filteredData);
		} else {
			setInternalData(data);
		}
	};

	return (
		<div>
			<div className='flex items-center py-4'>
				<TableControl
					table={table}
					handleDeleteCategory={handleDeleteCategory}
					handleFilterActiveCategories={handleFilterActiveCategories}
				/>

				<VisibilityToggler table={table} />
			</div>
			<DataTableBody table={table} />

			<DataTablePagination table={table} />
		</div>
	);
}
