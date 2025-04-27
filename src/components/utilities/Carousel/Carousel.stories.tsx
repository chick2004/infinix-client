import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, Icon } from '@/components';
import CarouselProps from './Carousel.types';

const meta: Meta<typeof Carousel> = {
    title: 'Utilities/Carousel',
    component: Carousel,
    subcomponents: { Icon },
    tags: ['autodocs']
}

export default meta;

export const Docs = (args: CarouselProps) => {
    return (
        <Carousel {...args}></Carousel>
    );
}