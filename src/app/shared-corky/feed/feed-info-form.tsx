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

import { data as calorieData } from '@/data/lefimall/feed/calorie-data';

import { getColumns } from '@/app/shared-corky/feed/calorie-columns';

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
                <Text >{item?.name} ({item?.email})</Text>
              </FormGroup>

              <FormGroup
                title="식사시간"
              >
                <Text > {item?.mealTime}</Text>
              </FormGroup>

              <FormGroup
                title="내용"
              >
                <Text>내용입니다.</Text>
              </FormGroup>

              <FormGroup
                title="이미지"
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
              >
                <Text>좋아요 23, 댓글 3, 조회 34</Text>
              </FormGroup>

              <FormGroup
                title="공개여부"
              >
                <Text>비공개</Text>
              </FormGroup>
             


              {/* 일자, 식사량, 식사소요시간 */}

                <FormGroup
                  title="식사일자"
                >
                  <Text>2023-11-01</Text>
                </FormGroup>
                <FormGroup
                  title="식사량"
                >
                  <Text>보통</Text>
                </FormGroup>
                <FormGroup
                  title="식사소요시간"
                >
                  <Text>빠르게</Text>
                </FormGroup>

              </div>


              {/* 식사별 데이타 */}


              <BasicTableWidget
                title="식사별 데이타"
                variant="minimal"
                data={calorieData}
                // @ts-ignore
                getColumns={getColumns}
                //enablePagination
                enableSearch={false}
                enablePagination={false}
                
                //searchPlaceholder="닉네임, 제목, 피드백 작성자"

                className="mt-5"
              />

           

            </div>


            <div className="mt-10 mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              <FormGroup
                title="전문가의 피드백"
                description='식단분석 피드백을 남겨주세요.'
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


              {/* 좋음, 양호함, 개선이 필요함 options radio button */}

              <FormGroup
                title="식단점수"
              >
              
                <div className=' p-5 flex flex-row items-center justify-start gap-5'>

                
                    
                  <RadioGroup
                    value={value}
                    //setValue={setValue}

                    setValue={(value) => {
                      //setValue(value);
                      console.log('value', value);
                    } }

                    className="justify-center space-x-4 space-y-4"
                  >
                    <div className="divide-slate-300 flex flex-row items-center justify-center gap-5">
                      <Radio
                        size='lg'
                        name="diet"
                        label="좋음"
                        value="best"
                        labelClassName="pl-2 "
                      />
                      <Radio
                        size='lg'
                        name="diet"
                        label="양호함"
                        value="good"
                        labelClassName="pl-2"
                        //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                        //helperText="Notify me for all reminders."
                      />
                      <Radio
                        size='lg'
                        name="diet"
                        label="개선이 필요함"
                        value="bad"
                        labelClassName="pl-2"
                        //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                        //helperText="Notify me for all reminders."
                      />
                    </div>
                  </RadioGroup>

                </div>

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
