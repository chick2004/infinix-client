import type { Meta, StoryObj } from '@storybook/react';
import { Button, Icon } from '@/components';
import ButtonProps from './Button.types';

const meta: Meta<typeof Button> = {
    title: 'Controls/Button',
    component: Button,
    subcomponents: { Icon },
    tags: ['autodocs']
}

export default meta;

export const TextOnly = (args: ButtonProps) => {
    return (
        <Button {...args}>
            Button
        </Button>
    );
}

export const IconOnly = (args: ButtonProps) => {
    return (
        <Button {...args}>
            <Icon name="radio_button" size={20} type="regular" className="" />
        </Button>
    );
}

export const TextWithIcon = (args: ButtonProps) => {
    return (
        <Button {...args}>
            <Icon name="radio_button" size={20} type="regular" className="" />
            Button
        </Button>
    );
}