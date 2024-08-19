<script setup lang="ts">
  definePageMeta({
    layout: 'error',
    title: 'Error',
  })
  const { fullPath } = useRoute()
</script>
<template>
  <div class="flex flex-col items-center font-extrabold">
    <h1 class="text-5xl mb-3">404</h1>
    <p>Não encontramos a página "{{ fullPath }}".</p>
    <UButton
      class="mt-4"
      color="red"
      to="/"
      >Voltar para a página principal</UButton
    >
  </div>
</template>
