'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';

import { PhoneNumber } from '@/components/ui/phone-input';

import { Input } from '@/components/ui/input';

import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared-corky/form-group';

import FormFooter from '@/components/corky/form-footer';



import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';


import Image from 'next/image';



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useState, useEffect, use } from 'react';

import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';


import {
  defaultValues,
  orderInfoFormSchema,
  OrderInfoFormTypes,
} from '@/utils/validators/lefimall/order-info.schema';


import { Checkbox } from '@/components/ui/checkbox';



import { useSession } from 'next-auth/react';
import { set } from 'lodash';

import TableAvatar from '@/components/ui/avatar-card';
import { u } from 'uploadthing/dist/types-e8f81bbc';



const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});




export default function Details(
  {
    id,
  }: {
    id: string,
  },
) {

  const { push } = useRouter();






  const { data: session } = useSession();


  ///console.log('session ->', session);


  /* fetch user data from an API
  /api/doingdoit/user/getUser
  */
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    name: "",
    nickname: "",
    avatar: "",
  });

  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }

      setLoadingUserData(true);

      const res = await fetch(`/api/corky/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      

      const data = json as any;

      console.log('data ->', data);
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }

      setLoadingUserData(false);
    };

    fetchData();
  } , [session?.user?.email]);




  /*
  {
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
  */

  const [orderData, setOrderData] = useState(
    {
      id: "",
      createdAt: "",
      amount: "",
      status: "",
      delivery: {
        id: "",
        name: "",
        userName: "",
        address: "",
        fee: "",
      },
      payment: {
        id: "",
        name: "",
        userName: "",
        amount: "",
        status: "",
      },
      product: {
        id: "",
        name: "",
        avatar: "",
        description: "",
        companyName: "",
        price: "",
      },
      order: {
        id: "",
        name: "",
        nickname: "",
        email: "",
        avatar: "",
      }
    }
  );

  const [loadingOrderData, setLoadingOrderData] = useState(true);


  useEffect(() => {
    const fetchData = async () => {

      if (!id) {
        return;
      }

      setLoadingUserData(true);

      const res = await fetch(`/api/corky/order/getOne?_id=${id}`);
      const json = await res?.json();

      

      const data = json as any;

      console.log('data ->', data);
      
      if (data.data) {
        setOrderData(data?.data);
      } else {
        //alert(json.message);
      }

      setLoadingOrderData(false);
    };

    fetchData();
  } , [id]);







  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');


  /*
  const onSubmit: SubmitHandler<BannerFormTypes> = (data) => {

    
    
    toast.success(<Text as="b">Saved!!</Text>);

    console.log(' data ->', {
      ...data,
    });

    push(routes.promotion.banner);
  };
  */

  const onSubmit: SubmitHandler<OrderInfoFormTypes> = async (data) => {

    console.log(' data ->', {
      ...data,
    });

    const params = {
      ...data,
      userId: userData?.id,
      userName: userData?.name,
      userNickname: userData?.nickname,
      userEmail: userData?.email,
      userAvatar: userData?.avatar,
    };

    const res = await fetch('/api/corky/banner/create', {
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const json = await res?.json() as any;

    console.log('json ->', json);

    if (json.success) {
      toast.success(<Text as="b">Saved!!</Text>);
      push(routes.promotion.banner);
    } else {
      alert(json.message);
    }

  };




  
  const initialValues = {
    ...defaultValues,
    orderData,
  };


  return (
    
    <Form<OrderInfoFormTypes>
      validationSchema={orderInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        ///defaultValues: initialValues,
        defaultValues:
          {
            //...defaultValues,
            //...orderData,
            //...initialValues,

            ...orderData ? orderData : defaultValues,
            
            
          },
      }}
    >

      {({ register, control, setValue, getValues, formState: { errors } }) => {


        return (
          <>

            {loadingOrderData ? (
              <div className="grid h-10 place-content-center">
                <Spinner />
              </div>
            ) : (
            
            <div className="mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              <FormGroup
                title="Order ID"
              >
                <Text>{orderData?.id}</Text>

              </FormGroup>


              <FormGroup
                title="Product Name"
              >
                <Text>{orderData?.product?.name}</Text>
              </FormGroup>

              <FormGroup
                title="Product Price"
              >
                <Text>{orderData?.product?.price}</Text>
              </FormGroup>

              <FormGroup
                title="Product Amount"
              >
                <Text>{orderData?.amount}</Text>
              </FormGroup>

              <FormGroup
                title="Order Created At"
              >
                <Text>{orderData?.createdAt}</Text>
              </FormGroup>

              <FormGroup
                title="Orderer Name"
              >
                <Text>{orderData?.order?.name}</Text>
              </FormGroup>

              <FormGroup
                title="Orderer Email"
              >
                <Text>{orderData?.order?.email}</Text>
              </FormGroup>

              <FormGroup
                title="Orderer Nickname"
              >
                <Text>{orderData?.order?.nickname}</Text>
              </FormGroup>

              <FormGroup
                title="Delivery Address"
              >
                <Text>{orderData?.delivery?.address}</Text>
              </FormGroup>

              <FormGroup
                title="Delivery Fee"
              >
                <Text>{orderData?.delivery?.fee}</Text>
              </FormGroup>

              <FormGroup
                title="Payment method"
              >
                <Text>{orderData?.payment?.name}</Text>
              </FormGroup>

              <FormGroup
                title="Payment Amount"
              >
                <Text>{orderData?.payment?.amount}</Text>
              </FormGroup>

              <FormGroup
                title="Payment Status"
              >
                <Text>{orderData?.payment?.status}</Text>
              </FormGroup>

              <FormGroup
                title="Order Status"
              >
                <Text>{orderData?.status}</Text>
              </FormGroup>



              

            </div>

            )}



            {/*
            <FormFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"


              handleSubmitBtn={() => {
                onSubmit(getValues());
              } }


              handleAltBtn={() => {
                console.log('handleAltBtn');

                //push(routes.operation.healthinfo);

                //Router.push({routes.feed});

                //Router.push('/feed');

                window.history.back();

              } }
             
          
            
            />
            */}
            

          </>
        );
      }}
    </Form>
  );
}
