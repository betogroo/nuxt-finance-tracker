<script setup lang="ts">
  import { categories, types } from '~/constants'
  const isOpen = ref(true)
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header> Adicionar Registro </template>
      <UFormGroup
        class="mb-4"
        label="Tipo de Registro"
        name="type"
        :required="true"
      >
        <USelect
          :options="types"
          placeholder="Selecione o tipo de registro"
        />
      </UFormGroup>
      <UFormGroup
        class="mb-4"
        label="Valor"
        name="amount"
        :required="true"
      >
        <UInput
          placeholder="Valor"
          type="number"
          variant="outline"
      /></UFormGroup>
      <UFormGroup
        class="mb-4"
        label="Data"
        name="created_at"
        :required="true"
      >
        <UInput
          icon="i-heroicons-calendar-days-20-solid"
          type="date"
          variant="outline"
      /></UFormGroup>
      <UFormGroup
        class="mb-4"
        hint="Opcional"
        label="Descrição"
        name="description"
      >
        <UInput
          placeholder="Descrição"
          variant="outline"
      /></UFormGroup>
      <UFormGroup
        class="mb-4"
        label="Categoria"
        name="category"
        :required="true"
      >
        <USelect :options="categories" />
      </UFormGroup>
      <UButton
        color="black"
        type="submit"
        >Adicionar</UButton
      >
      <template #footer />
    </UCard>
  </UModal>
</template>
