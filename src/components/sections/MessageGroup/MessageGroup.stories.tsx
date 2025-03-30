import type { Meta, StoryObj } from '@storybook/react';
import MessageGroup from './MessageGroup';
import MessageGroupProps from './MessageGroup.types';

const meta: Meta<typeof MessageGroup> = {
    title: 'Section/MessageGroup',
    component: MessageGroup,
    tags: ['autodocs']
}

export default meta;

export const Default = (args: MessageGroupProps) => {
    return (
        <MessageGroup {...args}/>
    );
}