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
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';

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


import Uploader from '@/components/corky/upload/uploader'

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

import FormFooter from '@/components/form-footer';


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





 
export type DetailsTypes = {
  id: string;
};
export default function InfoView({
  id,
}: React.PropsWithChildren<DetailsTypes>) {

  console.log('InfoView id', id);
  

  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text >Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };



  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    data: [],
  });

  const [open, setOpen] = useState(false);



  /* member data from data */
  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(false);



  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [shopId, setShopId] = useState('');
  const [category, setCategory] = useState('');
  const [sku, setSku] = useState('');
  const [avatar, setAvatar] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([]);
  const [addProducts, setAddProducts] = useState([]);
  const [listPrice, setListPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState('');
  const [stock, setStock] = useState(0);
  const [sales, setSales] = useState(0);
  const [inqury, setInquery] = useState(0);





  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      const res = await fetch(`/api/corky/product/getOne?_id=${id}`);
  
      const data  = await res.json() as any;
  
      ///console.log('data.data', data.data);
  
  
      if (!data) {
        return {
          notFound: true,
        };
      }
    
  
      setData(data.data);
  
  
  
      setLoading(false);
  
    };

    fetchData();
  } , [ id ]);




  return (
    
    <Form<PersonalInfoFormTypes>
      validationSchema={personalInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      
      className='@container'

      useFormProps={{
        mode: 'onChange',
        defaultValues,
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
                    title="상품번호"
                  >
                    <Text>{id}</Text>
                  </FormGroup>

                  <FormGroup
                    title="등록일"
                  >
                    <Text>
                      <DateCell date={data?.createdAt} className='w-fit' />
                    </Text>
                  </FormGroup>

                  <FormGroup
                    title="상품코드"
                  >
                    <Input
                      disabled
                      size='lg'
                      //label="Company Name"
                      placeholder="상품코드"
                      //className="flex-grow "
                      defaultValue={data?.sku}
                      onChange={(e) => {
                        setSku(e.target.value);
                      } }
                      className='w-full'
                    />
                  </FormGroup>

                  <FormGroup
                    title="상품명"
                  >
                    <Input
                      disabled
                      size='lg'
                      //label="Company Name"
                      placeholder="상품명"
                      //className="flex-grow "
                      defaultValue={data?.name}
                      onChange={(e) => {
                        setName(e.target.value);
                      } }
                      className='w-full'
                    />
                  </FormGroup>

                  <FormGroup
                    title="카테고리"
                  >
                      <Input
                        disabled
                        size='lg'
                        //label="Company Name"
                        placeholder="카테고리"
                        //className="flex-grow "
                        defaultValue={data?.category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        } }
                        className='w-full'
                      />
                  </FormGroup>

                  {/* 대표 이지미 */}
                  <FormGroup
                    title="대표 이미지"
                  >
                    <div className="relative w-48 h-48">
                      <Image
                        src={data?.avatar || '/logo.png'}
                        alt="product image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>

                  </FormGroup>

                  <FormGroup
                    title="상품 이미지"
                  >
                    {/* image view row list */}
                    <div className="flex flex-row items-center justify-start gap-5">
                      {data?.images?.map((image: any, index: number) => (
                        <div className="  " key={index}>
                          <Image
                            src={image || '/logo.png'}
                            alt="product image"
                            width={200}
                            height={200}
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                
                  </FormGroup>



                  {/* 정상가 */}
                  <FormGroup
                    title="정상가"
                  >
                    <Text>{
                      Number(listPrice).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' 원'
                    }</Text>
                  </FormGroup>
                    
                    {/* 판매가 */}
                  <FormGroup
                    title="판매가"
                  >
                    <Text>{
                    Number(price).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' 원'
                    }</Text>
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

                  {/* 상품 설명 */}
                  <FormGroup
                    title="상품 설명"

                    // grid layout
                    //className='col-span-1'
                    
                  >
                    {/*}
                    <Text>{data?.description}</Text>
                    */}

                    <div className=" xl:w-[800px] ">
                      <div dangerouslySetInnerHTML={{ __html: data?.description }} />
                    </div>
                  </FormGroup>



                </div>


              </div>


          
            </>

          )}

            



            {/*
            <FormFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"

              handleAltBtn={() => {
                console.log('handleAltBtn');

                //push(routes.operation.healthinfo);



                //Router.push({routes.feed});

                //Router.push('/feed');

                window.history.back();

              } }
              
            />
            */}
            



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
