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
}
