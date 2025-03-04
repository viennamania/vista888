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



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useState } from 'react';

import DateCell from '@/components/ui/date-cell';

import { Checkbox } from '@/components/ui/checkbox';



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


export default function InfoView({
  item,
}: React.PropsWithChildren<DetailsTypes>) {


 
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };



  return (
    

          <>
            
        
              <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">


                <FormGroup
                  title="NO"             
                >
                  <Text>{item?.id}</Text>
                </FormGroup>
                
                <FormGroup
                  title="등록일자"
                >
                  <Text>
                    <DateCell date={item?.createdAt} className='w-fit' />
                  </Text>
                </FormGroup>


                {/* checkbox */}
                <FormGroup
                  title="상단고정"
                  
                >
                  <div className='flex flex-row items-center justify-start gap-5'>
                    <Checkbox
                      variant="flat"
                      aria-label={'ID'}
                      className="cursor-pointer"
                      color='primary'
                      checked={item?.isTop}
                    />
                    <Text>고정</Text>
                  </div>

                </FormGroup>


                <FormGroup
                  title="작성자"
                  
                >
                  <Text >
                    {item?.name} ({item?.email})
                  </Text>
                </FormGroup>

                <FormGroup
                  title="제목"
                  
                >
                  <Text >
                    {item?.title}
                  </Text>
                </FormGroup>


                <FormGroup
                  title="내용"
                  
                >
                  <div className='flex flex-col items-center justify-start gap-5'>

                    <Text >
                      {item?.content}
                    </Text>
                  </div>
                </FormGroup>
                

              </div>
            



            {/*
            <FormFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
            */}

          </>

  );
}
