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



import  { useEffect, useState } from 'react';


import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';


import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';


import { Checkbox } from '@/components/ui/checkbox';

import DateCell from '@/components/ui/date-cell';

import StatusField from '@/components/controlled-table/status-field';

import { Badge } from '@/components/ui/badge';





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




/* 자주하는질문, 공지사항, 이용약관, 개인정보처리방침, 이용안내, 이벤트, 쿠폰, 포인트, 적립금, 배송정책, 교환/환불, 취소/반품, 결제/배송, 회원정보, 회원탈퇴, 회원등급, 회원혜택, 회원쿠폰, */
const statusOptions = [
  {
    value: 'all',
    name: '전체',
    label: (
      <div className="flex items-center">
        <Badge color="success" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">전체</Text>
      </div>
    ),
  },
  {
    value: 'faq',
    name: '자주하는질문',
    label: (
      <div className="flex items-center">
        <Badge color="success" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">자주하는질문</Text>
      </div>
    ),
  },
  {
    value: 'notice',
    name: '공지사항',
    label: (
      <div className="flex items-center">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-orange-dark">공지사항</Text>
      </div>
    ),
  },
  {
    value: 'terms',
    name: '이용약관',
    label: (
      <div className="flex items-center">
        <Badge color="danger" renderAsDot />
        <Text className="ms-2 font-medium text-red-dark">이용약관</Text>
      </div>
    ),
  },

]



export type DetailsTypes = {
  item: any;
};


export default function InfoForm({
  item,
}: React.PropsWithChildren<DetailsTypes>) {


  //console.log('item ->', item);

  const { push } = useRouter();

  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text >Saved!!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });

    push(routes.operation.faq);
  };



  const [content, setContent] = useState(item?.content);

  const [title, setTitle] = useState(item?.title);

  const [isTop, setIsTop] = useState(item?.isTop);

  useEffect(() => {
    if (item) {
      setTitle(item?.title);
      setContent(item?.content);
      setIsTop(item?.isTop);
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

            
            <div className="mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">


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
                <Text >에일리 (abcd@gmail.com)</Text>
              </FormGroup>


              {/* checkbox */}
              <FormGroup
                title="자주하는 질문"
                
              >
                <Checkbox
                  variant="flat"
                  aria-label={'isTop'}
                  className="cursor-pointer"
                  color='primary'
                />
              </FormGroup>


              <FormGroup
                title="분류"
                
              >
                <StatusField
                  placeholder='분류를 선택하세요'
                  options={statusOptions}
                  //value={filters['status']}
                  onChange={(value: string) => {
                    //updateFilter('status', value);
                  }}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                    statusOptions.find((option) => option.value === selected)?.label ??
                    selected
                  }
                  /*
                  {...(isMediumScreen && {
                    label: 'Status',
                    labelClassName: 'font-medium text-gray-700',
                  })}
                  */
                  //size='lg'
                />
              </FormGroup>


              <FormGroup
                title="질문"
              >
                <Input
                  //label="Company Name"
                  placeholder="질문을 입력하세요"
                  {...register('last_name')}
                  error={''}
                  value={'회원가입은 어디서 하나요?'}
                />
              </FormGroup>

              <FormGroup
                title="답변"
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
