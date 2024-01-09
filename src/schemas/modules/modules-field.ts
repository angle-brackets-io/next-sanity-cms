import { ModulesInput } from '../components/modulesInput'

export const getModulesField = (group?: string) => {
  return {
    name: 'modules',
    type: 'array',
    title: 'Modules',
    group,
    of: [
      {
        type: 'heroSection',
      },
    ],
    components: {
      input: ModulesInput,
    },
  }
}
