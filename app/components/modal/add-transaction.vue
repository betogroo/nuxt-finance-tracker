<script setup lang="ts">
  const isOpen = ref(false)
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header> Add Transaction </template>
      <div>Hello</div>
      <template #footer />
    </UCard>
  </UModal>
</template>
