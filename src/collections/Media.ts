import { CollectionConfig } from 'payload'
import { put } from '@vercel/blob'
import { nanoid } from 'nanoid'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    disableLocalStorage: true,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        const file = req?.file

        if (!file) return data

        const fileName = `${Date.now()}-${nanoid()}-${file.name}`

        const blob = await put(fileName, file.data, {
          access: 'public',
        })

        return {
          ...data,
          url: blob.url,
        }
      },
    ],
  },
  fields: [
    {
      name: 'url',
      type: 'text',
    },
  ],
}
