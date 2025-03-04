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

import FormFooter from '@/components/corky/form-footer';


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

import { data as calorieData } from '@/data/lefimall/qna/calorie-data';

import { getColumns } from '@/app/shared-corky/qna/calorie-columns';

//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useState } from 'react';


import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

import DateCell from '@/components/ui/date-cell';



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
  item: any;
};

export default function InfoForm({
  item,
}: React.PropsWithChildren<DetailsTypes>) {

    

  const { push } = useRouter();

 
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');


  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (calorieData) => {
    toast.success(<Text>Saved!!</Text>);
    console.log('Profile settings data ->', {
      ...calorieData,
    });

    push(routes.feed.index);

  };



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

          <div className='border border-gray-200 rounded-md p-5'>

            <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">
              

              <FormGroup
                title="NO"
              >
                <Text >{item?.id}</Text>
              </FormGroup>

              <FormGroup
                title="등록일자"
              >
                <Text >

                  <DateCell date={item?.createdAt} className='w-fit' />
                </Text>
              </FormGroup>

              <FormGroup
                title="작성자"
              >
                <Text >{item?.name} ({item?.email}) 010-9433-4343</Text>
              </FormGroup>


              <FormGroup
                title="문의내용"
              >
                <Text>문의내용입니다.</Text>
              </FormGroup>

              <FormGroup
                title="이미지"
              >
                {/* image view row list */}

                <div className='flex flex-row items-center justify-start gap-5'>
                  <Image
                    src="/images/lefishop.png"
                    alt="product"
                    width={300}
                    height={300}
                  />
                                    <Image
                    src="/images/lefishop.png"
                    alt="product"
                    width={300}
                    height={300}
                  />
                                    <Image
                    src="/images/lefishop.png"
                    alt="product"
                    width={300}
                    height={300}
                  />
                                    <Image
                    src="/images/lefishop.png"
                    alt="product"
                    width={300}
                    height={300}
                  />
     
                </div>
             
              </FormGroup>
           

            </div>


            <div className="mt-10 mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              <FormGroup
                title="답변"
                description='답변을 남겨주세요.'
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


            
            </div>
           

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

          </>
        );
      }}
    </Form>
  );
}
