<script setup lang="ts">
  import type { Transaction } from '~/models/finance-tracker'

  interface Props {
    date: string
    transactions: Transaction[]
  }
  const props = defineProps<Props>()

  const sum = computed(() => {
    let sum = 0

    for (const transaction of props.transactions) {
      if (transaction.type === 'Income') sum += transaction.amount
      else sum -= transaction.amount
    }
    return sum
  })
  const { formatCurrency } = useUtils()
</script>

<template>
  <div
    class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-xl text-black dark:text-gray-400 font-extrabold"
  >
    <div class="flex-center justify-between">
      {{ date }}
    </div>

    <div class="flex-center justify-end mr-10">{{ formatCurrency(sum) }}</div>
  </div>
</template>

<style scoped>
  .flex-center {
    @apply flex items-center;
  }
</style>
