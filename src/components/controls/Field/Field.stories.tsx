import type { Meta, StoryObj } from '@storybook/react';
import Field from './Field';
import FieldProps from './Field.types';
import { Input } from "@/components";

const meta: Meta<typeof Field> = {
    title: 'Controls/Field',
    component: Field,
    tags: ['autodocs']
}

export default meta;

export const Default = (args: FieldProps) => {
    return (
        <Field {...args}>
            <Input type="text" placeholder="Type here..." />
        </Field>
    );
}