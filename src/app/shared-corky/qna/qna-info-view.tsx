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

import FormFooter from '@/components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';



import Image from 'next/image';



//import { data } from '@/data/lefimall/feed/data';


import BasicTableWidget from '@/components/corky/basic-table-widget';

import { data as calorieData } from '@/data/lefimall/feed/calorie-data';

import { getColumns } from '@/app/shared-corky/feed/calorie-columns';

//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useEffect, useState } from 'react';

import TableAvatar from '@/components/ui/avatar-card';

import DateCell from '@/components/ui/date-cell';

import {
  useDrawer,
  type DrawerPlacements,
} from '@/app/shared/drawer-views/use-drawer';

import UserProfile from '@/app/shared-corky/feed/user-profile';



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
    toast.success(<Text >Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };


  const { openDrawer } = useDrawer();


  const onClickUser = (id: string) => {

    openDrawer({
        view: <UserProfile id={id} />,
        placement: 'right',
    });

  };



  return (
    

          

          <>
              
            {/* 게시글 */}
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
                <DateCell date={item?.createdAt} className='w-fit' />
              </FormGroup>


              <FormGroup
                title="작성자"
              >
                <Text>{item?.name} ({item?.email}) (010-5344-3455)</Text>
              </FormGroup>
                  
              {/*
              <FormGroup
                title="작성자"
                className="pt-7"
              >
                <button
                  type="button"
                  className=' hover:font-bold hover:underline'
                  onClick={() => onClickUser(item?.id)}
                >     
                    <TableAvatar
                      src={item?.avatar}
                      name={item?.name}
                      description={item?.email}
                    />
                </button>
              </FormGroup>
              */}

              <FormGroup
                title="문의내용"
              >
                
                <Text >
                  내용입니다.<br></br>
                  내용입니다.<br></br>
                  내용입니다.<br></br>
                  내용입니다.<br></br>
                </Text>
    
              </FormGroup>



              {/* image view row list */}

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

            
            </div>





            {/* feedback writer profile and feedback content display */}

            
            <div className="mt-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">
  

              <FormGroup
                title="답변 작성자"
              >
                {item?.feedbackWriter} ({item?.feedbackWriterId?.toLowerCase()})
              </FormGroup>

              <FormGroup
                title="답변내용"
              >
                <Text >
                답변입니다.<br></br>
                답변입니다.<br></br>
                답변입니다.<br></br>
                답변입니다.<br></br>

                </Text>
              </FormGroup>


                


            </div>


          </>

  );
}
