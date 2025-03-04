import { z } from 'zod';

import { messages } from '@/config/messages';

import { fileSchema, validateEmail } from '@/utils/validators/common-rules';
import { title } from 'process';

// form zod validation schema
export const bannerFormSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().optional(),
  email: validateEmail,
  avatar: fileSchema.optional(),
  role: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  bio: z.string().optional(),
  portfolios: z.array(fileSchema).optional(),


  userId: z.string().optional(),
  userName: z.string().optional(),
  userNickname: z.string().optional(),
  userAvatar: fileSchema.optional(),
  userEmail: validateEmail.optional(),

  title: z.string().min(1, { message: "" }),
  contentType: z.string().min(1, { message: "" }),
  productId: z.string().min(1, { message: "" }),
  status: z.string().min(1, { message: "" }),



});

// generate form types from zod validation schema
export type BannerFormTypes = z.infer<typeof bannerFormSchema>;

export const defaultValues = {
  first_name: '',
  last_name: undefined,
  email: '',
  avatar: undefined,
  role: undefined,
  country: undefined,
  timezone: undefined,
  bio: undefined,
  portfolios: undefined,

  userId: undefined,
  userName: undefined,
  userNickname: undefined,
  userAvatar: undefined,
  userEmail: undefined,



  title: undefined,
  contentType: undefined,
  productId: undefined,
  status: undefined,
  
};
