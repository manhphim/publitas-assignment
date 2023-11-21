import React from 'react';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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
interface TableControlProps<TData> {
	table: Table<TData>;
	handleDeleteCategory: () => void;
	handleFilterActiveCategories: (value: boolean) => void;
}

export function TableControl<TData>({
	table,
	handleDeleteCategory,
	handleFilterActiveCategories,
}: TableControlProps<TData>) {
	return (
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
						disabled={table.getFilteredSelectedRowModel().rows.length === 0}>
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
	);
}

export default TableControl;
