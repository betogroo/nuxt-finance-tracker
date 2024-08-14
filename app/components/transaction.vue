<script setup lang="ts">
  interface Props {
    amount: number
  }
  const props = defineProps<Props>()
  const { amount } = props

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

  const { currency } = useCurrency(amount)
</script>

<template>
  <div
    class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex-center justify-between">
      <div class="flex-center space-x-1">
        <UIcon
          name="i-heroicons-arrow-up-right"
          class="text-green-600"
        />
        <div>Salary</div>
      </div>
      <div><UBadge color="white">Category</UBadge></div>
    </div>

    <div class="flex-center justify-end space-x-2">
      <div>{{ currency }}</div>
      <div>
        <UDropdown
          :items="items"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            color="white"
            variant="ghost"
            trailing-icon="i-heroicons-ellipsis-horizontal"
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
