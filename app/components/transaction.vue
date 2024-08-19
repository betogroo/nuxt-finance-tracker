<script setup lang="ts">
  import type { Transaction } from '~/models/finance-tracker'

  interface Props {
    transaction: Transaction
  }
  const props = defineProps<Props>()
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
        click: () => console.log('Delete'),
      },
    ],
  ])

  const { currency } = useCurrency(amount.value)
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
    class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex-center justify-between">
      <div class="flex-center space-x-1">
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
      <div :class="transactionTypeStyle.color">{{ currency }}</div>
      <div>
        <UDropdown
          :items="items"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            color="white"
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
