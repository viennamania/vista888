import { z } from 'zod';

import { messages } from '@/config/messages';

import { fileSchema, validateEmail } from '@/utils/validators/common-rules';
import { title } from 'process';

// form zod validation schema
export const productSchema = z.object({



  name: z.string().min(1, { message: messages.firstNameRequired }),
  creator: z.string().min(1, { message: messages.firstNameRequired }),
  holder: z.string().min(1, { message: messages.firstNameRequired }),
  companyName: z.string().min(1, { message: messages.firstNameRequired }),
  shopId: z.string().optional(),
  category: z.string().optional(),
  sku: z.string().optional(),
  avatar: fileSchema.optional(),
  images: z.array(fileSchema).optional(),
  description: z.string().optional(),
  options: z.array(fileSchema).optional(),
  addProducts: z.array(fileSchema).optional(),
  listPrice: z.number().optional(),
  price: z.number().optional(),
  status: z.string().optional(),
  stock: z.number().optional(),
  sales: z.number().optional(),
  inqury: z.number().optional(),



});

// generate form types from zod validation schema
export type ProductTypes = z.infer<typeof productSchema>;

export const defaultValues = {

  name: '',
  companyName: '',
  shopId: undefined,
  category: undefined,
  sku: undefined,
  avatar: undefined,
  images: undefined,
  description: undefined,
  options: undefined,
  addProducts: undefined,
  listPrice: undefined,
  price: undefined,
  status: undefined,
  stock: undefined,
  sales: undefined,
  inqury: undefined,
  
};
