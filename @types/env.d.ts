/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NUXT_PUBLIC_SUPABASE_URL: string
  readonly NUXT_PUBLIC_SUPABASE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
