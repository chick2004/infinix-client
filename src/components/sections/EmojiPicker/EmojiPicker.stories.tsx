import type { Meta, StoryObj } from '@storybook/react';
import EmojiPicker from './EmojiPicker';
import EmojiPickerProps from './EmojiPicker.types';

const meta: Meta<typeof EmojiPicker> = {
    title: 'Section/EmojiPicker',
    component: EmojiPicker,
    tags: ['autodocs']
}

export default meta;

export const Default = (args: EmojiPickerProps) => {
    return (
        <EmojiPicker {...args}/>
    );
}