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


import { Textarea } from '@/components/ui/textarea';


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
        <Box sx={{ p: 3 }}>
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


  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  /* member data from data */
  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    const res = await fetch(`/api/corky/shop/getOne?_id=${id}`);

    const data  = await res.json() as any;

    setData(data.data);

    setLoading(false);

  };

  useEffect(() => {
    fetchData();
  } , [ id ]);

  

  const { theme, setTheme } = useTheme();


  const [shopName, setShopName] = useState(data?.name);

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



  const [contactName, setContactName] = useState(data?.contactName);
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

  const [contactPhone, setContactPhone] = useState(data?.contactPhone);
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

  const [contactEmail, setContactEmail] = useState(data?.contactEmail);
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

  const [introduction, setIntroduction] = useState(data?.introduction);
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




  return (
    
    <>
      <div className=" mt-0 w-full max-w-[1294px]  ">


        <Box sx={{ width: '100%' }}>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="기본정보" {...a11yProps(0)} />
              <Tab label="사업자정보" {...a11yProps(1)} />
              <Tab label="정산" {...a11yProps(2)} />
              <Tab label="배송" {...a11yProps(3)} />
            </Tabs>

          </Box>

          <CustomTabPanel value={value} index={0}>


          { loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <div className="w-16 h-16 border-t-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (

            <>

              <div className="flex  gap-4 @5xl:gap-6  ">


                <div >
                  <Image
                    src={
                      data?.avatar ?? 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-12.webp'
                    }
                    //src={data.avatar}
                    alt="profile-pic"
                    priority
                    width={80}
                    height={80}
                    className="aspect-auto rounded-full "
                  />
                </div>
                <div className="pt-2.5 ">
                  <Title
                    as="h1"
                    className="text-lg font-bold capitalize leading-normal text-gray-900 @3xl:!text-xl 3xl:text-2xl"
                  >
                    {data?.name}
                  </Title>
                  <Text className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base">
                    {data?.contactEmail}
                  </Text>
                </div>

              </div>

              <div className="mt-5 grid divide-y divide-solid divide-gray-200 border  rounded-lg ">

              <FormGroup
                title="입점번호"
              >
                <Text> {data?.id} </Text>
              </FormGroup>

              <FormGroup
                title="가입일시"
              >
                <Text>
                  <DateCell
                    /////date={ new Date(data?.createdAt ) }
                    date={ new Date(data?.createdAt  ) }
                    className='w-fit'
                  />
                </Text>
              </FormGroup>

              <FormGroup
                title="로그인 아이디"
              >
                <Text> {data?.loginid} </Text>
              </FormGroup>


              <FormGroup
                title="Name"
              >
                <div className='flex flex-row items-center justify-start gap-3'>

                  <Text>{data?.name}</Text>

                </div> 

              </FormGroup>



              <FormGroup
                title="담당자명"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text>{data?.contactName}</Text>
                </div> 
              </FormGroup>

              <FormGroup
                title="연락처"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text>{data?.contactPhone}</Text>
                </div> 
              </FormGroup>

              <FormGroup
                title="이메일"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text>{data?.contactEmail}</Text>
                </div> 

              </FormGroup>

              <FormGroup
                title="소개글"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Textarea
                    disabled
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
          

                </div> 

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

            </>

            )}

          </CustomTabPanel>




          <CustomTabPanel value={value} index={1}>

            <div className="mb-5 grid  divide-y divide-solid divide-gray-200 border rounded-lg ">
              {/* 업체명(브랜드명) */}
              <FormGroup
                title="업체명(브랜드명)"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text>  {data?.name}</Text>
                </div>
              </FormGroup>

              {/* 대표자명 */}
              <FormGroup
                title="대표자명"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text> { data?.businessName }</Text>
                </div>
              </FormGroup>

              <FormGroup
                title="업태/종목"
              >
                <div className='flex flex-col items-start justify-start gap-3'>

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> 업태</Text>
                    
                    <Text>
                      {data?.businessType}
                    </Text>
                    
                  </div> 


                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> 종목</Text>
                    
                    <Text>
                      {data?.businessCategory}
                    </Text>
                  </div> 

                </div>

              </FormGroup>



              <FormGroup
                title="사업자번호"
              >
                <div className='flex flex-col items-start justify-start gap-3'>

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> 사업자번호</Text>
                    
                    <Text>
                      {data?.businessRegistrationNumber}
                    </Text>

                  </div> 


                  <div className='flex flex-row items-center justify-start gap-3'>
                    
                    <Text> 사업자등록증사본</Text>
                    
                    <Text>
                      {data?.businessRegistrationNumber}
                    </Text>

                  </div> 

                </div>

              </FormGroup>

              <FormGroup
                title="통신판매신고번호"
              >
                <div className='flex flex-col items-start justify-start gap-3'>

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> 통신판매신고번호</Text>
                    
                    <Text>
                      {data?.mailOrderRegistrationNumber}
                    </Text>
                  </div> 


                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> 통신판매신고증사본</Text>
                    
                    <Text>
                      {data?.mailOrderRegistrationNumber}
                    </Text>
                  </div> 

                </div>

              </FormGroup>


              {/* 사업장주소 */}
              <FormGroup
                title="사업장주소"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text>
                    {data?.businessRegistrationAddress}
                  </Text>
                </div>
              </FormGroup>

              {/* 전화 */}
              <FormGroup
                title="전화"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text>
                    {data?.businessPhone}
                  </Text>
                </div>
              </FormGroup>
                
                {/* 팩스 */}
              <FormGroup

                title="팩스"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text>
                    {data?.businessFax}
                  </Text>
                </div>
              </FormGroup>

              {/* 메모 */}
              <FormGroup
                title="메모"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Textarea
                    disabled
                    size='lg'
                    //label="Company Name"
                    placeholder={data?.meno}
                    //className="flex-grow "
                    defaultValue={data?.meno}
                    onChange={(e) => {
                      ///setIntroduction(e.target.value);
                    } }
                    className='w-full'
                  />
                 

                </div> 

              </FormGroup>






            </div>
            



          </CustomTabPanel>


          <CustomTabPanel value={value} index={2}>

            <div className="mb-5 grid  divide-y divide-solid divide-gray-200 border rounded-lg ">

              <FormGroup
                title="정산수수료"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text>
                    {data?.settlementFeeRate} %
                  </Text>

                </div> 

              </FormGroup>

              <FormGroup
                title="입금계좌정보"
              >
                <div className='flex flex-col items-start justify-start gap-3'>

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text className=' w-16'>은행명</Text>
                    <Text>
                      {data?.settlementBank}
                    </Text>

                  </div> 


                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text className=' w-16'>예금주</Text>
                    <Text>
                      {data?.settlementAccountHolder}
                    </Text>
         

                  </div> 

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text className=' w-16'>계좌번호</Text>
                    <Text>
                      {data?.settlementAccount}
                    </Text>
           

                  </div> 

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text className=' w-16'>계좌사본</Text>
                    <Text>
                      {data?.settlementAccount}
                    </Text>
              

                  </div> 



                </div>

              </FormGroup>


              {/*
              <FormGroup
                title="미정산"
              >
                  <Text className=' font-bold text-right w-20'> 3 </Text>
              </FormGroup>
              <FormGroup
                title="정산완료"
              >
                  <Text className=' font-bold text-right w-20 '> 53 </Text>
              </FormGroup>
              */}
            </div>
            
            <CompletedTableWidget
              title="정산 내역"
              ///variant="minimal"
              variant='modern'
              /////////data={pointData}
              // @ts-ignore
              getColumns={completedGetColumns}
              enablePagination={true}
              pageSize={10}
              enableSearch={false}
              //searchPlaceholder="닉네임, 계정, 휴대폰번호"

              sticky
              scroll={{ x: 600, }}

              className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
            />


          </CustomTabPanel>

          <CustomTabPanel value={value} index={3}>


           <div className="mb-5 grid  divide-y divide-solid divide-gray-200 border rounded-lg ">

              <FormGroup
                title="기본배송비"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text> {data?.fee}</Text>
                  <Input
                    size='lg'
                    //label="Company Name"
                    placeholder="기본배송비"
                    //className="flex-grow "
                    defaultValue={data?.fee}
                    className='text-right '
                  />
                  <SavePopover
                    title={`변경`}
                    description={`변경하시겠습니까?`}
                    onSave={() => {
                      setOpen(true);
                      modalData.description = '변경되었습니다.';
                    }}
                  />
                </div> 

              </FormGroup>

              <FormGroup
                title="도서산간료"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text> {data?.fee}</Text>
                  <Input
                    size='lg'
                    //label="Company Name"
                    placeholder="도서산간료"
                    //className="flex-grow "
                    defaultValue={data?.fee}
                    className='text-right '
                  />
                  <SavePopover
                    title={`변경`}
                    description={`변경하시겠습니까?`}
                    onSave={() => {
                      setOpen(true);
                      modalData.description = '변경되었습니다.';
                    }}
                  />
                </div> 

              </FormGroup>

              <FormGroup
                title="조건부 무료"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Text> {data?.fee}</Text>
                  <Input
                    size='lg'
                    //label="Company Name"
                    placeholder="조건부 무료"
                    //className="flex-grow "
                    defaultValue={data?.fee}
                    className='text-right '
                  /> 원 이상 무료배송
                  <SavePopover
                    title={`변경`}
                    description={`변경하시겠습니까?`}
                    onSave={() => {
                      setOpen(true);
                      modalData.description = '변경되었습니다.';
                    }}
                  />
                </div> 

              </FormGroup>

              <FormGroup
                title="출고지"
              >
                <div className='flex flex-col items-start justify-start gap-3'>

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> {data?.bank?.name}</Text>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="우편번호"
                      //className="flex-grow "
                      defaultValue={data?.bank?.name}
                    />

                  </div> 


                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> {data?.bank?.holder}</Text>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="도로명"
                      //className="flex-grow "
                      defaultValue={data?.bank?.holder}
                    />

                  </div> 

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> {data?.bank?.account}</Text>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="상세주소"
                      //className="flex-grow "
                      defaultValue={data?.bank?.account}
                    />

                  </div> 

                </div>

              </FormGroup>


              <FormGroup
                title="반품/교환지"
              >
                <div className='flex flex-col items-start justify-start gap-3'>

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> {data?.bank?.name}</Text>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="우편번호"
                      //className="flex-grow "
                      defaultValue={data?.bank?.name}
                    />

                  </div> 


                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> {data?.bank?.holder}</Text>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="도로명"
                      //className="flex-grow "
                      defaultValue={data?.bank?.holder}
                    />

                  </div> 

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> {data?.bank?.account}</Text>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="상세주소"
                      //className="flex-grow "
                      defaultValue={data?.bank?.account}
                    />

                  </div> 

                </div>

              </FormGroup>


              {/*
              <FormGroup
                title="미정산"
              >
                  <Text className=' font-bold text-right w-20'> 3 </Text>
              </FormGroup>
              <FormGroup
                title="정산완료"
              >
                  <Text className=' font-bold text-right w-20 '> 53 </Text>
              </FormGroup>
              */}
            </div>
            
            <CompletedTableWidget
              title="배송 내역"
              ///variant="minimal"
              variant='modern'
              /////////data={pointData}
              // @ts-ignore
              getColumns={completedGetColumns}
              enablePagination={true}
              pageSize={10}
              enableSearch={false}
              //searchPlaceholder="닉네임, 계정, 휴대폰번호"

              sticky
              scroll={{ x: 600, }}

              className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
            />



            </CustomTabPanel>




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
  );
}
