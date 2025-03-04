'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';


import { PiXBold, PiGenderMale, PiGenderFemale } from 'react-icons/pi';


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

import { pointData } from '@/data/lefimall/user/point-data';

import { getColumns } from '@/app/shared-corky/user/point-columns';



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



export type ProfileDetailsTypes = {
  id: string;
};



export default function ProfileDetails({
  id,
}: React.PropsWithChildren<ProfileDetailsTypes>) {



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
    const [data, setData] = useState(memberData[0]);


    useEffect(() => {
      memberData.find((item) => {
        if (item.id === id) {
          setData(item);
        }
      });
    } , [ id ]);

  



  return (
    
    <>
      <div className=" mt-0 w-full max-w-[1294px]  ">


        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="기본정보" {...a11yProps(0)} />
              <Tab label="포인트" {...a11yProps(1)} />
              <Tab label="쿠폰" {...a11yProps(2)} />
              <Tab label="활동정보" {...a11yProps(3)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>

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
                  {data.name}
                </Title>
                <Text className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base">
                  {data.email}
                </Text>

              </div>

              </div>



            {/*
            view data

            가입일시: createdAt
            가입유형: regType
            이메일: email
            닉네임: name
            성별: gender
            휴대폰: mobile
            생년월일: birthDate
            몸무게: weight
            키: height
            식단기록 목적: purpose
            마케팅 수신동의: marketingAgree

            from data
            */}

            {/*
            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 ">
            */}


            <div className="mt-5 grid divide-y divide-solid divide-gray-200 border  rounded-lg ">



              <FormGroup
                title="회원번호"
              >
                <Text> {data?.id} </Text>
              </FormGroup>

              <FormGroup
                title="가입일시"
              >
                < DateCell
                  date={ new Date(data?.createdAt) }
                  className='w-fit'
                />
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
                {(data.gender=='남' ? ( // man
                  <div className='flex flex-row items-center justify-start gap-3'>
                    <PiGenderMale className='h-5 w-5' />
                    <Text className="font-medium text-gray-700">{data?.gender}</Text>
                  </div>
                  ) : (data.gender=='여') ? (
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
                            
              <FormGroup
                title="관심사"
              >
                <Text>  </Text>
              </FormGroup>
              

              {/*
              <FormGroup
                title="생년월일"
              >
                <Text> {data?.birthDate } </Text>
              </FormGroup>
              */}



              <FormGroup
                title="마케팅 수신동의"
              >
                <Text>
                  {data.marketingAgree == 'Y' ? (
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

              {data.status == 'Pending' && (
                
                <FormGroup
                  title="탈퇴일"
                >
                  <Text> {data.updatedAt} </Text>
                </FormGroup>
              )}


              <FormGroup
                title="로그인 제재"
              >
                <Text>
                  {data.marketingAgree == 'Y' ? (
                    <Badge variant="solid" color="success">
                      활성
                    </Badge>
                  ) : (
                    <Badge variant="solid" color="danger">
                      불가
                    </Badge>
                  )}
                </Text>
              </FormGroup>

              {data.status == 'Pending' && (
                
                <FormGroup
                  title="탈퇴일"
                >
                  <Text> {data.updatedAt} </Text>
                </FormGroup>
              )}



            </div>

            </>

          </CustomTabPanel>




          <CustomTabPanel value={value} index={1}>

            <div className="mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">
              <FormGroup
                title="보유 포인트"
              >
                  <Text className='text-3xl font-bold text-right w-36'> 6,760P </Text>
              </FormGroup>
              <FormGroup
                title="사용완료 포인트"
              >
                  <Text className='text-3xl font-bold text-right w-36 '> 560P </Text>
              </FormGroup>
            </div>
            
            <PointTableWidget
              title="포인트 내역"
              ///variant="minimal"
              variant='modern'
              data={pointData}
              // @ts-ignore
              getColumns={getColumns}
              enablePagination={true}
              pageSize={10}
              enableSearch={false}
              //searchPlaceholder="닉네임, 계정, 휴대폰번호"

              className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
            />


          </CustomTabPanel>


          <CustomTabPanel value={value} index={2}>

            <div className="mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">
              <FormGroup
                title="보유 쿠폰"
              >
                  <Text className='text-3xl font-bold'> 43 </Text>
              </FormGroup>
            </div>
            
            <PointTableWidget
              title="쿠폰 내역"
              ///variant="minimal"
              variant='modern'
              data={pointData}
              // @ts-ignore
              getColumns={getColumns}
              enablePagination={true}
              pageSize={10}
              enableSearch={false}
              //searchPlaceholder="닉네임, 계정, 휴대폰번호"

              className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
            />


          </CustomTabPanel>

          <CustomTabPanel value={value} index={3}>

            <PointTableWidget
              title="활동내역"
              ///variant="minimal"
              variant='modern'
              data={pointData}
              // @ts-ignore
              getColumns={getColumns}
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
