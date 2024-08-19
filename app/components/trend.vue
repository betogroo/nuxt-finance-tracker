<script setup lang="ts">
  interface Props {
    title?: string
    amount: number
    lastAmount: number
    color?: string
    loading?: boolean
  }
  const props = defineProps<Props>()
  const { amount, lastAmount } = props

  const trendingUp = computed(() => amount >= lastAmount)
  const icon = computed(() =>
    trendingUp.value
      ? 'i-heroicons-arrow-trending-up'
      : 'i-heroicons-arrow-trending-down',
  )

  const { currency } = useCurrency(amount)
  const percentTrend = computed(() => {
    if (amount === 0 || lastAmount === 0) return '∞%'
    /* const bigger = Math.max(amount, lastAmount)
    const lower = Math.min(amount, lastAmount)
    const ratio = ((bigger - lower) / lower) * 100 */

    const difference = Math.abs(amount - lastAmount)
    const base = Math.min(amount, lastAmount)
    const percentageChange = (difference / base) * 100
    return `${percentageChange.toFixed(3)}%`
  })
</script>

<template>
  <div>
    <div
      class="font-bold"
      :class="[color]"
    >
      {{ title }}
    </div>
    <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
      <USkeleton
        v-if="loading"
        class="h-8 w-full"
      />
      <div v-else>{{ currency }}</div>
    </div>
    <div>
      <USkeleton
        v-if="loading"
        class="h-6 w-full"
      />
      <div
        v-else
        class="flex space-x-1 items-center text-sm"
      >
        <UIcon
          class="w-6 h-6"
          :class="{ green: trendingUp, red: !trendingUp }"
          :name="icon"
        />
        <div class="text-gray-500 dark:text-gray-400">
          {{ percentTrend }} vs last period
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .green {
    @apply text-green-600 dark:text-green-400;
  }
  .red {
    @apply text-red-600 dark:text-red-400;
  }
</style>
