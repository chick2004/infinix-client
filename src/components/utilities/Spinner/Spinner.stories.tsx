import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';
import SpinnerProps from './Spinner.types';

const meta: Meta<typeof Spinner> = {
    title: 'Controls/Spinner',
    component: Spinner,
    tags: ['autodocs']
}

export default meta;

export const Default = (args: SpinnerProps) => {
    return (
        <Spinner {...args}/>
    );
}