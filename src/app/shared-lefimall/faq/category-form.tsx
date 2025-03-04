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


import DateCell from '@/components/ui/date-cell';




import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';

import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';



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


export default function CategoryForm({
  item,
}: React.PropsWithChildren<DetailsTypes>) {
  
  
  const { push } = useRouter();

  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Saved.!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
    push(routes.operation.faqcategory);
  };


  const [content, setContent] = useState(item?.content);

  const [title, setTitle] = useState(item?.title);

  useEffect(() => {
    if (item) {
      setTitle(item?.title);
      setContent(item?.content);
    }
  } ,[ item ]);

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


          {/*
          id: '2',
          name: '회원가입/로그인',
          email: 'kimbbbbb@gmail.com',
          comment: '댓글입니다.',
          createdAt: '2023-07-22T10:53:43.612Z',
          amount: 200,
          */}
            
            <div className="mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              <FormGroup
                title="NO"
                
              >
                <Text >{item?.id}</Text>
              </FormGroup>


              <FormGroup
                title="분류"
                
              >                  
                <Input
                  //color='info'
                  size='lg'
                  value={item?.name}
                  onChange={(e) => setTitle(() => e.target.value)}
                  
                  //onChange={setTitle}

                  //label="Company Name"
                  placeholder="분류를 입력하세요"
                  //{...register('last_name')}
                  error={''}
                />    
              </FormGroup>


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
              
            />
            

          </>
        );
        
      }}
    </Form>
  );
}
