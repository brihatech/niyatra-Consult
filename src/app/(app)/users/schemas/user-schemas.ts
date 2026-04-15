import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  image: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const getAllUsersSchema = z
  .object({
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.string().nullish(),
  })
  .optional();

export type GetAllUsersInput = z.infer<typeof getAllUsersSchema>;

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const toggleUserStatusSchema = z.object({
  userId: z.string(),
  isActive: z.boolean(),
});

export type ToggleUserStatusInput = z.infer<typeof toggleUserStatusSchema>;
