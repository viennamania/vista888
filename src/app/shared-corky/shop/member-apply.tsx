'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';



import { Badge } from '@/components/ui/badge';

import { Title, Text } from '@/components/ui/text';


import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import cn from '@/utils/class-names';
import PostFeed from '@/app/shared/profile/post-feed';
import FollowerModal from '@/app/shared/profile/follower-modal';


import { postData, followersData, followingData } from '@/data/lefimall/profile-data';



const tabs = [
  { id: 'posts', count: postData.length },
  { id: 'followers', count: followersData.length },
  { id: 'following', count: followingData.length },
];



import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



import PointTableWidget from '@/components/corky/point-table-widget';

/////////////mport { pointData } from '@/data/lefimall/user/point-data';

import { getColumns as pointGetColumns } from '@/app/shared-corky/user/point-columns';

import CouponTableWidget from '@/components/corky/coupon-table-widget';

import { getColumns as couponGetColumns } from '@/app/shared-corky/user/coupon-columns';


import CompletedTableWidget from '@/components/corky/settlement/completed-table-widget';

//import { getColumns as settlementGetColumns } from '@/app/shared-corky/user/settlement-columns';
import { getColumns as completedGetColumns } from '@/app/shared-corky/settlement/completed-columns';


import { memberData } from '@/data/lefimall/user/member-data';

import FormGroup from '@/app/shared-corky/form-group';

import { Form } from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import DateCell from '@/components/ui/date-cell';


import Image from 'next/image';


import { AdvancedRadio } from '@/components/ui/advanced-radio';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';

import { siteConfig } from '@/config/site.config';


import { PiXBold, PiGenderMale, PiGenderFemale, PiSun, PiMoon } from 'react-icons/pi';


import { useTheme } from 'next-themes';
import { set } from 'lodash';


import SavePopover from '@/app/shared-corky/save-popover';

import SaveAll from '@/app/shared-corky/save-popover-large';


import { Textarea } from '@/components/ui/textarea';


import Spinner from '@/components/ui/spinner';

import toast from 'react-hot-toast';

import { SubmitHandler, Controller } from 'react-hook-form';



import {
  defaultValues,
  shopInfoFormSchema,
  ShopInfoFormTypes,
} from '@/utils/validators/lefimall/shop-info.schema';



/*
// dynamic import Uploader component
import dynamic from 'next/dynamic';
const Uploader1 = dynamic(() => import('@/components/corky/upload/uploader'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});

const Uploader2 = dynamic(() => import('@/components/corky/upload/uploader'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});
*/

//import Uploader from '@/components/corky/upload/uploader';

import Uploader1 from '@/components/corky/upload/uploaderVercel1';
import Uploader2 from '@/components/corky/upload/uploaderVercel2';







import BasicInfo from '@/app/shared-corky/shop/member-details-basic-apply';
import BusinessInfo from '@/app/shared-corky/shop/member-details-business-apply';
import SettlementInfo from '@/app/shared-corky/shop/member-details-settlement';
import DeliveryInfo from '@/app/shared-corky/shop/member-details-delivery';
import { on } from 'events';

      /*
      businessName: '레피샵',
      representativeName: '김대표',
      businessType: '소매',
      businessCategory: '패션잡화',
      businessRegistrationNumber: '123-45-67890',
      businessRegistrationAddress: '서울시 강남구 테헤란로 427',
      mailOrderRegistrationNumber: '2021-서울강남-00000',
      businessPhone: '02-1234-5678',
      businessFax: '02-1234-5678',
      settlementBank: '신한은행',
      settlementAccount: '123-45-67890',
      settlementAccountHolder: '김대표',
      settlementFeeRate: 0,
      */







interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}



function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}





function RadioBox({
  value,
  children,
  className,
  ...props
}: React.PropsWithChildren<{ value: string; className?: string }>) {
  return (
    <AdvancedRadio
      value={value}
      color="primary"
      className={cn(
        'flex h-16 items-center justify-center rounded border border-gray-200 px-6 py-1.5 text-sm font-medium capitalize text-gray-500 shadow-sm hover:cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:text-gray-900 peer-checked:ring-[0.6px] peer-checked:ring-primary dark:peer-checked:border-primary dark:peer-checked:ring-primary',
        className
      )}
      inputClassName="[&:checked:enabled~span]:ring-1 [&:checked:enabled~span]:ring-offset-0 [&:checked:enabled~span]:ring-primary [&:checked:enabled~span]:border-primary"
      {...props}
    >
      {children}
    </AdvancedRadio>
  );
}



