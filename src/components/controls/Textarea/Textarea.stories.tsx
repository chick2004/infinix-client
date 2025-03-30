import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './Textarea';
import TextareaProps from './Textarea.types';

const meta: Meta<typeof Textarea> = {
    title: 'Controls/Textarea',
    component: Textarea,
    tags: ['autodocs']
}

export default meta;

export const Default = (args: TextareaProps) => {
    return (
        <Textarea {...args}/>
    );
}