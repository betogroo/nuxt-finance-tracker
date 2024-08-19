<script setup lang="ts">
  import { transactionViewOptions } from '~/constants'
  import type { Transaction } from '~/models/finance-tracker'

  definePageMeta({
    showInNavBar: true,
    order: 0,
    requiresAuth: true,
    title: 'Home',
    icon: 'i-mdi-home',
  })

  const selectedView = ref(transactionViewOptions[2])

  const supabase = useSupabaseClient()

  /* let { data: transactions, error } = await supabase
     .from('transactions')
     .select('*') */
  const transactions = ref<Transaction[]>([])
  const { data } = await useAsyncData('transactions', async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .returns<Transaction[]>()

    if (error || !data)
      throw new Error(
        `Erro ao buscar a transação: ${error.message} (${error.code})`,
      )
    return data || []
  })
  transactions.value = data.value ?? []

  const transactionsGroupByDate = computed(() => {
    const grouped: Record<string, Transaction[]> = {}

    for (const transaction of transactions.value as Transaction[]) {
      const date =
        new Date(transaction.created_at!).toISOString().split('T')[0] || ''
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(transaction)
    }
    return grouped
  })
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
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
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
  <section>{{ JSON.stringify(transactionsGroupByDate) }}</section>
</template>
