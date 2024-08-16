<script setup lang="ts">
  import type { Transaction } from '~/models/finace-tracker'

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
  const { currency } = useCurrency(sum.value)
</script>

<template>
  <div
    class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 font-bold"
  >
    <div class="flex-center justify-between">
      {{ date }}
    </div>

    <div class="flex-center justify-end mr-10">{{ currency }}</div>
  </div>
</template>

<style scoped>
  .flex-center {
    @apply flex items-center;
  }
</style>
