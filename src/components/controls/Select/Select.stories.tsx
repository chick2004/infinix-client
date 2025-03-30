import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import SelectProps from './Select.types';

const meta: Meta<typeof Select> = {
    title: 'Controls/Select',
    component: Select,
    tags: ['autodocs']
}

export default meta;

export const Default = (args: SelectProps) => {
    return (
        <Select {...args}/>
    );
}