import { ChevronDown, ChevronUp, X } from '@tamagui/lucide-icons'
import { Button } from '@my/ui'
export const SwitchLayoutButton = (prop: {prop: number})  => {
    return (
        <>
        <Button size="$3"
                circular
                icon={ChevronDown}
                style={{ transform: [{ rotate: `${prop.prop}deg`}] }}
                >
            </Button>
        </>
    )}