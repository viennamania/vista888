import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';
import { passwordFormSchema } from '../password-settings.schema';

// form zod validation schema
export const shopInfoFormSchema = z.object({

  businessName: z.string().optional(),
  representativeName: z.string().optional(),
  businessType: z.string().optional(),
  businessCategory: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  businessRegistrationImage: fileSchema.optional(),
  mailOrderRegistrationNumber: z.string().optional(),
  mailOrderRegistrationImage: fileSchema.optional(),
  businessRegistrationAddress: z.string().optional(),
  businessPhone: z.string().optional(),
  businessFax: z.string().optional(),

  loginid: z.string().optional(),
  ////password: passwordFormSchema.optional(),
  password: z.string().optional(),

  shopName: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: validateEmail,
  introduction: z.string().optional(),

});

// generate form types from zod validation schema
export type ShopInfoFormTypes = z.infer<typeof shopInfoFormSchema>;

export const defaultValues = {

  businessName: undefined,
  representativeName: undefined,
  businessType: undefined,
  businessCategory: undefined,
  businessRegistrationNumber: undefined,
  businessRegistrationImage: undefined,
  mailOrderRegistrationNumber: undefined,
  mailOrderRegistrationImage: undefined,
  businessRegistrationAddress: undefined,
  businessPhone: undefined,
  businessFax: undefined,

  loginid: undefined,
  password: undefined,

  shopName: undefined,
  contactName: undefined,
  contactPhone: undefined,
  contactEmail: undefined,
  introduction: undefined,

};
