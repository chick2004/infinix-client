import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';
import IconProps from './Icon.types';

const meta: Meta<typeof Icon> = {
    title: 'Utilities/Icon',
    component: Icon,
    tags: ['autodocs']
}

export default meta;

export const Docs = (args: IconProps) => {
    return (
        <Icon {...args} />
    );
}