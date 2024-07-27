import { SliderProps } from 'tamagui'
import { Slider, XStack, Text, YStack, Separator } from 'tamagui'
import  { useState } from 'react';

export const SizeSlider =  ({ temp}) => {
    const [value, setValue] = useState(0);
    const handleValueChange = (value: number[]) => {
        setValue(value[0]);
    }   
    return (
        <>
        <XStack gap='$4'>
            <Slider width={100} defaultValue={[0]} max={10} step={1} onValueChange={handleValueChange}>
            <Slider.Track>
            </Slider.Track>
            <Slider.Thumb index={0} circular elevate />
        </Slider>
        <Text fontSize={30}>{value}</Text>
        </XStack>
        </>
    )    
}