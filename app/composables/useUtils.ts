import { format } from '@formkit/tempo'

const useUtils = () => {
  const toast = useToast()

  const showToast = (
    type: 'success' | 'error',
    title: string,
    timeout = 2000,
  ): void => {
    const color = type === 'success' ? 'green' : 'red'
    const icon =
      type === 'success'
        ? 'i-heroicons-check-circle'
        : 'i-heroicons-exclamation-circle'
    toast.add({
      color,
      title,
      icon,
      timeout,
    })
  }

  const handleError = (err: unknown, message?: string): void => {
    const e = err as Error
    showToast('error', message || e.message)
    console.log(e)
  }

  const delay = (
    amount = 800,
    msg: boolean | string = false,
  ): Promise<void> => {
    if (msg) {
      console.log(msg)
    }
    return new Promise((resolve) => setTimeout(resolve, amount))
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const dateBr = (date: string, dateFormat: string = 'medium') =>
    format(date, dateFormat)

  return { delay, showToast, handleError, formatCurrency, dateBr }
}

export default useUtils
