import React from 'react';
import { Table, flexRender } from '@tanstack/react-table';
import { columns } from '@/components/columns';
import {
	Table as TableComponent,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
	TableHead,
} from '@/components/ui/table';

interface TableBodyProps<TData> {
	table: Table<TData>;
}

export function DataTableBody<TData>({ table }: TableBodyProps<TData>) {
	return (
		<div className='border rounded-md'>
			<TableComponent>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</TableComponent>
		</div>
	);
}

export default DataTableBody;
