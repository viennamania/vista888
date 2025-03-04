'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Text } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/utils/validators/signup.schema';

import { useRouter } from 'next/navigation';


import toast from 'react-hot-toast';


const initialValues = {
  email: '',
  password: '',
  isAgreed: false,
};

export default function SignUpForm() {

  const router = useRouter();

  const isMedium = useMedia('(max-width: 1200px)', false);

  const [reset, setReset] = useState({});




  // api call for signup

  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);

  const signUpUser = async (data: SignUpSchema) => {

    setIsLoadingSignUp(true);

    console.log("signUpUser data: ", data);


    try {
      const response = await fetch('/api/corky/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('response ok');

        const responseData = await response.json() as any;

        console.log("signUpUser responseData: ", responseData);
  
  
        if (responseData.success) {
          console.log('responseData success');

          toast.success('회원가입이 완료되었습니다. 로그인해주세요.');
  
          router.push(routes.signInUser);
  
        } else {

          console.log('responseData not success');

          toast.error('회원가입에 실패했습니다. 다시 시도해주세요.');
        }

      } else {
        console.log('response not ok');

        toast.error('회원가입에 실패했습니다. 다시 시도해주세요.');
      }



    } catch (error) {
      console.error('Error:', error);
    }

    setIsLoadingSignUp(false);

  }







  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {

    
    console.log("onSubmit data: ", data);


    setReset({ ...initialValues, isAgreed: false });

  };






  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, control, getValues, setValue, formState: { errors } }) => (

          <div className="space-y-5 lg:space-y-6">
            
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="이메일"
              placeholder="이메일을 입력해주세요"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              size={isMedium ? 'lg' : 'xl'}
              {...register('password')}
              className="[&>label>span]:font-medium"
              error={errors.password?.message}
            />

            
            <div className="col-span-2 flex items-start text-gray-700">
              <Checkbox
                {...register('isAgreed')}
                className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                label={
                  <Text as="span" className="ps-1 text-gray-500">
                   

                    회원가입을 하시면 당사의{' '}

                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      이용약관
                    </Link>{' '}
                    &{' '}
                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      개인정보처리방침
                    </Link>

                    {' '}에 동의하게 됩니다.
                  </Text>
                }
              />
            </div>
            

            <Button
              
              isLoading={isLoadingSignUp}

              className="w-full"
              
              type="submit"

              size={isMedium ? 'lg' : 'xl'}

              
              onClick={() => {
                
                console.log("회원가입 버튼 클릭");

                signUpUser(getValues());
              

              } }
              


            >
              회원가입
            </Button>


          </div>
        )}
      </Form>

      
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">

        이미 계정이 있으신가요?{' '}

        <Link
          href={routes.signInUser}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          로그인하기
        </Link>
      </Text>
      
      



    </>
  );
}
