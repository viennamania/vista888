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

import { countries, roles, timezones } from '@/data/lefimall/forms/my-details';

import AvatarUpload from '@/components/ui/file-upload/avatar-upload';


import Image from 'next/image';



//import { RadioGroup } from 'rizzui';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';



import  { useState } from 'react';

import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

import { Checkbox } from '@/components/ui/checkbox';


import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';

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



/*
export const roles = [
  {
    name: '영양사',
    value: 'food_consultant',
  },
  {
    name: '관리자',
    value: 'admin_manager',
  },
  {
    name: '게시판 관리자',
    value: 'board_manager',
  },
  {
    name: '회원 관리자',
    value: 'cs_manager',
  },
];
*/

/*
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
    */

    /* option is different color */

const roleOptions = [

  {
    value: 'food_consultant',
    name: '영양사',
    label: (
      <div className="flex items-center">
        <Badge color="info" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">영양사</Text>
      </div>
    ),
  },
  {
    value: 'admin_manager',
    name: '관리자',
    label: (
      <div className="flex items-center">
        <Badge color="success" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">관리자</Text>
      </div>
    ),
  },
  {
    value: 'board_manager',
    name: '게시판 관리자',
    label: (
      <div className="flex items-center">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">게시판 관리자</Text>
      </div>
    ),
  },
  {
    value: 'cs_manager',
    name: '회원 관리자',
    label: (
      <div className="flex items-center">
        <Badge color="danger" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">회원 관리자</Text>
      </div>
    ),
  },
];





export default function Create() {

  const { push } = useRouter();


  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');


  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Saved!!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });

    push(routes.user.admin);
  };


  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);



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

            
            <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">

              <FormGroup
                title="관리역할"
              >

                <Controller

                  control={control}
                  name="role"
                  render={({ field: { value, onChange } }) => (
                    <SelectBox
                      size='lg'
                      placeholder="관리역할을 선택하세요"
                      //options={roles}
                      options={roleOptions}
                      onChange={onChange}
                      value={value}
                      //className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        roles?.find((r) => r.value === selected)?.name ?? ''
                      }
                      error={errors?.role?.message as string}
                    />
                  )}
                />

              </FormGroup>


              <FormGroup
                title="담장자명"
              >
                <Input
                  size='lg'
                  //label="Company Name"
                  placeholder="담당자명을 입력하세요"
                  {...register('last_name')}
                  error={''}
                />
                <div className="flex items-center justify-start">
                  <Text className="text-sm " >
                    노출되는 이름입니다. 실명을 입력해주세요.
                  </Text>
                </div>
              </FormGroup>

              <FormGroup
                title="연락처"
              >
                <Input
                  size='lg'
                  //label="Company Name"
                  placeholder="연락처를 입력하세요"
                  {...register('last_name')}
                  error={''}
                />
                <div className="flex items-center justify-start">
                  <Text className="text-sm">
                    연락가능한 핸드폰 번호를 입력해주세요.
                  </Text>
                </div>
              </FormGroup>


              <FormGroup
                title="아이디"
              >
                <Input
                  size='lg'
                  //label="Company Name"
                  placeholder="아이디를 입력하세요"
                  {...register('last_name')}
                  error={''}
                />
                <div className="flex items-center justify-start">
                  <Text className="text-sm">
                    아이디는 4자리 이상 영문, 숫자 조합으로 입력해주세요. 
                  </Text>
                </div>
              </FormGroup>

              <FormGroup
                title="비밀번호"
              >
                <Input
                  size='lg'
                  //label="Company Name"
                  placeholder="비밀번호를 입력하세요"
                  {...register('last_name')}
                  error={''}
                />
                <div className="flex items-center justify-start">
                  <Text className="text-sm">
                    비밀번호는 8자리 이상 영문, 숫자 조합으로 입력해주세요. 
                  </Text>
                </div>
              </FormGroup>


            </div>




            {/* check box */}

            <div className='mt-10 mb-10 p-5 flex flex-col items-start justify-start gap-5  border rounded-lg '>


              <FormGroup
                title="권한설정"
              >
              </FormGroup>

                <div className=" grid grid-cols-7 items-start justify-start gap-5">

                  <div className='flex flex-col items-start justify-start gap-2  border rounded-lg p-5'>
                    <div>User</div>
                    <Checkbox
                      label="회원"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="Inactive User"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="관리계정관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>피드</div>
                    <Checkbox
                      label="피드관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="피드통계"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>자유게시판</div>
                    <Checkbox
                      label="게시글관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="추천태그관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>설문</div>
                    <Checkbox
                      label="설문관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="설문통계"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>운영</div>
                    <Checkbox
                      label="건강정보"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                    <Checkbox
                      label="유형별가이드"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                    <Checkbox
                      label="공지사항"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                    <Checkbox
                      label="FAQ"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                    <Checkbox
                      label="FAQ분류관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>포인트</div>
                    <Checkbox
                      label="포인트관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="포인트설정"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>설정</div>
                    <Checkbox
                      label="식품DB관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="약관"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

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

                //push(routes.operation.healthinfo);

                //Router.push({routes.feed});

                //Router.push('/feed');

                window.history.back();

              } }
              /*
              handleMainBtn={() => {

                console.log('handleMainBtn');

              } }
              */
          
            
            />
            

          </>
        );
      }}


      
    </Form>
  );
}
