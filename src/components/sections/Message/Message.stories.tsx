import type { Meta, StoryObj } from '@storybook/react';
import Message from './Message';
import MessageProps from './Message.types';

const meta: Meta<typeof Message> = {
    title: 'Section/Message',
    component: Message,
    tags: ['autodocs']
}

export default meta;

export const Default = (args: MessageProps) => {
    return (
        <Message {...args}/>
    );
}