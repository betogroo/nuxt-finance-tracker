const useCurrency = (amount: number) => {
  const currency = computed(() => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount)
  })
  return {
    currency,
  }
}

export default useCurrency
