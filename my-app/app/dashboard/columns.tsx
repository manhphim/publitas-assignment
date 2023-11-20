'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Category } from '@/model/Category';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ColumnHeader';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import ActionDialog from '@/components/ActionDialog';
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
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Active from' />
		),
	},
	{
		accessorKey: 'activeUntil',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Active until' />
		),
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
