import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
  upload: {
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) => doc.url as string,
  },
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        const maybeUrl = (req?.file as { url?: string })?.url

        console.log('--- Media Upload Hook Log ---')
        console.log('File object:', req?.file)
        console.log('Extracted file.url:', maybeUrl)

        if (maybeUrl) {
          data.url = maybeUrl
          console.log('✅ data.url güncellendi:', data.url)
        } else {
          console.warn('⚠️ file.url bulunamadı. data.url güncellenmedi.')
        }

        return data
      },
    ],
  },
}
