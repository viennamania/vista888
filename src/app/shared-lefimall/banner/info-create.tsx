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



import  { useState, useEffect } from 'react';

import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';


import {
  defaultValues,
  bannerFormSchema,
  BannerFormTypes,
} from '@/utils/validators/lefimall/create-banner.schema';


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




export default function InfoCreate() {

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
    shopId: "",
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


      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }

      setLoadingUserData(false);
    };

    fetchData();
  } , [session?.user?.email]);







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

  const onSubmit: SubmitHandler<BannerFormTypes> = async (data) => {

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



  // 상품코드 입력시 상품정보 가져오기

  
  const [productData, setProductData] = useState<any>({});
  const [loadingProductData, setLoadingProductData] = useState(false);
  const onChangeProductId =  async (value: string) => {
      
    if (!value) {
      return;
    }

    setLoadingProductData(true);

    setProductData({});

    const res = await fetch(`/api/corky/product/getOne?_id=${value}`);
    const json = await res?.json();

    const data = json as any;

    console.log('data.data ->', data.data);

    if (data.data) {
      setProductData(data.data);
    } else {
      //alert(json.message);
    }

    setLoadingProductData(false);
  };




  
  const initialValues = {
    ...defaultValues,
    

  
    userId: userData?.id || undefined,
    userName: userData?.name || undefined,
    userNickname: userData?.nickname || undefined,
    userEmail: userData?.email || undefined,
    userAvatar: userData?.avatar || undefined,

    contentType: "1", // "1" | "2" | "3
    status: "1", // "1" | "2"

  };


  return (
    
    <Form<BannerFormTypes>
      validationSchema={bannerFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className='@container'
      useFormProps={{
        mode: 'onChange',
        ///defaultValues: initialValues,
        defaultValues:
          {
            ...defaultValues,
            contentType: "1", // "1" | "2" | "3
            status: "1", // "1" | "2"
          },
      }}
    >

      {({ register, control, setValue, getValues, formState: { errors } }) => {


        return (
          <>
            
            <div className="mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              {/*
              <FormGroup
                title="Name"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder="First Name"
                  {...register('first_name')}
                  error={errors.first_name?.message}
                  className="flex-grow"
                />
                <Input
                  placeholder="Last Name"
                  {...register('last_name')}
                  error={errors.last_name?.message}
                  className="flex-grow"
                />
              </FormGroup>
              */}

              {/* 등록자  */}
              {/*
              <FormGroup
                title="등록자"
                
              >

                {loadingUserData ? (
                  <div className="h-10 ">
                    <Spinner />
                  </div>
                ) : (
                      
                  <TableAvatar
                    src={userData?.avatar}
                    name={userData?.name}
                    className="flex-grow"
                  />
                )}
                
              
                <Text className='text-gray-400 text-sm'>* 등록자는 수정할 수 없습니다.</Text>

              </FormGroup>
              */}

             


              {/* checkbox */}
              {/*
              <FormGroup
                title="상단고정"
                
              >
                <div className='flex flex-row items-center justify-start gap-5'>
                  <Checkbox
                    variant="flat"
                    aria-label={'isTop'}
                    className="cursor-pointer"
                    color='primary'
                  />
                  <Text>고정</Text>
                </div>
              </FormGroup>
              */}

              <FormGroup
                title="제목"
                
              >

                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, value } }) => (

                    <Input
                      size='lg'
                      value={value}
                      onChange={onChange}
                      //label="Company Name"
                      placeholder="제목을 입력하세요"
                      //{...register('title')}
                      error={errors.title?.message}
                    />
                    
                  )}
                />

                <Text className='text-gray-400 text-sm'>* 제목은 20자 이내로 입력하세요.</Text>

                    {/*
                <Input
                  size='lg'
                  //label="Company Name"
                  placeholder="제목을 입력하세요"
                  {...register('last_name')}
                  error={''}
                />
                */}
              </FormGroup>

              {/* 연결형태  선택  selection */}
              <FormGroup
                title="연결형태"
              >

                <Controller
                  control={control}
                  name="contentType"
                  render={({ field: { onChange, value } }) => (

                    <RadioGroup
                      value={value}
                      setValue={onChange}

                      className="flex flex-row items-center justify-start gap-5"
                    >
                      <Radio
                        value="1"
                        label="상품"
                        className="cursor-pointer"
                      />
                      <Radio
                        value="2"
                        label="레피소식"
                        className="cursor-pointer"
                      />
                      <Radio
                        value="3"
                        label="링크"
                        className="cursor-pointer"
                      />
                    </RadioGroup>

                  )}
                />

                <Text className='text-gray-400 text-sm'>* 연결형태를 선택하세요.</Text>


                    {/*
                <RadioGroup
                  value={contentType}
                  setValue={setcontentType}

                  className="flex flex-row items-center justify-start gap-5"
                >
                  <Radio
                    value="1"
                    label="상품"
                    className="cursor-pointer"
                  />
                  <Radio
                    value="2"
                    label="레피소식"
                    className="cursor-pointer"
                  />
                </RadioGroup>
                */}

              </FormGroup>



              <FormGroup
                title="상품선택"
                
              >

                <Controller
                  control={control}
                  name="productId"
                  render={({ field: { onChange, value } }) => (

                    <Input
                      size='lg'
                      value={value}
                      onChange={
                        //onChange
                        ///onChangeProductId(value) 
                        (e) => {
                          onChange(e.target.value);
                          onChangeProductId(e.target.value);
                        }
                      }
                      //label="Company Name"
                      placeholder="상품코드를 입력하세요"
                      //{...register('product')}
                      //error={errors.product?.message}
                    />
                    
                  )}
                />


                {loadingProductData ? (
                  <div className="h-10 ">
                    <Spinner />
                  </div>
                ) : (
                  productData && productData?.avatar ? (
   
                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                      <Text> {productData?.name}</Text>
                      <Text> {
                        Number(productData?.price || 0).toLocaleString('ko-KR', {
                          style: 'currency',
                          currency: 'KRW',
                        })
                      }</Text>
                      <Image
                        src={productData?.avatar}
                        alt="Logo"
                        width={300}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  ) : (

                    <Text className='text-gray-400 text-sm'>* 잘못된 상품코드입니다.</Text>
                    
                  )
                )}

                {/* <Text className='text-gray-400 text-sm'>* 상품코드를 입력하세요.</Text> */}
                
                      
                    
                

                {/*
                <Input
                  //color='info'
                  size='lg'
                  value={product}
                  onChange={(e) => setProduct(() => e.target.value)}
                  //label="Company Name"
                  placeholder="상품코드를 입력하세요"
                  //{...register('last_name')}
                  error={''}
                />
                */}
              </FormGroup>

              {/* 노출여부  노출 / 비노출 선택  selection */}

              <FormGroup
                title="노출여부"
              >

                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value } }) => (

                    <RadioGroup
                      value={value}
                      setValue={onChange}

                      className="flex flex-row items-center justify-start gap-5"
                    >
                      <Radio
                        value="1"
                        label="노출"
                        className="cursor-pointer"
                      />
                      <Radio
                        value="2"
                        label="비노출"
                        className="cursor-pointer"
                      />
                    </RadioGroup>

                  )}


                />

                <Text className='text-gray-400 text-sm'>* 노출여부를 선택하세요.</Text>

                {/*
                <RadioGroup
                  value={status}
                  setValue={setStatus}

                  className="flex flex-row items-center justify-start gap-5"
                >
                  <Radio
                    value="1"
                    label="노출"
                    className="cursor-pointer"
                  />
                  <Radio
                    value="2"
                    label="비노출"
                    className="cursor-pointer"
                  />
                </RadioGroup>
                */}

              </FormGroup>




              {/*
              <FormGroup
                title="내용"
                
              >
                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (

                    <QuillEditor
                      value={value}
                      onChange={onChange}
                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[200px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />

                    
                  )}
                />
                
              </FormGroup>
              */}
              

            </div>



            
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
              /*
              handleMainBtn={() => {

                console.log('handleMainBtn');

              } }
              */
          
            
            />
            

          </>
        );
      }}
    </Form>
  );
}
