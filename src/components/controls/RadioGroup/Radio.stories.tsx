import type { Meta, StoryObj } from '@storybook/react';
import Radio from './RadioGroup';
import RadioProps from './RadioGroup.types';

const meta: Meta<typeof Radio> = {
    title: 'Controls/Radio',
    component: Radio,
    tags: ['autodocs']
}

export default meta;

export const Default = (args: RadioProps) => {
    return (
        <Radio {...args} />
    );
}