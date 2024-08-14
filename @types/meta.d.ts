// types/meta.d.ts
import { type PageMeta } from 'nuxt/app'

declare module 'nuxt/app' {
  interface PageMeta {
    title: string
    showInNavBar?: boolean
    icon?: string
    requiresAuth?: boolean
    order?: number
  }
}
