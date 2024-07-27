import { SliderProps } from 'tamagui'
import { Slider, XStack, Text } from 'tamagui'
import { useState } from 'react';

type NumLayoutsSliderProps = {
  onValueChange: (value: number) => void;
};

export const NumLayoutsSlider = ({ onValueChange }: NumLayoutsSliderProps) => {
    const [value, setValue] = useState(0);

    const handleValueChange = (newValue: number[]) => {
        const singleValue = newValue[0];
        setValue(singleValue);
        onValueChange(singleValue);
    }

    return (
        <XStack gap="$4">
            <Slider 
                width={100} 
                defaultValue={[0]} 
                max={10} 
                step={1} 
                onValueChange={handleValueChange}
            >
                <Slider.Track>
                    <Slider.Thumb index={0} circular elevate />
                </Slider.Track>
            </Slider>
            <Text fontSize={30}>{value}</Text>
        </XStack>
    )
}