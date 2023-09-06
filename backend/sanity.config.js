import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'peacock',

  projectId: '8grkrw1g',
  dataset: 'peacock_data',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
