import { ref } from 'vue'
import type { Transaction } from '~/models/finance-tracker'

const delay = (amount = 800, msg: boolean | string = false): Promise<void> => {
  if (msg) {
    console.log(msg)
  }
  return new Promise((resolve) => setTimeout(resolve, amount))
}

const useTransactions = () => {
  const isPending = ref<boolean>(false)
  const error = ref(null)
  const supabase = useSupabaseClient()
  const toast = useToast()

  const transactions = ref<Transaction[]>([])

  const fetchTransactions = async () => {
    isPending.value = true

    try {
      isPending.value = true
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .returns<Transaction[]>()
      transactions.value = data ?? []
    } catch (err) {
      const e = err as Error
      console.log(e)
      console.log(e)
    } finally {
      isPending.value = false
    }
  }

  const deleteTransaction = async (id: number) => {
    isPending.value = true
    try {
      await delay(2000, 'testing deleteTransaction')
      await supabase.from('transactions').delete().eq('id', id)
      toast.add({
        title: 'Registro Deletado',
        icon: 'i-heroicons-check-circle',
        color: 'green',
        timeout: 1000,
      })
    } catch (err) {
      toast.add({
        title: 'Erro ao Excluir',
        icon: 'i-heroicons-exclamation-circle',
        color: 'red',
      })
      const e = err as Error
      isPending.value = false
      console.log(e)
    } finally {
      isPending.value = false
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
  })

  return {
    isPending,
    error,
    transactions,
    transactionsGroupByDate,
    fetchTransactions,
    deleteTransaction,
  }
}

export default useTransactions
