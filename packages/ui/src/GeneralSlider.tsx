import { SliderProps } from 'tamagui'
import { Slider, XStack, Text } from 'tamagui'
import { useState } from 'react';
type generalSliderProps = {
    onValueChange: (value: number) => void;
};
export const GeneralSlider = ({ onValueChange }: generalSliderProps) => {
    const [value, setValue] = useState(0);
    const handleValueChange = (newValue: number[]) => {
        const singleValue = newValue[0];
        setValue(singleValue);
    }
    return (
        <>
            <Slider
                width={100}
                defaultValue={[0]}
                max={10}
                step={1}
                onValueChange={handleValueChange}
        >
                <Slider.Track>
                <Slider.TrackActive />
                </Slider.Track>
                <Slider.Thumb index={0} circular elevate />
            </Slider>
        </>
    )
}