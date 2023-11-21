'use client';

import React, { useEffect, useState } from 'react';

import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	ColumnFiltersState,
	getFilteredRowModel,
	VisibilityState,
	Row,
} from '@tanstack/react-table';

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Label } from '@/components/ui/label';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTablePagination } from '../../components/Pagination';
import { isWithinRange } from './columns';
import { parseISO, format } from 'date-fns';
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [internalData, setInternalData] = useState<TData[]>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	useEffect(() => {
		setInternalData(data);
	}, [data]);

	const filterActiveCategories = (data: Category[]) => {
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
		onGlobalFilterChange: setGlobalFilter,
		onRowSelectionChange: setRowSelection,
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,

			rowSelection,
		},
	});

	const handleDeleteCategory = () => {
		const selectedRows = table.getSelectedRowModel().rows;

		const items = selectedRows.map((row) => row.original);

		const filteredData = internalData.filter((item) => {
			return !items.includes(item);
		});

		setInternalData(filteredData);
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
				<div className='flex items-center gap-4'>
					<Input
						placeholder='Search category...'
						value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn('name')?.setFilterValue(event.target.value)
						}
						className='max-w-sm'
					/>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant={
									table.getFilteredSelectedRowModel().rows.length > 0
										? 'destructive'
										: 'outline'
								}
								className='ml-auto'
								disabled={
									table.getFilteredSelectedRowModel().rows.length === 0
								}>
								Delete categories
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete the
									selected categories.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleDeleteCategory}>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
					<Switch
						id='activeCategory'
						onCheckedChange={handleFilterActiveCategories}
					/>
					<Label htmlFor='activeCategory'>Active category</Label>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='border rounded-md'>
				<Table>
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
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<DataTablePagination table={table} />
		</div>
	);
}
