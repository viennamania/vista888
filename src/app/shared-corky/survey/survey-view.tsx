'use client';


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple, PiCheckCircleFill } from 'react-icons/pi';
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


import BasicTableWidget from '@/components/corky/basic-table-widget';


//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useEffect, useState } from 'react';

import TableAvatar from '@/components/ui/avatar-card';
import { u } from 'uploadthing/dist/types-e8f81bbc';




import { surveyData } from '@/data/lefimall/survey/survey-data';

import { getColumns } from '@/app/shared-corky/survey/survey-columns';


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


export default function InfoView({
  item,
}: React.PropsWithChildren<DetailsTypes>) {


  console.log('item ->', item);
 
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
      
            {/* 게시글 */}
            <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              <FormGroup
                title="NO"
                
              >
                <Text>{item?.id}</Text>
              </FormGroup>

              <FormGroup
                title="참여일시"
              >
                <Text> <DateCell date={item?.createdAt} className='w-fit' /> </Text>
              </FormGroup>

              <FormGroup
                title="참여자"
              >
                {/*
                <TableAvatar
                  src={item?.avatar || '/images/avatars/avatar-blank.webp'}
                  name={item?.name}
                  description={item?.email}
                />
                */}
                <Text>{item?.name} ({item?.email})</Text>
              </FormGroup>



              <FormGroup
                title="결과"
              >

                {/* surveyResult  large text (ISTJ, ISFJ, INFJ, INTJ, ISTP, ISFP, INFP, INTP, ESTP, ESFP, ENFP, ENTP, ESTJ, ESFJ, ENFJ, ENTJ) */}       

                {/* PiCheckCircleFill different color font size large */}

                
                { (item?.surveyResult=='ISTJ' ?
                    <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-red-500" />
                          <Text className=" text-6xl text-red-500">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='ISFJ' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-red-600" />
                          <Text className=" text-6xl text-red-600">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='INFJ' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-red-700" />
                          <Text className=" text-6xl text-red-700">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='INTJ' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-red-800" />
                          <Text className=" text-6xl text-red-800">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='ISTP' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-red-900" />
                          <Text className=" text-6xl text-red-900">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='ISFP' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-yellow-500" />
                          <Text className=" text-6xl text-yellow-500">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='INFP' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-yellow-600" />
                          <Text className=" text-6xl text-yellow-600">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='INTP' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-yellow-700" />
                          <Text className=" text-6xl text-yellow-700">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='ESTP' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-yellow-800" />
                          <Text className=" text-6xl text-yellow-800">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='ESFP' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-yellow-900" />
                          <Text className=" text-6xl text-yellow-900">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='ENFP' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-green-500" />
                          <Text className=" text-6xl text-green-500">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='ENTP' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-green-600" />
                          <Text className=" text-6xl text-green-600">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='ESTJ' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-green-700" />
                          <Text className=" text-6xl text-green-700">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='ESFJ' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-green-800" />
                          <Text className=" text-6xl text-green-800">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='ENFJ' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-green-900" />
                          <Text className="text-6xl text-green-900">{item?.surveyResult}</Text>
                    </div>
                    : item?.surveyResult=='ENTJ' ?
                      <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-blue-500" />
                          <Text className=" text-6xl text-blue-500">{item?.surveyResult}</Text>
                    </div>
                    : <div className="flex items-center gap-2">
                          <PiCheckCircleFill className="text-blue-600" />
                          <Text className=" text-6xl text-blue-600">{item?.surveyResult}</Text>
                    </div>

                )}

              </FormGroup>

            </div>
  

              {/* BMTI 데이타 */}


              <BasicTableWidget
                title="설문별 답변"
                variant="minimal"
                data={surveyData}
                // @ts-ignore
                getColumns={getColumns}
                //enablePagination
                enableSearch={false}
                enablePagination={false}
                
                //searchPlaceholder="닉네임, 제목, 피드백 작성자"

                className="mt-10"
              />

              
          </>

  );
}
