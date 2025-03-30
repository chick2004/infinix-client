import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import CheckboxProps from './Checkbox.types';

const meta: Meta<typeof Checkbox> = {
    title: 'Controls/Checkbox',
    component: Checkbox,
    tags: ['autodocs']
}

export default meta;

export const Default = (args: CheckboxProps) => {
    return (
        <Checkbox {...args} />
    );
}