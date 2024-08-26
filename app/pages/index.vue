<script setup lang="ts">
  import { transactionViewOptions } from '~/constants'
  import useTransactions from '~/composables/useTransactions'
  import { ModalAddTransaction } from '#components'

  const modal = useModal()

  definePageMeta({
    showInNavBar: true,
    order: 0,
    requiresAuth: true,
    title: 'Home',
    icon: 'i-mdi-home',
  })

  const {
    pending: { isPending, pendingTransactionId },
    transactions: {
      incomeCount,
      incomeTotal,
      expenseCount,
      expenseTotal,
      refresh,
      grouped: { byDate },
    },
    deleteTransaction,
  } = useTransactions()
  const openModal = () => {
    modal.open(ModalAddTransaction, {
      async onSuccess() {
        await refresh()
      },
    })
  }
  const selectedView = ref(transactionViewOptions[2])

  onMounted(async () => {
    await refresh()
  })
</script>

<template>
  <section class="flex justify-between items-center mb-0">
    <h1 class="text-4xl font-extrabold mb-4">Summary</h1>
    <div>
      <USelectMenu
        v-model="selectedView"
        :options="transactionViewOptions"
      />
    </div>
  </section>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
  >
    <Trend
      :amount="incomeTotal"
      color="green"
      :last-amount="3000"
      :loading="isPending"
      title="Income"
    />
    <Trend
      :amount="expenseTotal"
      color="red"
      :last-amount="1523"
      :loading="isPending"
      title="Expense"
    />
    <Trend
      :amount="2500"
      color="green"
      :last-amount="2750"
      :loading="isPending"
      title="Investments"
    />
    <Trend
      :amount="0"
      color="red"
      :last-amount="0"
      :loading="isPending"
      title="Saving"
    />
  </section>
  <section class="flex justify-between items-center mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">Transactions</h2>
      <USkeleton
        v-if="isPending"
        class="h-5 w-96"
      />
      <div
        v-else
        class="text-gray-500 dark:text-gray-400"
      >
        Voce tem {{ incomeCount }} entradas e {{ expenseCount }} despesas neste
        período
      </div>
    </div>
    <div>
      <ModalAddTransaction @saved="console.log('saved')" />
      <UButton
        color="white"
        icon="i-heroicons-plus-circle"
        variant="solid"
        @click="openModal"
      />
    </div>
  </section>
  <section>
    <template
      v-for="(transactionsOnDay, date) in byDate"
      :key="date"
    >
      <DailyTransactionSummary
        :date="date"
        :transactions="transactionsOnDay"
      />
      <Transaction
        v-for="transaction in transactionsOnDay"
        :key="transaction.id"
        :is-pending="isPending && transaction.id === pendingTransactionId"
        :transaction="transaction"
        @handle-delete="deleteTransaction(transaction.id!)"
      />
    </template>
  </section>
</template>
