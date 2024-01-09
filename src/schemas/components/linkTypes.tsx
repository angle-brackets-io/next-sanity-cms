import { Button, Grid, Stack } from '@sanity/ui'
import { ArrayOfObjectsInputProps } from 'sanity'

export function LinkTypes(props: ArrayOfObjectsInputProps) {
  return (
    <Stack space={3}>
      <Grid columns={3} gap={1}>
        <Button>One button</Button>
      </Grid>
    </Stack>
  )
}
