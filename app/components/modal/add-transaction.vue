<script setup lang="ts">
  import { categories, types } from '~/constants'
  import type { Transaction } from '~/models/finance-tracker'
  import { schema as transactionSchema } from '~/models/finance-tracker'

  const $emit = defineEmits<{
    success: []
  }>()

  const { addTransaction } = useTransactions()
  const modal = useModal()

  const initialState: Partial<Transaction> = {
    type: undefined,
    amount: 0,
    description: undefined,
    category: undefined,
    created_at: '',
  }

  const state = ref({
    ...initialState,
  })

  const resetCategory = () => {
    if (state.value.type !== 'Expense') state.value.category = undefined
  }

  const resetForm = () => {
    Object.assign(state.value, initialState)
  }

  const form = ref()

  const onSubmit = async () => {
    if (form.value.errors.length) return
    await addTransaction(state.value)
    modal.close()
    $emit('success')
  }
</script>

<template>
  <UModal>
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
          @change="resetCategory"
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
        <UButton
          color="red"
          @click="resetForm"
          >Limpar</UButton
        >
      </UForm>
      <template #footer />
    </UCard>
  </UModal>
</template>
