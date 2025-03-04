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


import OrderTableWidget from '@/components/corky/order-table-widget';

import { getColumns as orderGetColumns } from '@/app/shared-corky/user/order-columns';



import { memberData } from '@/data/lefimall/user/member-data';

import FormGroup from '@/app/shared-corky/form-group';

import { Form } from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import DateCell from '@/components/ui/date-cell';



import BasicTableWidget from '@/components/corky/basic-table-widget';

import {
  data as surveyData,
} from '@/data/lefimall/survey/data';


import {
  getColumns as getSurveyColumns,
} from '@/app/shared-corky/profile/survey-columns';


import {
  data as feedData,
} from '@/data/lefimall/feed/data';


import {
  getColumns as getFeedColumns,
} from '@/app/shared-corky/profile/feed-columns';


import Image from 'next/image';


import { AdvancedRadio } from '@/components/ui/advanced-radio';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';

import { siteConfig } from '@/config/site.config';




import { PiXBold, PiGenderMale, PiGenderFemale, PiSun, PiMoon } from 'react-icons/pi';


import { useTheme } from 'next-themes';
import { set } from 'lodash';


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
  const [modalData, setModalData] = useState({
    title: 'Followers',
    data: followersData,
  });
  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    setOpen(() => false);
  }, [pathname]);

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


  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  /* member data from data */
  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(false);


  useEffect(() => {


    const fetchData = async () => {
      setLoading(true);

      const res = await fetch(`/api/corky/user/getUser?_id=${id}`);

      const data  = await res.json() as any;

      console.log('data.ㅇㅁㅅㅁ ->', data.data);

      setData(data.data);

      setLoading(false);

    };

    fetchData();
  } , [ id ]);

  

  const { theme, setTheme } = useTheme();


  return (
    
    <>
      <div className=" mt-0 w-full max-w-[1294px]  ">


        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="기본정보" {...a11yProps(0)} />
              <Tab label="포인트" {...a11yProps(1)} />
              <Tab label="쿠폰" {...a11yProps(2)} />
              <Tab label="주문" {...a11yProps(3)} />
              <Tab label="활동정보" {...a11yProps(4)} />
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
                    {data?.email}
                  </Text>

                </div>

              </div>




              <div className="mt-5 grid divide-y divide-solid divide-gray-200 border  rounded-lg ">



              <FormGroup
                title="회원번호"
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
                title="가입유형"
              >
                <Text> {data?.regType} </Text>
              </FormGroup>


              <FormGroup
                title="이메일"
              >
                <Text> {data?.email} </Text>
              </FormGroup>

              {/* 비밀번호 변경 */}
              <FormGroup
                title="비밀번호 변경"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Input
                    type="text"
                    placeholder="비밀번호"
                    className="flex-grow "
                    
                  />
                  <Button
                    variant="solid"
                    color="primary"
                    className="flex-grow"
                    onClick={() => { 
                      // modal open
                      //setOpen(true);
                      

                    } }
                  >
                    변경
                  </Button>
                </div>
              </FormGroup>

              <FormGroup
                title="이름"
              >
                <Text> {data?.name} </Text>
              </FormGroup>

              <FormGroup
                title="닉네임"
              >
                <Text> {data?.nickname} </Text>
              </FormGroup>

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
                title="휴대폰"
              >
                <Text> {data?.mobile} </Text>
              </FormGroup>
                            
              {/*
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
              */}
              

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

                      // seleted
                      checked={data?.status === 'active' ? true : false}
                    />
                    <Radio
                      name="regType"
                      label="불가"
                      value="inactive"
                      labelClassName="pl-2 text-base"
                      //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                      //helperText="Notify me for all reminders."

                      checked={data?.status == 'inactive' ? true : false}
                    />
                  </div>
                </RadioGroup>

             


              </FormGroup>


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
              <FormGroup
                title="보유 포인트"
              >
                  <Text className=' font-bold text-right w-20'> 6,760P </Text>
              </FormGroup>
              <FormGroup
                title="사용완료 포인트"
              >
                  <Text className=' font-bold text-right w-20 '> 560P </Text>
              </FormGroup>
            </div>
            
            <PointTableWidget
              title="포인트 내역"
              ///variant="minimal"
              variant='modern'
              /////////////data={pointData}
              // @ts-ignore
              getColumns={pointGetColumns}
              enablePagination={true}
              pageSize={10}
              enableSearch={false}
              //searchPlaceholder="닉네임, 계정, 휴대폰번호"
              sticky={true}
              scroll={{ x: 600, }}
              

              className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
            />


          </CustomTabPanel>


          <CustomTabPanel value={value} index={2}>

            <div className="mb-5 grid divide-y divide-solid divide-gray-200 border rounded-lg ">
              <FormGroup
                title="보유 쿠폰"
              >
                  <Text className='font-bold'> 43 </Text>
              </FormGroup>
            </div>
            
            <CouponTableWidget
              title="쿠폰 내역"
              ///variant="minimal"
              variant='modern'
              /////////data={pointData}
              // @ts-ignore
              getColumns={couponGetColumns}
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

            <OrderTableWidget
              title="주문내역"
              ///variant="minimal"
              variant='modern'
              ////////data={pointData}
              // @ts-ignore
              getColumns={orderGetColumns}
              enablePagination={true}
              pageSize={10}
              enableSearch={false}
              //searchPlaceholder="닉네임, 계정, 휴대폰번호"
              sticky={true}
              scroll={{ x: 600, }}

              className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
            />


          </CustomTabPanel>

          <CustomTabPanel value={value} index={4}>

            <PointTableWidget
              title="활동내역"
              ///variant="minimal"
              variant='modern'
              ////////data={pointData}
              // @ts-ignore
              getColumns={pointGetColumns}
              enablePagination={true}
              pageSize={10}
              enableSearch={false}
              //searchPlaceholder="닉네임, 계정, 휴대폰번호"

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
    </>
  );
}
