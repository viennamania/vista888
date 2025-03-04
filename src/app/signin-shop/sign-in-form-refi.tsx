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
import { loginSchema, LoginSchema } from '@/utils/validators/login-refi.schema';



const initialValues: LoginSchema = {
  id: 'lotteworld',
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

      <div className='flex flex-col mb-5 items-start justify-center '>
        <p>Merchant1: lotteworld / 1234 </p>
        <p>Merchant2: lefishop / 1234 </p>
      </div>

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
              label="ID"
              placeholder="Enter your ID"
              color="info"
              className="[&>label>span]:font-bold"
              inputClassName="text-lg"
              {...register('id')}
              //error={errors.id?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
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
              <span>
                Sign In
              </span>{' '}
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


      <div className="flex gap-10 items-center justify-center mt-6">
        <Link
          href={routes.home}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Go to Home
        </Link>
        <Link
          href={routes.signUp}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Merchant Apply
        </Link>
      </div>

    </>
  );
}
