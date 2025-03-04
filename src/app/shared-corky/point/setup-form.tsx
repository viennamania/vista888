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
import FormFooter from '@/components/form-footer';



import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';


import Image from 'next/image';



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useEffect, useState } from 'react';


import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';


import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';


//import DeletePopover from '@/app/shared-corky/delete-popover-large';

import SavePopover from '@/app/shared-corky/save-popover-large';


import { Modal } from '@/components/ui/modal';

import { Button } from '@/components/ui/button';


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


const modalData = {
  title: '',
  description: '',
  data: [],
};



const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
  toast.success(<Text as="b">Saved!!</Text>);
  console.log('Profile settings data ->', {
    ...data,
  });

  //push(routes.operation.healthinfoDetails(item?.id));
};



export default function SetupForm() {

  const { push } = useRouter();

  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Saved!!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };


  useEffect(() => {
    setValue('서비스 준비중입니다.');
  } , []);


  const [open, setOpen] = useState(false);


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

            <div className="mx-auto mt-0 w-full max-w-[1294px]">

              <div className=" flex flex-row items-center justify-end">

                <Button
                  type="submit"
                  //isLoading={isLoading}
                  className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                  onClick={() => {
                    onSubmit(getValues());
                  } }
                >
                  Save
                </Button>

              </div>


              
              <div className="mt-5 mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">


                <FormGroup
                  title="피드 좋아요"
                >
                  <div className="flex flex-row items-center justify-start">
                    
                    <Input
                      type='number'
                      //label="Company Name"
                      placeholder="100"
                      {...register('last_name')}
                      error={''}
                      //value={'100'}

                      inputClassName=' font-semibold text-gray-900 xl:text-lg '
                      className=' w-32 '
                      // center align
                      
                    />
                    <span className="ml-2 text-lg font-bold">P</span>
                  </div>
                  
                </FormGroup>

                <FormGroup
                  title="게시판 좋아요"
                >
                  <div className="flex flex-row items-center justify-start">
                    <Input
                      type='number'
                      //label="Company Name"
                      placeholder="100"
                      {...register('last_name')}
                      error={''}
                      //value={'100'}

                      inputClassName=' font-semibold text-gray-900 xl:text-lg '
                      className=' w-32 '
                      
                    />
                    <span className="ml-2 text-lg font-bold">P</span>
                  </div>
                </FormGroup>

                <FormGroup
                  title="출석"
                >
                  <div className="flex flex-row items-center justify-start">
                    <Input
                      type='number'
                      //label="Company Name"
                      placeholder="100"
                      {...register('last_name')}
                      error={''}
                      //value={'100'}

                      inputClassName=' font-semibold text-gray-900 xl:text-lg '
                      className=' w-32 '
                      
                    />
                    <span className="ml-2 text-lg font-bold">P</span>
                  </div>
                </FormGroup>


                <FormGroup
                  title="피드작성"
                >
                  <div className="flex flex-row items-center justify-start">
                    <Input
                      type='number'
                      //label="Company Name"
                      placeholder="100"
                      {...register('last_name')}
                      error={''}
                      //value={'100'}

                      inputClassName=' font-semibold text-gray-900 xl:text-lg '
                      className=' w-32 '
                      
                    />
                    <span className="ml-2 text-lg font-bold">P</span>
                  </div>
                </FormGroup>



                

              </div>


            </div>
            

          </>
        );
      }}
    </Form>
  );
}
