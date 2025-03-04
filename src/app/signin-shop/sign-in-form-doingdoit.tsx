'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox } from '@/components/ui/checkbox';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
//import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { loginSchema, LoginSchema } from '@/utils/validators/login-doingdoit.schema';

const initialValues: LoginSchema = {
  id: 'lefishop',
  password: '1234',
  rememberMe: true,
};

export default function SignInForm() {
  //TODO: why we need to reset it here
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log(data);
    signIn('credentials', {
      ...data,
    });
    // setReset({ email: "", password: "", isRememberMe: false });
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5  ">
            <Input
              type="text"
              size="xl"
              label="아이디"
              placeholder="아이디 입력"
              color="info"
              className="[&>label>span]:font-bold"
              inputClassName="text-lg"
              {...register('id')}
              //error={errors.id?.message}
            />
            <Password
              label="비밀번호"
              placeholder="비밀번호 입력"
              size="xl"
              className="[&>label>span]:font-bold"
              inputClassName="text-lg"
              color="info"
              {...register('password')}
              
              ///error={errors.password?.message}
              

            />

            {/*
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                color="info"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            */}
            <Button className="w-full" type="submit" size="lg" color="info">
              <span>로그인</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>

        )}
      </Form>
      {/*
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>
      */}
    </>
  );
}
