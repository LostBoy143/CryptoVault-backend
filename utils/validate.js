import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const assetCreateSchema = z.object({
  name: z.string().min(2).max(50),
  symbol: z.string().min(2).max(10),
  quantity: z.number().nonnegative(),
  buyPrice: z.number().nonnegative(),
});

export const assetUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  symbol: z.string().min(2).max(10).optional(),
  quantity: z.number().nonnegative().optional(),
  buyPrice: z.number().nonnegative().optional(),
  currentPrice: z
    .number()
    .nonnegative()
    .optional(),
});
