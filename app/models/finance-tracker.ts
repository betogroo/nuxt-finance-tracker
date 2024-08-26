import { z } from 'zod'
import { categories } from '~/constants'

export const defaultSchema = z.object({
  id: z.number().optional(),
  created_at: z.string(),
  amount: z
    .number()
    .positive({ message: 'O valor deve ser ser maior que zero' }),
  description: z.string().optional(),
})

export const incomeSchema = z.object({
  type: z.literal('Income'),
})
export const investmentSchema = z.object({
  type: z.literal('Investment'),
})
export const savingSchema = z.object({
  type: z.literal('Saving'),
})
export const expenseSchema = z.object({
  type: z.literal('Expense'),
  category: z.enum(categories as [string, ...string[]]),
})

export const schema = z.intersection(
  z.discriminatedUnion('type', [
    incomeSchema,
    expenseSchema,
    investmentSchema,
    savingSchema,
  ]),
  defaultSchema,
)

export type Transaction = z.infer<typeof schema>
