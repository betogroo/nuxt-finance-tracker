<script setup lang="ts">
  import { categories, types } from '~/constants'
  import type { Transaction } from '~/models/finance-tracker'
  import { schema as transactionSchema } from '~/models/finance-tracker'

  const isOpen = ref(true)

  const state = ref<Partial<Transaction>>({
    type: undefined,
    amount: 0,
    description: undefined,
  })

  const form = ref()

  const onSubmit = async () => {
    form.value.validate()
  }
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header> Adicionar Registro </template>
      <UForm
        ref="form"
        :schema="transactionSchema"
        :state="state"
        @submit.prevent="onSubmit"
      >
        <UFormGroup
          class="mb-4"
          label="Tipo de Registro"
          name="type"
          :required="true"
        >
          <USelect
            v-model="state.type"
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
            v-model.number="state.amount"
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
            v-model="state.created_at"
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
            v-model="state.description"
            placeholder="Descrição"
            variant="outline"
        /></UFormGroup>
        <UFormGroup
          v-if="state.type === 'Expense'"
          class="mb-4"
          label="Categoria"
          name="category"
        >
          <USelect
            v-model="state.category"
            :options="categories"
          />
        </UFormGroup>
        <UButton
          color="black"
          type="submit"
          >Adicionar</UButton
        >
      </UForm>
      <template #footer />
    </UCard>
  </UModal>
</template>
