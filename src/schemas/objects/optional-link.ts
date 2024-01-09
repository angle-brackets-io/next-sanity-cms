import { Link } from '@phosphor-icons/react'

import { getArrayInput } from '../components/arrayInput'

export const optionalLink = {
  name: 'optionalLink',
  title: 'Link',
  icon: Link,
  type: 'array',
  of: [{ type: 'link', name: 'link' }],
  components: {
    input: getArrayInput({
      maxLength: 1,
    }),
  },
}
