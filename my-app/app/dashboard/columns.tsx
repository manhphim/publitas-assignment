'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { Category } from '@/model/Category';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ColumnHeader';
import ActionDialog from '@/components/ActionDialog';

export const isWithinRange = (
	row: Row<Category>,
	columnId: string,
	value: any
) => {
	const date: Date = row.getValue(columnId);
	const [start, end] = value; // value => two date input values
	//If one filter defined and date is null filter it
	if ((start || end) && !date) return false;
	if (start && !end) {
		return date.getTime() >= start.getTime();
	} else if (!start && end) {
		return date.getTime() <= end.getTime();
	} else if (start && end) {
		return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
	} else return true;
};

export const columns: ColumnDef<Category>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Name' />
		),
	},
	{
		accessorKey: 'activeFrom',
		header: 'Active from',
		filterFn: isWithinRange,
	},
	{
		accessorKey: 'activeUntil',
		header: 'Active until',
		filterFn: isWithinRange,
	},
	{
		accessorKey: 'iconUrl',
		header: 'Image',
		cell: ({ row }) => {
			return (
				<Image
					src={row.getValue('iconUrl')}
					width={50}
					height={50}
					alt='image'
				/>
			);
		},
	},
	{
		accessorKey: 'action',
		header: 'Action',
		cell: ({ row }) => {
			return <ActionDialog category={row.original} />;
		},
	},
];
