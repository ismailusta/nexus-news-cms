import { put } from '@vercel/blob'
import {
  BeforeChangeHook,
  CollectionConfig,
} from 'node_modules/payload/dist/collections/config/types'

// Bu hook, dosyayı DOĞRUDAN Vercel Blob'a yükler
const uploadToVercel: BeforeChangeHook = async ({ data, req }) => {
  // Sadece bir dosya yükleniyorsa devam et
  if (req.file && req.file.data) {
    const file = req.file
    console.log(`--- Vercel Blob Yükleme Başladı: ${file.name} ---`)

    try {
      // Vercel'in 'put' fonksiyonunu kullanarak dosyayı yüklüyoruz
      const blob = await put(file.name, file.data, {
        access: 'public',
      })

      console.log('✅ Vercel Blob Yükleme Başarılı:', blob)

      // Veritabanına kaydedilecek olan 'data' objesini,
      // Vercel'den dönen GERÇEK URL ile güncelliyoruz.
      data.url = blob.url
      return data
    } catch (error: any) {
      console.error('Vercel Blob Upload Error:', error)
      throw new Error(`Dosya Vercel Blob'a yüklenemedi: ${error.message}`)
    }
  }
  return data
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: true, // Payload'un dosya handling'ini aktif etmesi için bu gerekli
  hooks: {
    beforeChange: [uploadToVercel],
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
