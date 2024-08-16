import { z } from 'zod'

export const transaction = z.object({
  id: z.number().optional(),
  created_at: z.string().nullish(),
  type: z.string(),
  amount: z.number(),
  description: z.string().optional(),
  category: z.string().optional(),
})

export type Transaction = z.infer<typeof transaction>
