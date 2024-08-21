<script setup lang="ts">
  import type { Transaction } from '~/models/finance-tracker'

  interface Props {
    date: string
    transactions: Transaction[]
  }
  const props = defineProps<Props>()
  const { formatCurrency, dateBr } = useUtils()

  const calculateBalance = computed(() =>
    props.transactions.reduce(
      (total, { type, amount }) =>
        total + (type === 'Income' ? amount : -amount),
      0,
    ),
  )
</script>

<template>
  <div
    class="grid grid-cols-2 py-4 text-xl text-black dark:text-gray-400 font-extrabold"
  >
    <div class="flex-center justify-between">
      {{ dateBr(date) }}
    </div>

    <div class="flex-center justify-end mr-10">
      {{ formatCurrency(calculateBalance) }}
    </div>
  </div>
</template>

<style scoped>
  .flex-center {
    @apply flex items-center;
  }
</style>