export type ProfileDetailsTypes = {
  id: string;
};



export default function ProfileDetails({
  id,

}: React.PropsWithChildren<ProfileDetailsTypes>) {


  console.log('ProfileDetails id: ', id);

  

///export default function ProfileDetails() {

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /*
  const modalData = {
    title: '',
    description: '',
    data: [],
  };

  */
  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    data: [],
  });

  /*
  const [modalData, setModalData] = useState({
    title: 'Followers',
    data: followersData,
  });
  */

  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    setOpen(() => false);
  }, [pathname]);


  /*
  // handle follower and following modal open
  function handleTabClick(id: string) {
    if (id === 'followers') {
      setModalData({ title: 'Followers', data: followersData });
    } else if (id === 'following') {
      setModalData({ title: 'Following', data: followingData });
    }
    setOpen(() => true);
    setActive(() => id);
  }
  */


  const [valueTab, setValueTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };



  /* member data from data */
  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(false);



  const [shopName, setShopName] = useState(data?.name);
  
  const [contactName, setContactName] = useState(data?.contactName);

  const [contactPhone, setContactPhone] = useState(data?.contactPhone);
  const [contactEmail, setContactEmail] = useState(data?.contactEmail);
  const [introduction, setIntroduction] = useState(data?.introduction);





  const [businessName, setBusinessName] = useState(data?.businessName);
  const [representativeName, setRepresentativeName] = useState(data?.representativeName);
  const [businessType, setBusinessType] = useState(data?.businessType);
  const [businessCategory, setBusinessCategory] = useState(data?.businessCategory);
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState(data?.businessRegistrationNumber);
  const [businessRegistrationAddress, setBusinessRegistrationAddress] = useState(data?.businessRegistrationAddress);
  const [businessRegistrationImage, setBusinessRegistrationImage] = useState(data?.businessRegistrationImage);

  const [mailOrderRegistrationNumber, setMailOrderRegistrationNumber] = useState(data?.mailOrderRegistrationNumber);
  const [mailOrderRegistrationImage, setMailOrderRegistrationImage] = useState(data?.mailOrderRegistrationImage);

  const [businessPhone, setBusinessPhone] = useState(data?.businessPhone);
  const [businessFax, setBusinessFax] = useState(data?.businessFax);
  const [memo , setMemo] = useState(data?.memo);





  const fetchData = async () => {
    setLoading(true);

    const res = await fetch(`/api/corky/shop/getOne?_id=${id}`);

    const data  = await res.json() as any;

    if (!data) {
      return {
        notFound: true,
      };
    }
  

    setData(data.data);

    setShopName(data.data?.name);
    setContactName(data.data?.contactName);
    setContactPhone(data.data?.contactPhone);
    setContactEmail(data.data?.contactEmail);
    setIntroduction(data.data?.introduction);

    setLoading(false);

  };

  useEffect(() => {
    fetchData();
  } , [ id ]);

  

  const { theme, setTheme } = useTheme();




  const saveShopName = async (id: string, name: string) => {

    try {
      const res = await fetch(`/api/corky/shop/updateName?_id=${id}&_name=${name}`);
      const data = await res.json();
      //setShopName(name);
      fetchData();

      setOpen(true);
      modalData.description = '변경되었습니다.';

    } catch (err) {
      console.log(err);
    }

  };




  const saveContactName = async (id: string, value: string) => {
    try {
      const res = await fetch(`/api/corky/shop/updateContactName?_id=${id}&_value=${value}`);
      const data = await res.json();
;
      fetchData();

      setOpen(true);
      modalData.description = '변경되었습니다.';

    } catch (err) {
      console.log(err);
    }
  };


  const saveContactPhone = async (id: string, value: string) => {
    try {
      const res = await fetch(`/api/corky/shop/updateContactPhone?_id=${id}&_value=${value}`);
      const data = await res.json();

      fetchData();

      setOpen(true);
      modalData.description = '변경되었습니다.';

    } catch (err) {
      console.log(err);
    }
  };


  const saveContactEmail = async (id: string, value: string) => {
    try {
      const res = await fetch(`/api/corky/shop/updateContactEmail?_id=${id}&_value=${value}`);
      const data = await res.json();

      fetchData();

      setOpen(true);
      modalData.description = '변경되었습니다.';

    } catch (err) {
      console.log(err);
    }
  };


  const saveIntroduction = async (id: string, value: string) => {
    try {
      const res = await fetch(`/api/corky/shop/updateIntroduction?_id=${id}&_value=${value}`);
      const data = await res.json();

      fetchData();

      setOpen(true);
      modalData.description = '변경되었습니다.';

    } catch (err) {
      console.log(err);
    }
  };


  const [disabled, setDisabled] = useState(false);

  /*
  useEffect(() => {
    if (shopName !== data?.name) {
      setDisabled(false);
    } else if (contactName !== data?.contactName) {
      setDisabled(false);
    } else if (contactPhone !== data?.contactPhone) {
      setDisabled(false);
    } else if (contactEmail !== data?.contactEmail) {
      setDisabled(false);
    } else if (introduction !== data?.introduction) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [ shopName, contactName, contactPhone, contactEmail, introduction ]);
  */


 

  const saveAll = async () => {

    

    try {
      const res = await fetch(`/api/corky/shop/updateBasic?_id=${id}&_shopName=${shopName}&_contactName=${contactName}&_contactPhone=${contactPhone}&_contactEmail=${contactEmail}&_introduction=${introduction}`);
      const data = await res.json();

      fetchData();

      setOpen(true);
      modalData.description = 'Saved.';

    } catch (err) {
      console.log(err);
    }
  };


  const save = async ( data: any ) => {

    // json post api

    try {

    const params = {
      ...data,
    };


    const res = await fetch(`/api/corky/shop/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const result = await res.json();

    console.log('result -> ', result);

    fetchData();

    setOpen(true);
    modalData.description = 'Saved.';


    } catch (err) {
      console.log(err);
    }

  }




  const onSubmit: SubmitHandler<ShopInfoFormTypes> = (data) => {
    /*
      businessName: undefined,
  representativeName: undefined,
  businessType: undefined,
  businessCategory: undefined,
  businessRegistrationNumber: undefined,
  businessRegistrationImage: undefined,
  mailOrderRegistrationNumber: undefined,
  mailOrderRegistrationImage: undefined,
  businessRegistrationAddress: undefined,
  businessPhone: undefined,
  businessFax: undefined,

  loginid: undefined,
  password: undefined,

  shopName: undefined,
  contactName: undefined,
  contactPhone: undefined,
  contactEmail: undefined,
  introduction: undefined,
  */

  console.log('Shop application data ->', {
    ...data,
  });

  if (data?.businessName && data?.representativeName && data?.businessType && data?.businessCategory && data?.businessRegistrationNumber && data?.businessRegistrationImage && data?.businessRegistrationAddress && data?.businessPhone && data?.businessFax && data?.loginid && data?.password && data?.shopName && data?.contactName && data?.contactPhone && data?.contactEmail && data?.introduction) {
    save (data);
  } 


    /* if data is empty, reject */
    data?.businessName || toast.error(<Text >업체명(브랜드명)을 입력해 주세요.</Text>);
    data?.representativeName || toast.error(<Text >대표자명을 입력해 주세요.</Text>);
    data?.businessType || toast.error(<Text >업태를 입력해 주세요.</Text>);
    data?.businessCategory || toast.error(<Text >종목을 입력해 주세요.</Text>);
    data?.businessRegistrationNumber || toast.error(<Text >사업자번호를 입력해 주세요.</Text>);
    data?.businessRegistrationImage || toast.error(<Text >사업자등록증을 등록해 주세요.</Text>);
    data?.businessRegistrationAddress || toast.error(<Text >사업장주소를 입력해 주세요.</Text>);
    data?.businessPhone || toast.error(<Text >전화를 입력해 주세요.</Text>);
    data?.businessFax || toast.error(<Text >팩스를 입력해 주세요.</Text>);
    data?.loginid || toast.error(<Text >로그인 아이디를 입력해 주세요.</Text>);
    data?.password || toast.error(<Text >로그인 비밀번호를 입력해 주세요.</Text>);
    data?.shopName || toast.error(<Text >Name을 입력해 주세요.</Text>);
    data?.contactName || toast.error(<Text >담당자명을 입력해 주세요.</Text>);
    data?.contactPhone || toast.error(<Text >담당자 전화를 입력해 주세요.</Text>);
    data?.contactEmail || toast.error(<Text >담당자 이메일을 입력해 주세요.</Text>);
    data?.introduction || toast.error(<Text >Merchant 소개를 입력해 주세요.</Text>);
    /* if data is empty, reject */

    ///toast.success(<Text >Successfully added!</Text>);


   
    



  

  };



  return (
    
    <Form<ShopInfoFormTypes>
      validationSchema={shopInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      ///className='@container'
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {

      return (
        
        <>
          <div className="flex flex-col gap-5  ">

            
            {/* 입점 가입 신첟 */}

            <div className='flex items-center justify-center text-3xl font-bold'>
              입점 가입 신청
            </div>
          

            <Box sx={{ width: '100%' }}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="입점을 위해 상점 정보를 입력해 주세요." {...a11yProps(0)} />
                  
                  <Tab label="상점의 계정정보를 만들어 주세요." {...a11yProps(1)} />

                  {/*
                  <Tab label="정산" {...a11yProps(2)} />
                  <Tab label="배송" {...a11yProps(3)} />
                  */}
                </Tabs>

              </Box>

              <CustomTabPanel value={valueTab} index={0}>


                  {/*
                  <BusinessInfo id={id} />
                  */}

                  <div className="mt-5  divide-y divide-solid divide-gray-200 border  rounded-t-lg ">
                  

                  {/* FromGroup w-full */}
                  {/*  <div className={cn('grid gap-5 @3xl:grid-cols-12', className)}> */}

                  {/* 업체명(브랜드명) */}
                  <FormGroup
                    title="업체명(브랜드명)"

                    // width 100%


                    
                  >

                    <Controller
                      control={control}
                      name="businessName"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          size='lg'
                          value={value}
                          //label="Company Name"
                          placeholder="업체명(브랜드명)"
                          ///defaultValue={data?.businessName}
                          onChange={onChange}
                          //error={error.businessName?.message}

                          className='w-full'
                        />
                      )}
                    />

                  </FormGroup>

                  {/* 대표자명 */}
                  <FormGroup
                    title="대표자명"
                  >

                    <Controller
                      control={control}
                      name="representativeName"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          size='lg'
                          value={value}
                          //label="Company Name"
                          placeholder="대표자명"
                          ///defaultValue={data?.businessName}
                          onChange={onChange}
                          //error={error.businessName?.message}
                          className='w-full'
                        />
                      )}
                    />
                  
                  
                  </FormGroup>

                  <FormGroup
                    title="업태/종목"
                  >
                    <div className='flex flex-col items-start justify-start gap-3'>

 

                        <Controller
                          control={control}
                          name="businessType"
                          render={({ field: { onChange, value } }) => (
                            <Input
                              size='lg'
                              value={value}
                              //label="Company Name"
                              placeholder="업태"
                              ///defaultValue={data?.businessName}
                              onChange={onChange}
                              //error={error.businessName?.message}
                              className='w-full'
                            />
                          )}
                        />
                
                        <Controller
                          control={control}
                          name="businessCategory"
                          render={({ field: { onChange, value } }) => (
                            <Input
                              size='lg'
                              value={value}
                              //label="Company Name"
                              placeholder="종목"
                              ///defaultValue={data?.businessName}
                              onChange={onChange}
                              //error={error.businessName?.message}
                              className='w-full'
                            />
                          )}
                        />
                    

                    </div>

                  </FormGroup>



                  <FormGroup
                    title="사업자번호"
                  >
                    <div className='flex flex-col items-start justify-start gap-3'>

                      
                      {/*
                        <Input
                          size='lg'
                          //label="Company Name"
                          placeholder="사업자번호"
                          //className="flex-grow "
                          defaultValue={businessRegistrationNumber}
                          onChange={(e) => {
                            setBusinessRegistrationNumber(e.target.value);
                          } }
                        />
                      */}
                      <Controller
                        control={control}
                        name="businessRegistrationNumber"
                        render={({ field: { onChange, value } }) => (
                          <Input
                            size='lg'
                            value={value}
                            //label="Company Name"
                            placeholder="사업자번호"
                            ///defaultValue={data?.businessName}
                            onChange={onChange}
                            //error={error.businessName?.message}

                            className='w-full'
                          />
                        )}
                      />
                   

                      <Controller
                        control={control}
                        name="businessRegistrationImage"
                        render={({ field: { onChange, value } }) => (
                          <div className="flex flex-row items-center justify-start gap-3">

                            <Uploader1
                              onSave={(url: string) => {
                                
                                setBusinessRegistrationImage(url);
                                onChange(url);

                              }}
                            />

                            <Image
                              src={businessRegistrationImage || '/logo.png'}
                              alt={value?.name || ''}
                              priority
                              width={200}
                              height={200}
                            />

                          </div>
                        )}
                      />

                    </div>

                  </FormGroup>

                  {/* 통신판매신고번호 */}
                  {/*
                  <FormGroup
                    title="통신판매신고번호"
                  >
                    <div className='flex flex-col items-start justify-start gap-3'>


                      <Controller
                        control={control}
                        name="mailOrderRegistrationNumber"
                        render={({ field: { onChange, value } }) => (
                          <Input
                            size='lg'
                            value={value}
                            //label="Company Name"
                            placeholder="통신판매신고번호"
                            ///defaultValue={data?.businessName}
                            onChange={onChange}
                            //error={error.businessName?.message}
                            className='w-full'
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name="mailOrderRegistrationImage"
                        render={({ field: { onChange, value } }) => (
                          <div className="flex flex-row items-center justify-start gap-3">

                            <Uploader2
                              onSave={(url: string) => {
                                
                                setMailOrderRegistrationImage(url);
                                onChange(url);

                              }}
                            />

                            <Image
                              src={mailOrderRegistrationImage || '/logo.png'}
                              alt={value?.name || ''}
                              priority
                              width={200}
                              height={200}
                            />

                          </div>

                        )}
                      />

                    </div>

                  </FormGroup>
                  */}

               
                  {/* 사업장주소 */}
                  <FormGroup
                    title="사업장주소"
                  >
                      {/*
                      <Input
                        size='lg'
                        //label="Company Name"
                        placeholder="사업장주소"
                        //className="flex-grow "
                        defaultValue={businessRegistrationAddress}
                        onChange={(e) => {
                          setBusinessRegistrationAddress(e.target.value);
                        } }
                      />
                      */}

                      <Controller
                        control={control}
                        name="businessRegistrationAddress"
                        render={({ field: { onChange, value } }) => (
                          <Input
                            size='lg'
                            value={value}
                            //label="Company Name"
                            placeholder="사업장주소"
                            ///defaultValue={data?.businessName}
                            onChange={onChange}
                            //error={error.businessName?.message}
                            className='w-full'
                          />
                        )}
                      />
                     
                  </FormGroup>

                  {/* 전화 */}
                  <FormGroup
                    title="전화"
                  >
                    
                    {/*
                      <Input
                        size='lg'
                        //label="Company Name"
                        placeholder="전화"
                        //className="flex-grow "
                        defaultValue={businessPhone}
                        onChange={(e) => {
                          setBusinessPhone(e.target.value);
                        } }
                      />
                    */}

                    <Controller
                      control={control}
                      name="businessPhone"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          size='lg'
                          value={value}
                          //label="Company Name"
                          placeholder="전화"
                          ///defaultValue={data?.businessName}
                          onChange={onChange}
                          //error={error.businessName?.message}
                          className='w-full'
                        />
                      )}
                    />
                      
                  </FormGroup>
                    
                    {/* 팩스 */}
                  <FormGroup

                    title="팩스"
                  >
                   
                   {/*  
                      <Input
                        size='lg'
                        //label="Company Name"
                        placeholder="팩스"
                        //className="flex-grow "
                        defaultValue={businessFax}
                        onChange={(e) => {
                          setBusinessFax(e.target.value);
                        } }
                      />
                    */}

                    <Controller
                      control={control}
                      name="businessFax"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          size='lg'
                          value={value}
                          //label="Company Name"
                          placeholder="팩스"
                          ///defaultValue={data?.businessName}
                          onChange={onChange}
                          //error={error.businessName?.message}
                          className='w-full'
                        />
                      )}
                    />
                      
                  </FormGroup>



                </div>


                <div className="flex justify-center">
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-b-md"
                    onClick={() => {
                      
                      //setValue(1);
                    
                      // change tap 1
                      setValueTab(1);



                    }}
                  >
                    <span>다음</span>
                  </button>
                </div>

              </CustomTabPanel>





              <CustomTabPanel value={valueTab} index={1}>

                {/*
                <BasicInfo id={id} />
                */}


                <div className="mt-5  divide-y divide-solid divide-gray-200 border  rounded-t-lg ">
                  
                  {/* FromGroup w-full */}
                  <FormGroup
                    title="로그인 아이디"
                  >
                    {/*
                    <Input
                      size='lg'
                      type="text"
                      placeholder="아이디"
                      //className="flex-grow "
                      defaultValue={data?.username}
                      
                    />
                    */}

                    <Controller
                      control={control}
                      name="loginid"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          size='lg'
                          value={value}
                          //label="Company Name"
                          placeholder="아이디"
                          ///defaultValue={data?.businessName}
                          onChange={onChange}
                          //error={error.businessName?.message}
                          className='w-full'
                        />
                      )}
                    />
                  </FormGroup>

                  {/* 비밀번호 */}
                  <FormGroup
                    title="로그인 비밀번호"
                  >
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, value } }) => (

                        <Input
                          size='lg'
                          value={value}
                          //label="Company Name"
                          placeholder="비밀번호"
                          ///defaultValue={data?.businessName}
                          onChange={onChange}
                          //error={error.businessName?.message}
                          className='w-full'
                        />

                      )}
                    />

                  </FormGroup>


                  <FormGroup
                    title="Name"
                  >
                    {/*
                      <Input
                        size='lg'
                        //label="Company Name"
                        placeholder="Name"
                        //className="flex-grow "
                        defaultValue={data?.name}
                        onChange={(e) => {
                          setShopName(e.target.value);
                        } }
                        className='w-full'
                      />
                    */}
                    <Controller
                      control={control}
                      name="shopName"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          size='lg'
                          value={value}
                          //label="Company Name"
                          placeholder="Name"
                          ///defaultValue={data?.businessName}
                          onChange={onChange}
                          //error={error.businessName?.message}
                          className='w-full'
                        />
                      )}
                    />

                  </FormGroup>



                  <FormGroup
                    title="담당자명"
                  >
                      {/*
                      <Input
                        size='lg'
                        //label="Company Name"
                        placeholder="담당자명"
                        //className="flex-grow "
                        defaultValue={data?.contactName}
                        onChange={(e) => {
                          setContactName(e.target.value);
                        } }
                        className='w-full'
                      />
                      */}

                      <Controller
                        control={control}
                        name="contactName"
                        render={({ field: { onChange, value } }) => (
                          <Input
                            size='lg'
                            value={value}
                            //label="Company Name"
                            placeholder="담당자명"
                            ///defaultValue={data?.businessName}
                            onChange={onChange}
                            //error={error.businessName?.message}
                            className='w-full'
                          />
                        )}  
                      />
                     
                  </FormGroup>

                  <FormGroup
                    title="연락처"
                  >
                      {/*
                      <Input
                        size='lg'
                        //label="Company Name"
                        placeholder="연락처"
                        //className="flex-grow "
                        defaultValue={data?.contactPhone}
                        onChange={(e) => {
                          setContactPhone(e.target.value);
                        } }
                        className='w-full'
                      />
                      */}

                      <Controller
                        control={control}
                        name="contactPhone"
                        render={({ field: { onChange, value } }) => (
                          <Input
                            size='lg'
                            value={value}
                            //label="Company Name"
                            placeholder="연락처"
                            ///defaultValue={data?.businessName}
                            onChange={onChange}
                            //error={error.businessName?.message}
                            className='w-full'
                          />
                        )}
                      />
                  
                
                  </FormGroup>

                  <FormGroup
                    title="이메일"
                  >
                    {/*
                      <Input
                        size='lg'
                        //label="Company Name"
                        placeholder="이메일"
                        //className="flex-grow "
                        defaultValue={data?.contactEmail}
                        onChange={(e) => {
                          setContactEmail(e.target.value);
                        } }
                        className='w-full'
                      />
                    */}

                    <Controller
                      control={control}
                      name="contactEmail"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          size='lg'
                          value={value}
                          //label="Company Name"
                          placeholder="이메일"
                          ///defaultValue={data?.businessName}
                          onChange={onChange}
                          //error={error.businessName?.message}
                          className='w-full'
                        />
                      )}
                    />
                  </FormGroup>

                  <FormGroup
                    title="소개글"
                  >
                    
                      {/*
                      <Textarea
                        size='lg'
                        //label="Company Name"
                        placeholder={data?.introduction}
                        //className="flex-grow "
                        defaultValue={data?.introduction}
                        onChange={(e) => {
                          setIntroduction(e.target.value);
                        } }
                        className='w-full'
                      />
                      */}

                      <Controller
                        control={control}
                        name="introduction"
                        render={({ field: { onChange, value } }) => (
                          <Textarea
                            size='lg'
                            value={value}
                            //label="Company Name"
                            placeholder="소개글"
                            ///defaultValue={data?.businessName}
                            onChange={onChange}
                            //error={error.businessName?.message}
                            className='w-full'
                          />
                        )}
                      />

                  </FormGroup>

                  {/*
                  <FormGroup
                    title="성별"
                  >
                    {(data?.gender=='남' ? ( // man
                      <div className='flex flex-row items-center justify-start gap-3'>
                        <PiGenderMale className='h-5 w-5' />
                        <Text className="font-medium text-gray-700">{data?.gender}</Text>
                      </div>
                      ) : (data?.gender=='여') ? (
                        <div className='flex flex-row items-center justify-start gap-3'>
                          <PiGenderFemale className='h-5 w-5' />
                          <Text className="font-medium text-gray-700">{data?.gender}</Text>
                        </div>
                      ) : (
                        <div className='flex flex-row items-center justify-start gap-3'>
                          <PiGenderMale className='h-5 w-5' />
                          <Text className="font-medium text-gray-700">{data?.gender}</Text>
                        </div>
                      )

                    )}

                  </FormGroup>
                

                                
                  <FormGroup
                    title="관심사"
                  >
                    <Text>
                      {data?.interests?.map((item: any, index: any) => (
                        <Badge
                          key={index}
                          variant="solid"
                          color="primary"
                          className="me-1"
                        >
                          {item}
                        </Badge>
                      ))}
                    </Text>
                  </FormGroup>
                  

                  <FormGroup
                    title="마케팅 수신동의"
                  >
                    <Text>
                      {data?.marketingAgree == 'Y' ? (
                        <Badge variant="solid" color="success">
                          동의함
                        </Badge>
                      ) : (
                        <Badge variant="solid" color="danger">
                          동의안함
                        </Badge>
                      )}
                    </Text>
                  </FormGroup>

                  {data?.status == 'Pending' && (
                    
                    <FormGroup
                      title="탈퇴일"
                    >
                      <Text> {data?.updatedAt} </Text>
                    </FormGroup>
                  )}


                  <FormGroup
                    title="로그인 제재"
                  >
                  
                    <RadioGroup
                      value={
                        data?.status
                      }
                      //setValue={setValue}

                      setValue={(value) => {
                        //setValue(value);
                        console.log('value', value);
                      } }

                      className="justify-start space-x-4 space-y-4"
                    >

                      <div className="divide-slate-300 flex flex-row items-center justify-start gap-5">

                        <Radio
                          name="regType"
                          label="활성"
                          value="avtive"
                          labelClassName="pl-2 text-base"
                          //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                          //helperText="Notify me for all reminders."

                          // checked
                          checked={data?.status === 'active'}
                        />
                        <Radio
                          name="regType"
                          label="불가"
                          value="inactive"
                          labelClassName="pl-2 text-base"
                          //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                          //helperText="Notify me for all reminders."

                          checked={data?.status == 'inactive'}
                        />
                      </div>
                    </RadioGroup>

                

                  </FormGroup>
                  */}


                        {/*
                          <FormGroup
                            title="상태"
                          >
                            <RadioGroup
                              value={theme ?? siteConfig.mode}
                              setValue={(selectedTheme: any) => {
                                setTheme(selectedTheme);
                              }}
                              className="grid grid-cols-2 gap-4"
                              color="primary"
                            >
                              <RadioBox value={'light'}>
                                <PiSun className="h-[22px] w-[22px]" />
                              </RadioBox>
                              <RadioBox value={'dark'}>
                                <PiMoon className="h-[22px] w-[22px]" />
                              </RadioBox>
                            </RadioGroup>
                          </FormGroup>
                        */}

                  




                    {data?.status == 'Pending' && (
                      
                      <FormGroup
                        title="탈퇴일"
                      >
                        <Text> {data?.updatedAt} </Text>
                      </FormGroup>
                    )}
                

                  </div>



                  <div className="flex justify-center">
                    <button
                      
                      className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-b-md"
                      
                      onClick={() => {
    
                        onSubmit(getValues());

                      }}
                      
                    >
                      <span>신청하기</span>
                    </button>
                  </div>

              </CustomTabPanel>


              {/*
              <CustomTabPanel value={value} index={2}>

                <SettlementInfo id={id} />

              </CustomTabPanel>

              <CustomTabPanel value={value} index={3}>
                
                <DeliveryInfo id={id} />

              </CustomTabPanel>
              */}

            </Box>





            {/*

            <div className="-mx-4 flex items-center justify-around border-b-2 border-b-gray-200 font-medium sm:mx-0 md:justify-start md:gap-8">


              {tabs.map((item) => (
                <button
                  key={item.id}
                  className={cn(
                    'relative pb-4 font-semibold capitalize text-gray-500 focus:outline-none @4xl:pb-5 md:px-4',
                    active === item.id && 'text-gray-1000'
                  )}
                  onClick={() => handleTabClick(item.id)}
                >
                  <span>{item.id}</span>
                  <Badge
                    variant="flat"
                    className="ms-2 border border-gray-300 bg-gray-200 p-0.5 px-1.5"
                  >
                    {item.count}
                  </Badge>
                  {active === 'posts' && item.id === 'posts' && (
                    <span className="absolute inset-x-0 -bottom-0.5 z-10 h-0.5 bg-gray-1000"></span>
                  )}
                </button>
              ))}
            </div>
            <PostFeed />
            */}

          </div>


          
          {/*
          <Modal
            isOpen={open}
            onClose={() => {
              setOpen(false);
              setActive(() => 'posts');
            }}
            overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
            containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
          >
            <div className="flex items-center justify-between pb-2 lg:pb-3">
              <Title
                as="h3"
                className="text-lg font-semibold text-gray-900 xl:text-xl"
              >
                {modalData.title}
              </Title>
              <Button
                variant="text"
                onClick={() => {
                  setOpen(false);
                  setActive(() => 'posts');
                }}
                className="h-auto px-1 py-1"
              >
                <PiXBold className="h-5 w-5 text-base" />
              </Button>
            </div>
            {modalData && <FollowerModal data={modalData.data} />}
          </Modal>
          */}



          {/* modal view */}
          <Modal
            isOpen={open}
            onClose={() => {
              setOpen(false);
              //setActive(() => 'posts');
            }}
            overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
            containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
          >
            <div className="flex flex-col items-center justify-center gap-10 m-5">
                {/*
              <Title
                as="h3"
                className="text-lg font-semibold text-gray-900 xl:text-xl"
              >
                {modalData.title}
              </Title>
            
              <Button
                variant="text"
                onClick={() => {
                  setOpen(false);
                  setActive(() => 'posts');
                }}
                className="h-auto px-1 py-1"
              >
                <PiXBold className="h-5 w-5 text-base" />
              </Button>
              */}

                {modalData.description && (
                  <div className="">
                    <Text
                      as="p"
                      className="text-base font-semibold text-gray-900 xl:text-lg"
                    >
                      {modalData.description}
                    </Text>
                  </div>
                )}

                  {/*
                <Button
                  variant="text"
                  onClick={() => {
                    setOpen(false);
                    setActive(() => 'posts');
                  }}
                  className="h-auto px-1 py-1"
                >
                  <PiXBold className="h-5 w-5 text-base" />
                </Button>
                */}

                {/* close button */}
                <Button
                  size="lg"
                  color="primary"
                  className='flex items-center space-x-2'
                  onClick={() => {
                    setOpen(false);
                    //setActive(() => 'posts');
                  }}
                >
                  Close
                </Button>

              
            </div>

                  {/*
            {modalData && <FollowerModal data={modalData.data} />}
                  */}
          </Modal>
          



        </>
      
        )

    }}
  </Form>

)}







