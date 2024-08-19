<script setup lang="ts">
  import { transactionViewOptions } from '~/constants'
  import useTransactions from '~/composables/useTransactions'

  definePageMeta({
    showInNavBar: true,
    order: 0,
    requiresAuth: true,
    title: 'Home',
    icon: 'i-mdi-home',
  })

  const {
    isPending,
    transactions,
    transactionsGroupByDate,
    transactionsRowIndex,
    fetchTransactions,
    deleteTransaction,
  } = useTransactions()
  const selectedView = ref(transactionViewOptions[2])

  await fetchTransactions()
</script>

<template>
  <section class="flex justify-between items-center mb-0">
    <h1 class="text-4xl font-extrabold">Summary</h1>
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
      :amount="4000"
      color="green"
      :last-amount="3000"
      :loading="false"
      title="Income"
    />
    <Trend
      :amount="3000"
      color="red"
      :last-amount="1523"
      :loading="false"
      title="Expense"
    />
    <Trend
      :amount="2500"
      color="green"
      :last-amount="2750"
      :loading="false"
      title="Investments"
    />
    <Trend
      :amount="0"
      color="red"
      :last-amount="0"
      :loading="false"
      title="Saving"
    />
  </section>
  <section>
    <Transaction
      v-for="(transaction, i) in transactions"
      :key="transaction.id"
      :is-pending="isPending && i === transactionsRowIndex"
      :transaction="transaction"
      @handle-delete="deleteTransaction(transaction.id!)"
    />
    <UDivider
      class="my-6"
      label="Por Datas"
    />
    <template
      v-for="(transactionsOnDay, date) in transactionsGroupByDate"
      :key="date"
    >
      <DailyTransactionSummary
        :date="date"
        :transactions="transactionsOnDay"
      />
      <Transaction
        v-for="transaction in transactionsOnDay"
        :key="transaction.id"
        :transaction="transaction"
      />
    </template>
  </section>
</template>
