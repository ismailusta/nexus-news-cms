import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Yazar Adı',
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      label: 'Profil Fotoğrafı',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
