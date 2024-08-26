<script setup lang="ts">
  import type { Transaction } from '~/models/finance-tracker'

  interface Props {
    transaction: Transaction
    isPending?: boolean
  }
  const props = defineProps<Props>()
  const $emit = defineEmits<{
    'handle-delete': [transaction_id: number]
  }>()
  const { type, amount, category, description } = toRefs(props.transaction)

  const items = ref([
    [
      {
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit'),
      },
      {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: (transaction_id: number) =>
          $emit('handle-delete', transaction_id),
      },
    ],
  ])

  const { formatCurrency } = useUtils()
  //const isIncome = computed(() => type.value === 'Income')
  const transactionTypeStyle = computed(() => {
    const isIncome = type.value === 'Income'
    return {
      icon: isIncome
        ? 'i-heroicons-arrow-up-right'
        : 'i-heroicons-arrow-down-left',
      color: isIncome ? 'text-green-600' : 'text-red-600',
    }
  })
</script>

<template>
  <div
    class="grid grid-cols-3 pb-1 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex items-center justify-between space-x-4 col-span-2">
      <div class="flex items-center space-x-1">
        <UIcon
          :class="transactionTypeStyle.color"
          :name="transactionTypeStyle.icon"
        />
        <div>{{ description }}</div>
      </div>
      <div>
        <UBadge
          v-if="category"
          color="white"
          >{{ category }}</UBadge
        >
      </div>
    </div>

    <div class="flex-center justify-end space-x-2">
      <div :class="transactionTypeStyle.color">
        {{ formatCurrency(amount) }}
      </div>
      <div>
        <UDropdown
          :items="items"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            color="white"
            :loading="isPending"
            trailing-icon="i-heroicons-ellipsis-horizontal"
            variant="ghost"
          />
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .flex-center {
    @apply flex items-center;
  }
</style>
