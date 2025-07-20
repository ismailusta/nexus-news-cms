import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    // Eklenti, thumbnail'ları ve diğer her şeyi yönetecek.
    // Biz sadece Payload'un yerel depolamasını devre dışı bırakıyoruz.
    disableLocalStorage: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    // Eklentinin, dosyanın tam URL'sini kaydedeceği alan
    {
      name: 'url',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
}
