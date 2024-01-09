import { Button, Grid, Stack } from '@sanity/ui'
import { useCallback, useState } from 'react'
import {
  ArrayInputFunctionsProps,
  ArrayOfObjectsInputProps,
  ArraySchemaType,
  ObjectItem,
} from 'sanity'

// Most code is copied from https://github.com/sanity-io/sanity/blob/e607be828dec1c7903731faed601a848ac545335/packages/sanity/src/core/form/inputs/arrays/ArrayOfObjectsInput/ArrayOfObjectsFunctions.tsx
import { AddModuleButton } from './addModuleButton'
export function ArrayOfObjectsFunctions<
  Item extends ObjectItem,
  SchemaType extends ArraySchemaType,
>(props: ArrayInputFunctionsProps<Item, SchemaType>) {
  const { schemaType, onValueCreate, onItemAppend } = props

  const insertItem = useCallback(
    (itemType: any) => {
      const item = onValueCreate(itemType)

      onItemAppend(item)
    },
    [onValueCreate, onItemAppend],
  )

  const { of: modules } = schemaType
  const [lastDisplayedModuleIndex, setLastDisplayedModuleIndex] = useState(
    Math.min(modules.length - 1, 2),
  )
  const displayedModules = modules.slice(0, lastDisplayedModuleIndex + 1)
  const haveHiddenModules = lastDisplayedModuleIndex < modules.length - 1

  function showAllModules() {
    setLastDisplayedModuleIndex(modules.length - 1)
  }

  const handleAddBtnClick = useCallback(
    (module: any) => {
      insertItem(module)
    },
    [insertItem],
  )

  return (
    <>
      <Grid columns={3} gap={1}>
        {displayedModules.map((module, index) => {
          // @ts-ignore storybook is custom property
          const { title, storybook, icon } = module
          const { id } = storybook

          return (
            <AddModuleButton
              key={index}
              id={id}
              // icon={icon}
              title={title || ''}
              onClick={() => handleAddBtnClick(module)}
            />
          )
        })}
      </Grid>
      {haveHiddenModules && (
        <Button
          mode="ghost"
          padding={3}
          onClick={showAllModules}
          text="Show all modules"
        />
      )}
    </>
  )
}

export function ModulesInput(props: ArrayOfObjectsInputProps) {
  return (
    <Stack space={3}>
      {/* Use custom arrayFunctions to remove the default add item button */}
      {/* See https://github.com/sanity-io/sanity/pull/3797 */}
      {props.renderDefault({
        ...props,
        arrayFunctions: ArrayOfObjectsFunctions,
      })}
    </Stack>
  )
}
