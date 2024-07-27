import { Button } from 'tamagui'

export const GenerateButton = ({ onPress }) => {
    return (
        <Button size={"$4"} borderWidth={2} onPress={onPress}>   
            Generate
        </Button>
    )
}
