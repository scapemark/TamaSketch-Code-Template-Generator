import FormComponents from '../packages/ui/src/Forms';
import { CardBackground, XStack, YStack } from '@my/ui/src';

const {Button ,CheckBox, Input, Switch, TextArea } = FormComponents;


import { getTokens } from 'tamagui'


//const colorTokens = getTokens().color
//const colorOptions = Object.keys(colorTokens)
const sizeInput = 1;
const padding = 1;
const gap = 1;
const borderWidth = 1;

//Add any other components
//Used to get rid of WEB_PACK ERROR When printing them out
const componentMap = {
    Button: 'Button',
    CheckBox: 'CheckBox',
    Input: 'Input',
    Switch: 'Switch',
    TextArea: 'TextArea',
    XStack: 'XStack',
    YStack: 'YStack',
    
  };
  

const ComponentRulesForms = [
    {
        component: Input,
        style_properties: {
            placeholder: 'Text Goes Here',
        }
    },
    {
        component: Button,
        style_properties: {
            size: [0, 1, 2, 3, 4, 5, 6],
            placeholder: 'Sumbit',
            circular: [true, false],
        }
    },
    {
        component: Switch,
        style_properties: {
    
        }
    },
    {
        component: TextArea,
        style_properties: {
            
        }

    },
    {
        component: CheckBox,
        style_properties: {
    
        }
    },
]

const ComponentRulesLayout = [
    {
        component: XStack,
        children: [XStack, YStack, Button, CheckBox, Input, Switch, TextArea],
        style_properties: {
            padding: 0,
            gap: 0,
            backgroundColor: 'red'
        },
    },
    {
        component: YStack,
        children: [XStack, YStack, Button, CheckBox, Input, Switch, TextArea],
        style_properties: {
            padding: 0,
            gap: 0,
            backgroundColor: 'blue'
        },
    }
]

export { componentMap, ComponentRulesForms, ComponentRulesLayout}



