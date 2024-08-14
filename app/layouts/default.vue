<script setup lang="ts">
  import AppHeader from '~/components/app-header.vue'

  useHead({
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
        crossorigin: '',
      },
    ],
  })
</script>

<template>
  <div class="container mx-auto px-2 max-w-4xl">
    <AppHeader />
    <main class="my-10">
      <slot />
    </main>
  </div>
</template>

<style>
  /* Set the font family for the entire site */
  body {
    font-family: 'Inter';
  }
  /* Set the background color for the entire site */
  body {
    @apply dark:bg-gray-900 bg-white;
  }
</style>
