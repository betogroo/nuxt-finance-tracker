import { ref } from 'vue'
import type { Transaction } from '~/models/finance-tracker'

const useTransactions = () => {
  const isPending = ref<boolean>(false)
  const error = ref(null)
  const supabase = useSupabaseClient()
  const { showToast, delay, handleError } = useUtils()

  const transactions = ref<Transaction[]>([])
  const pendingTransactionId = ref(-1)

  const fetchTransactions = async () => {
    isPending.value = true
    try {
      await delay(1000)
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .returns<Transaction[]>()
      if (error) throw error
      // transactions.value = reactive([...(data ?? [])])
      transactions.value = data ?? []
    } catch (err) {
      const e = err as Error
      console.log(e)
    } finally {
      isPending.value = false
    }
  }

  const deleteTransaction = async (id: number) => {
    pendingTransactionId.value = id
    isPending.value = true
    try {
      await delay(1000, 'testing deleteTransaction')
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
      if (error) throw error
      //await fetchTransactions()
      // update transactions without fetch database
      transactions.value = transactions.value.filter(
        (transaction) => transaction.id !== id,
      )
      showToast('success', `Registro Excluído (${id})`)
    } catch (err) {
      handleError(err, 'Erro ao tentar excluir a transação')
    } finally {
      isPending.value = false
      pendingTransactionId.value = -1
    }
  }

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
    /* 
    sort on frontend
    const sortedKeys = Object.keys(grouped).sort().reverse()
    const sortedGroup: Record<string, Transaction[]> = {}

    for (const key of sortedKeys) {
      sortedGroup[key] = grouped[key]
    }
    return sortedGroup */
  })

  const incomeTransactions = computed(() =>
    transactions.value.filter((transaction) => transaction.type === 'Income'),
  )
  const expenseTransactions = computed(() =>
    transactions.value.filter((transaction) => transaction.type === 'Expense'),
  )

  const incomeTotal = computed(() =>
    transactions.value
      .filter((transaction) => transaction.type === 'Income')
      .reduce((sum, transaction) => sum + transaction.amount, 0),
  )
  const expenseTotal = computed(() =>
    expenseTransactions.value.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    ),
  )

  const incomeCount = computed(() => incomeTransactions.value.length)
  const expenseCount = computed(() => expenseTransactions.value.length)

  return {
    isPending,
    error,
    transactions,
    transactionsGroupByDate,
    pendingTransactionId,
    incomeTotal,
    expenseTotal,
    incomeCount,
    expenseCount,
    fetchTransactions,
    deleteTransaction,
  }
}

export default useTransactions
