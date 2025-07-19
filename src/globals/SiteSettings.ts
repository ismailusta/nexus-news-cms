import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Ayarları',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteTitle',
      label: 'Site Başlığı',
      type: 'text',
      required: true,
    },
    {
      name: 'siteDescription',
      label: 'Site Açıklaması',
      type: 'textarea',
    },
    {
      name: 'themeColors',
      label: 'Tema Renkleri',
      type: 'group',
      fields: [
        {
          name: 'primary',
          label: 'Ana Renk',
          type: 'text',
          defaultValue: '#FFFFFF',
        },
        {
          name: 'secondary',
          label: 'İkincil Renk',
          type: 'text',
          defaultValue: '#1F2937',
        },
      ],
    },
  ],
}
