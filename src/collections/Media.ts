import {
  BeforeChangeHook,
  CollectionConfig,
} from 'node_modules/payload/dist/collections/config/types'

const ensureCorrectURL: BeforeChangeHook = ({ data, req }) => {
  console.log('--- Media beforeChange Hook Başladı ---')

  const file = req.file as any

  // Gelen req.file objesinin tamamını loglayalım, içinde ne var görelim.
  console.log('Gelen req.file objesi:', file)

  if (file?.url) {
    console.log('✅ req.file.url bulundu:', file.url)
    data.url = file.url
    console.log('📝 data.url alanı güncellendi.')
  } else {
    console.log('❌ req.file.url bulunamadı! Bu yüzden data.url güncellenemedi.')
  }

  console.log('--- Hook Bitişi: Veritabanına kaydedilecek son veri ---', data)
  return data
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    adminThumbnail: ({ doc }) => doc.url as string,
  },
  hooks: {
    beforeChange: [ensureCorrectURL],
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
}
