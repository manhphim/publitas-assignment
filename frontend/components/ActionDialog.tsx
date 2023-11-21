'use client';

import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Category } from '@/model/Category';

interface ActionDialogProps {
	category: Category;
}

export default function ActionDialog({ category }: ActionDialogProps) {
	const folderNLUrl = 'https://folders.nl/categorieen/';

	const navigateToCategory = (slug: string) => {
		window.open(`${folderNLUrl}${slug}`, '_blank');
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='w-8 h-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='w-4 h-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem onClick={() => navigateToCategory(category.slug)}>
					Open category
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
