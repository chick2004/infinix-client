import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import InputProps from './Input.types';

const meta: Meta<typeof Input> = {
    title: 'Controls/Input',
    component: Input,
    tags: ['autodocs']
}

export default meta;

export const Text = (args: InputProps) => {
    return (
        <Input type={"text"} {...args}/>
    );
}

export const Search = (args: InputProps) => {
    return (
        <Input type={"search"} {...args}/>
    );
}

export const Password = (args: InputProps) => {
    return (
        <Input type={"password"} {...args}/>
    );
}

export const Number = (args: InputProps) => {
    return (
        <Input type={"number"} {...args}/>
    );
}