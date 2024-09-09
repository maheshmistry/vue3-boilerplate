import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: '@hey-api/client-fetch',
  //   Edit this path
  input: 'path/to/openapi.json',
  output: 'src/client'
})
