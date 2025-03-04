'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';

import { Form } from '@/components/ui/form';

import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared-corky/form-group';



import {
  defaultValues,
  productSchema,
  ProductTypes,
} from '@/utils/validators/lefimall/edit-product.schema';



import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';



import Image from 'next/image';


import BasicTableWidget from '@/components/corky/basic-table-widget';

import { data } from '@/data/lefimall/board/comment-data';

import { getColumns } from '@/app/shared-corky/board/comment-columns';

//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useState, useEffect } from 'react';

import DateCell from '@/components/ui/date-cell';


import { ImageUploadSchema } from '@/app/shared/multi-step/upload-photo';


import SaveAll from '@/app/shared-corky/save-popover-large';


import { Textarea } from '@/components/ui/textarea';


///import Uploader from '@/components/corky/upload/uploader'

import Uploader from '@/components/corky/upload/uploaderVercel1';



import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

import FormFooter from '@/components/corky/form-footer';

import { useSession, signOut } from 'next-auth/react';




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





export default function CreateInfo() {




  const { data: session, status } = useSession();

  ///console.log("use-table-products session:", session);

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

      //console.log('data ->', data);
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }

      setLoadingUserData(false);
    };

    fetchData();
  } , [session?.user?.email]);





  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    data: [],
  });

  const [open, setOpen] = useState(false);



  /* member data from data */
  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(false);





 


  /*
      id,
    name,
    companyName,
    shopId,
    category,
    avatar,
    images,
    description,
    options,
    addProducts,
    sku,
    listPrice,
    price,
    status,
    rating,
    point,
    stock,
    sales,
    inquiry,
  */



  const [avatar, setAvatar] = useState<string | null>(null);

  const save = async (
    description = '',
    name = '',
    companyName = '',
    sku = '',
    category = '',
    listPrice = 0,
    price = 0,

  ) => {

 
    const params = {
      name: name,
      companyName: companyName,
      
      shopId: userData?.shopId,

      category: category,
      avatar: avatar,
      images: data?.images,
      description: description,
      options: data?.options,
      addProducts: data?.addProducts,
      sku: sku,
      listPrice: listPrice,
      price: price,
      status: data?.status,
      rating: data?.rating,
      point: data?.point,
      stock: data?.stock,
      sales: data?.sales,
      inquiry: data?.inquiry,

    };


    console.log('params', params);


    const res = await fetch(`/api/corky/product/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const json = await res.json() as any;

    ////console.log('json========', json);

    //if (json.success) {
      //toast.success(<Text >변경되었습니다.</Text>);
    //}

          setOpen(true);
      modalData.description = 'Saved.';


  }






  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const onSubmit: SubmitHandler<ProductTypes> =  (data) => {

    //toast.success(<Text >Successfully added!</Text>);

    /*
    saveAll(
      data.description,
    );
    */


    save(
      data.description,
      data.name,
      data.companyName,
      data.sku,
      data.category,
      data.listPrice,
      data.price,
      )







    console.log('Product data ->', {
      ...data,
    });

  };


  return (
    
    <Form<ProductTypes>
      validationSchema={productSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      
      className='@container'

      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          description: data?.description,
        },
        

      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {

        return (
          <>


            { loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <div className="w-16 h-16 border-t-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (

            <>



              <div className='mb-10 flex flex-col gap-5'>
                  

                <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">


                  <FormGroup
                    title="상품코드"
                  >

                    <Controller
                      control={control}
                      name="sku"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          size='lg'
                          //label="Company Name"
                          placeholder="상품코드"
                          //className="flex-grow "
                          defaultValue={data?.sku}
                          onChange={onChange}
                          className='w-full'
                        />
                      )}

                    />

                  </FormGroup>

                  <FormGroup
                    title="상품명"
                  >
                    <Controller
                      control={control}
                      name="name"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          size='lg'
                          //label="Company Name"
                          placeholder="상품명"
                          //className="flex-grow "
                          defaultValue={data?.name}
                          onChange={onChange}
                          className='w-full'
                        />
                      )}

                    />

                  </FormGroup>

                  <FormGroup
                    title="카테고리"
                  >
                      <Controller
                        control={control}
                        name="category"
                        render={({ field: { onChange, value } }) => (
                          <Input
                            size='lg'
                            //label="Company Name"
                            placeholder="카테고리"
                            //className="flex-grow "
                            defaultValue={data?.category}
                            onChange={onChange}
                            className='w-full'
                          />
                        )}

                      />
    
                  </FormGroup>

                  {/* 대표 이지미 */}
                  <FormGroup
                    title="대표 이미지"
                  >

                      <Controller
                        control={control}
                        name="avatar"
                        render={({ field: { onChange, value } }) => (
                          <div className="flex flex-row items-center justify-start gap-3">

                            <Uploader
                              onSave={(url: string) => {
                                
                                setAvatar(url);
                                onChange(url);

                              }}
                            />

                            <Image
                              src={avatar || '/logo.png'}
                              alt={value?.name || ''}
                              priority
                              width={200}
                              height={200}
                            />

                          </div>
                        )}
                      />

                  </FormGroup>


                  <FormGroup
                    title="상품 이미지"
                  >
                    {/* image view row list */}
                    <div className="flex flex-row items-center justify-start gap-5">
                      {data?.images?.map((image: any, index: number) => (
                        <div className="relative w-20 h-20" key={index}>
                          <Image
                            src={image}
                            alt="product image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                
                  </FormGroup>

                  {/* 상품 설명 */}
                  <FormGroup
                    title="상품 설명"
                  >
                      
                    <Controller
                      control={control}
                      name="description"
                      render={({ field: { onChange, value } }) => (
                        <QuillEditor
                 
                          //value={value}
                          //value = {data?.description}
                          defaultValue={data?.description}
                          onChange={onChange}
                          className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px] w-full h-64 mb-10"
                          
                          //labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"

                        />
                      )}
                      // check if bio has 30 characters
                      rules={{

                        //validate: (v) =>  (v as string).length <= 30 || '30자 이내로 입력해주세요.',

                        //maxLength: 30,
                      

                      }}
                      
                      //display counter of characters
                    />
                      
                  </FormGroup>

                  {/* 정상가 */}
                  <FormGroup
                    title="정상가"
                  >
                    <Controller
                      control={control}
                      name="listPrice"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          size='lg'
                          //label="Company Name"
                          placeholder="정상가"
                          //className="flex-grow "
                          defaultValue={data?.listPrice}
                          onChange={onChange}
                          className='w-full'
                        />
                      )}

                    />
                  </FormGroup>
                  
                    
                    {/* 판매가 */}
                  <FormGroup
                    title="판매가"
                  >
                    <Controller
                      control={control}
                      name="price"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          size='lg'
                          //label="Company Name"
                          placeholder="판매가"
                          //className="flex-grow "
                          defaultValue={data?.price}
                          onChange={onChange}
                          className='w-full'
                        />
                      )}

                    />
                  </FormGroup>

                  {/* 옵션 */}
                  <FormGroup
                    title="옵션"
                  >
                    <div className="flex flex-row items-center justify-start gap-5">
                      {data?.options?.map((option: any, index: number) => (
                        <div className="relative w-20 h-20" key={index}>
                          <Text>{option.name}</Text>
                        </div>
                      ))}
                    </div>
                  </FormGroup>
          
                  {/* 추가상품 목록 */}
                  <FormGroup
                    title="추가상품"
                  >
                    <div className="flex flex-row items-center justify-start gap-5">
                      {data?.addProducts?.map((product: any, index: number) => (
                        <div className="relative w-20 h-20" key={index}>
                          <Text>{product.name}</Text>
                        </div>
                      ))}
                    </div>
                  </FormGroup>





                </div>


              </div>


          
            </>

          )}

            




            <FormFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"

              handleSubmitBtn={() => {
                onSubmit(getValues());
              } }

              handleAltBtn={() => {
                console.log('handleAltBtn');

                //push(routes.feed.index);

                //Router.push({routes.feed});

                //Router.push('/feed');

                window.history.back();

              } }

              /*
              handleMainBtn={() => {
                console.log('handleMainBtn');
              }
              */
              
            />
            



      {/* modal view */}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          //setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
      >
        <div className="flex flex-col items-center justify-center gap-10 m-5">
            {/*
          <Title
            as="h3"
            className="text-lg font-semibold text-gray-900 xl:text-xl"
          >
            {modalData.title}
          </Title>
        
          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              setActive(() => 'posts');
            }}
            className="h-auto px-1 py-1"
          >
            <PiXBold className="h-5 w-5 text-base" />
          </Button>
          */}

            {modalData.description && (
              <div className="">
                <Text
                  as="p"
                  className="text-base font-semibold text-gray-900 xl:text-lg"
                >
                  {modalData.description}
                </Text>
              </div>
            )}

              {/*
            <Button
              variant="text"
              onClick={() => {
                setOpen(false);
                setActive(() => 'posts');
              }}
              className="h-auto px-1 py-1"
            >
              <PiXBold className="h-5 w-5 text-base" />
            </Button>
            */}
            {/* close button */}
            <Button
              size="lg"
              color="primary"
              className='flex items-center space-x-2'
              onClick={() => {
                setOpen(false);
                //setActive(() => 'posts');
              }}
            >
              Close
            </Button>

          
        </div>

              {/*
        {modalData && <FollowerModal data={modalData.data} />}
              */}
      </Modal>



          </>
          
        );
      }}

    </Form>

    
  );

}
