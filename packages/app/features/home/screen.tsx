import {
  XStack,
  YStack,
  Label,
} from '@my/ui'
import React, { useState } from 'react'
import { SwitchLayoutButton } from '@my/ui/src/UILayoutButtonSwitcher'
import { GeneralSlider } from '@my/ui/src/GeneralSlider'
import { GenerateButton } from '@my/ui/src/GenerateButton'
import { createElement, useEffect, ReactElement } from 'react'
import { styled } from 'tamagui'
import { Input } from 'tamagui'
import { Slider, Button } from 'tamagui'
import { getTokens } from 'tamagui'
import reactElementToJSXString from 'react';
import {plugins, format as prettyFormat} from 'pretty-format';




import {componentMap ,ComponentRulesForms, ComponentRulesLayout } from '../../../../utils/ComponentRegistry'
//Returns Array of React Components 


function generateRandomArrangement(
  numberOfLayouts: number,
  depth: number = 0,
  padding: number,
  size: number,
): React.ReactElement {
  //Change Depth depending on how far deep structures are needed
  if (numberOfLayouts <= 0 || depth > 3) {
    // If no more layouts or max depth reached, return a random component
    const RandomComponentObject = ComponentRulesForms[Math.floor(Math.random() * ComponentRulesForms.length)];
    const RandomComponent = RandomComponentObject.component;
    const styleProps = RandomComponentObject.style_properties;
    return React.createElement(RandomComponent, { key: Math.random(), ...styleProps });
  }
  const randomLayoutObject = ComponentRulesLayout[Math.floor(Math.random() * ComponentRulesLayout.length)];
  randomLayoutObject.style_properties.padding = padding;
  const randomLayout = randomLayoutObject.component;


  const children: React.ReactElement[] = [];
  //Implement # of Components
  const childCount = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < childCount; i++) {
    if (Math.random() < 0.5 && numberOfLayouts > 1) {
      // 50% chance to create a nested layout
      children.push(generateRandomArrangement(numberOfLayouts - 1, depth + 1, padding, size));
    } else {
      // Add a random component
      const RandomComponentObject = ComponentRulesForms[Math.floor(Math.random() * ComponentRulesForms.length)];
      const RandomComponent = RandomComponentObject.component;
      const styleProps = RandomComponentObject.style_properties;
      console.log(styleProps);
      children.push(React.createElement(RandomComponent, { key: Math.random(), ...styleProps }));
    }
  }
  return React.createElement(randomLayout, { key: Math.random(), ...randomLayoutObject.style_properties }, ...children);
}
export function HomeScreen() {
  const [numLayouts, setNumLayouts] = useState("1");
  const [componentSize, setComponentSize] = useState("1");
  const [paddingSize, setPaddingSize] = useState("1");
  const [customElement, setCustomElement] = useState<ReactElement | null>(null);
  const [minColorIndex, setMinColorIndex] = useState(0)
  const [isExportView, setIsExportView] = useState(false);
  const [savedStructures, setSavedStructures] = useState<ReactElement[]>([]);

  const saveCurrentStructure = () => {
    if (customElement) {
      setSavedStructures(prev => [...prev, customElement]);
    }
  };
  const removeStructure = (index: number) => {
    setSavedStructures(structures => structures.filter((_, i) => i !== index));
  };
  useEffect(() => {
    handleGenerate();
  }, []);
  const testing = 10;

  const handleGenerate = () => {
    const numberOfLayouts = parseInt(numLayouts);
    const sizeRange = parseInt(componentSize);
    const paddingRange = parseInt(paddingSize);
    const CustomElement = generateRandomArrangement(numberOfLayouts, 0, sizeRange, paddingRange);
    setCustomElement(CustomElement);
  }

  const exportStructures = () => {
    
    for(let i =0; i < savedStructures.length; i++){
      console.log(savedStructures[i]);
    }
    
    const structuresJSX = savedStructures.map((structure, index) => {
      return `
        // Saved Structure ${index + 1}
        export const Structure${index + 1} = () => (
          ${prettyFormat(structure, {
            plugins: [plugins.ReactElement],
            printFunctionName: false,
          })}
        );
      `;
    }).join('\n\n');
    const fullExport = `
import React from 'react';
import { YStack, XStack, Label, Input, Button } from '@my/ui';
import { BoxContainer } from './BoxContainer';
import { GenerateButton } from '@my/ui/src/GenerateButton';
      ${structuresJSX}
    `;
    // Create a Blob with the formatted content
    const blob = new Blob([fullExport], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    // Create a link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_structures.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  if(isExportView){
    return (
      <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
         {savedStructures.map((structure, index) => (
            <XStack key={index} gap="$4" mb="$4">
              <BoxContainer>{structure}</BoxContainer>
              <Button onPress={() => removeStructure(index)}>Remove</Button>
            </XStack>
          ))}
          <Button onPress={exportStructures}>Export</Button>
        <Button onPress={() => setIsExportView(false)}>Generate View</Button>
      </YStack>
    )
  }

  return (
    <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
      <BoxContainer>
        <>
          {customElement}
        </>
      </BoxContainer>
      <XStack>
        <YStack gap="$4">
          <XStack gap="$4">
            <Label>
              Number of Layouts
            </Label>
            <Input
              value={numLayouts}
              onChangeText={(text) => setNumLayouts(text)}
              width={50}
            >
            </Input>
          </XStack>
          <XStack gap="$4" >
            <Label>
              Size Range
            </Label>
            <Input value-={componentSize}
              onChangeText={(text) => setComponentSize(text)}
              width={50}>
            </Input>
          </XStack>
          <XStack gap="$4" >
            <Label>
              Padding
            </Label>
            <Input value-={paddingSize}
              onChangeText={(text) => setComponentSize(text)}
              width={50}>
            </Input>
          </XStack>
        </YStack>
        <XStack gap='$4'>
          <Label>
          </Label>
        </XStack>
      </XStack>
      <YStack ai="center">
      <XStack gap="$4">
        <Button onPress={() => setIsExportView(true)}>Export View</Button>
      <GenerateButton onPress={handleGenerate} />
      <Button onPress={saveCurrentStructure}>Save Current Structure</Button>
      </XStack>
      </YStack>
    </YStack>
  )
} const BoxContainer = ({ children }) => {
  return (
    <YStack
      ai="center"
      gap="$4"
      bg="$background"
      p="$4"
      br="$4"
      bw="$0"
      borderEndColor="$borderColor"
      width={600}
      height={600}
    >
      {children}
    </YStack>
  )
}