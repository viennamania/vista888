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
} from '@/utils/validators/lefimall/personal-info.schema';

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



import  { useState } from 'react';

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

 
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text >Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
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
            <div className="pt-5 mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 border rounded-lg p-7 ">

              <FormGroup
                title="NO"
                className="pt-3"
              >
                <Text>{item?.id}</Text>
              </FormGroup>

              <FormGroup
                title="등록일자"
                className="pt-7 "
              >
                <Text>
                  <DateCell date={item?.createdAt} className='w-fit' />
                </Text>
              </FormGroup>

              <FormGroup
                title="작성자"
                className="pt-7"
              >
                <Text >{item?.name} ({item?.email})</Text>
              </FormGroup>

              <FormGroup
                title="제목"
                className="pt-7"
              >
                <Text >{item?.title}</Text>
              </FormGroup>

              <FormGroup
                title="태그"
                className="pt-7"
              >
                <div className='flex flex-row items-center justify-start gap-5'>

                  {item?.tags.map((tag: any, index: any) => (
                    <Text key={index}  >
                      {tag}
                    </Text>
                  ))}

                  </div>
              </FormGroup>



              <FormGroup
                title="내용"
                className="pt-7"
              >
                <div className='flex flex-col items-center justify-start gap-5'>
                  <Text  >
                    {item?.content}
                  </Text>
                </div>
              </FormGroup>

              <FormGroup
                title="이미지"
                className="pt-7"
              >
                {/* image view row list */}

                <div className='flex flex-row items-center justify-start gap-5'>
                  <Image
                    src="/images/food1.jpeg"
                    alt="food1"
                    width={300}
                    height={300}
                  />
                  <Image
                    src="/images/food1.jpeg"
                    alt="food1"
                    width={300}
                    height={300}
                  />
                  <Image
                    src="/images/food1.jpeg"
                    alt="food1"
                    width={300}
                    height={300}
                  />
                  <Image
                    src="/images/food1.jpeg"
                    alt="food1"
                    width={300}
                    height={300}
                  />
                  <Image
                    src="/images/food1.jpeg"
                    alt="food1"
                    width={300}
                    height={300}
                  />
                </div>
             
              </FormGroup>

              <FormGroup
                title="반응"
                className="pt-7"
              >
                <Text >좋아요 {item?.likeCount}, 댓글 {item?.commentCount}, 조회 {item?.viewCount}</Text>
              </FormGroup>
             

            </div>


              {/* comments row list */}
              <BasicTableWidget
                title="댓글"
                variant="minimal"
                data={data}
                // @ts-ignore
                getColumns={getColumns}
                enablePagination
                
                enableSearch={false}

                //className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
              />

              

            



            {/*
            <FormFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
            */}

          </>
        );


      }}
    </Form>
  );
}
