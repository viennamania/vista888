import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';


/*
{
  "data": {
    "id": "100013",
    "createdAt": "2023-11-29T01:33:41.563Z",
    "amount": "37",
    "status": "active",
    "delivery": {
      "id": "10005",
      "name": "오만석",
      "userName": "Miles",
      "address": "서울시 강남구 강남대로62길31 1층",
      "fee": 6478
    },
    "payment": {
      "id": "100003",
      "name": "결제100013",
      "userName": "Gregorio",
      "amount": 11538,
      "status": "Pending"
    },
    "product": {
      "id": "100008",
      "name": "Storm Toys 1/12 더 킹 오브 파이터즈 98 료 사카자키",
      "avatar": "https://lefimall.vercel.app/images/products/product7.png",
      "description": "Abduco ipsa adflicto cunae curriculum veritas carus combibo. Ambulo vorago timidus quos architecto cibo terror tendo. Delinquo cursim voluptatibus doloribus incidunt crastinus accedo cuius.",
      "companyName": "좋은세상",
      "price": 31987.8
    },
    "order": {
      "id": "100020",
      "name": "김지연"
      "nickname": "김지연",
      "email": "abcd@gmail.com",
      "avatar": "https://i.pravatar.cc/150?u=100020"
    }
  }
}
*/



// form zod validation schema
export const orderInfoFormSchema = z.object({
 
  id: z.string().optional(),
  createdAt: z.string().optional(),
  amount: z.string().optional(),
  status: z.string().optional(),
  delivery: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    userName: z.string().optional(),
    address: z.string().optional(),
    fee: z.string().optional(),
  }).optional(),
  payment: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    userName: z.string().optional(),
    amount: z.string().optional(),
    status: z.string().optional(),
  }).optional(),
  product: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    avatar: z.string().optional(),
    description: z.string().optional(),
    companyName: z.string().optional(),
    price: z.string().optional(),
  }).optional(),
  order: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    nickname: z.string().optional(),
    email: z.string().optional(),
    avatar: z.string().optional(),
  }).optional(),


});

// generate form types from zod validation schema
export type OrderInfoFormTypes = z.infer<typeof orderInfoFormSchema>;

export const defaultValues = {
  id: '',
  createdAt: '',
  amount: '',
  status: '',
  delivery: {
    id: '',
    name: '',
    userName: '',
    address: '',
    fee: '',
  },
  payment: {
    id: '',
    name: '',
    userName: '',
    amount: '',
    status: '',
  },
  product: {
    id: '',
    name: '',
    avatar: '',
    description: '',
    companyName: '',
    price: '',
  },
  order: {
    id: '',
    name: '',
    nickname: '',
    email: '',
    avatar: '',
  },


};
