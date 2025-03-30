import type { Meta, StoryObj } from '@storybook/react';
import DropdownSearch from './DropdownSearch';
import DropdownSearchProps from './DropdownSearch.types';

const meta: Meta<typeof DropdownSearch> = {
    title: 'Controls/DropdownSearch',
    component: DropdownSearch,
    tags: ['autodocs']
}

export default meta;

export const Default = (args: DropdownSearchProps) => {
    return (
        <DropdownSearch {...args} />
    );
}