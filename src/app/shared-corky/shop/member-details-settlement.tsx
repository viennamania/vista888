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


import BasicInfo from '@/app/shared-corky/shop/member-details-basic';
import BusinessInfo from '@/app/shared-corky/shop/member-details-business';


import Uploader from '@/components/corky/upload/uploader'



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
export default function SettlementDetails({
  id,
}: React.PropsWithChildren<ProfileDetailsTypes>) {


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

  const [settlementBank, setSettlementBank] = useState('');
  const [settlementAccount, setSettlementAccount] = useState('');
  const [settlementAccountHolder, setSettlementAccountHolder] = useState('');
  const [settlementAccountImage, setSettlementAccountImage] = useState('');
  const [settlementFeeRate, setSettlementFeeRate] = useState(0);



  const fetchData = async () => {
    setLoading(true);

    const res = await fetch(`/api/corky/shop/getOne?_id=${id}`);

    const data  = await res.json() as any;

    if (!data) {
      return {
        notFound: true,
      };
    }
  

    ///console.log('data.data', data.data)

    setData(data.data);

    setSettlementBank(data.data?.settlementBank);
    setSettlementAccount(data.data?.settlementAccount);
    setSettlementAccountHolder(data.data?.settlementAccountHolder);
    setSettlementAccountImage(data.data?.settlementAccountImage);
    setSettlementFeeRate(data.data?.settlementFeeRate);


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

      const res = await fetch(`/api/corky/shop/updateSettlement?_id=${id}`
      + `&_settlementBank=${settlementBank}`
      + `&_settlementAccount=${settlementAccount}`
      + `&_settlementAccountHolder=${settlementAccountHolder}`
      + `&_settlementAccountImage=${settlementAccountImage}`
      + `&_settlementFeeRate=${settlementFeeRate}`
      );

      const data = await res.json();

      fetchData();

      setOpen(true);
      modalData.description = 'Saved.';

    } catch (err) {
      console.log(err);
    }
  };




  return (
    
    <>

      { loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <div className="w-16 h-16 border-t-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (

        <>

          <div className="flex justify-between  gap-4 @5xl:gap-6  ">
            
            <div>
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
          
            <div className="flex flex-col items-end justify-end gap-3">
              <SaveAll
                title={`저장`}
                description={`저장하시겠습니까?`}
                onSave={() => {
                  saveAll();
                }}
                disabled={disabled}
              />
            </div>
            
          </div>

  
            <div className="mt-5 grid  divide-y divide-solid divide-gray-200 border rounded-lg ">

              <FormGroup
                title="정산수수료"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Input
                    size='lg'
                    //label="Company Name"
                    placeholder="정산수수료"
                    //className="flex-grow "
                    defaultValue={data?.settlementFeeRate}
                    className=' w-20'
                    onChange={(e) => {
                      setSettlementFeeRate(Number(e.target.value));
                    } }
                  /> %
           
                </div> 

              </FormGroup>

              <FormGroup
                title="입금계좌정보"
              >
                <div className='flex flex-col items-start justify-start gap-3'>

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text className=' w-16'>은행명</Text>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="은행명"
                      //className="flex-grow "
                      defaultValue={data?.settlementBank}
                      onChange={(e) => {
                        setSettlementBank(e.target.value);
                      } }
                    />
       
                  </div> 


                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text className=' w-16'>예금주</Text>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="예금주"
                      //className="flex-grow "
                      defaultValue={data?.settlementAccountHolder}
                      onChange={(e) => {
                        setSettlementAccountHolder(e.target.value);
                      } }
                    />

                  </div> 

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text className=' w-16'>계좌번호</Text>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="계좌번호"
                      //className="flex-grow "
                      defaultValue={data?.settlementAccount}
                      onChange={(e) => {
                        setSettlementAccount(e.target.value);
                      } }
                    />

                  </div> 

                  <div className='flex flex-row items-center justify-start gap-3'>
                    {data?.settlementAccountImage?.substring(0,5) === 'https' && (
                      <div className="flex flex-row items-center justify-start gap-3">
                        <Image
                          src={data?.settlementAccountImage }
                          alt={data?.settlementAccount}
                          priority
                          width={200}
                          height={200}
                        />
                      </div>
                    )}

                    <Uploader
                      onSave={(url: string) => {
                        setSettlementAccountImage(url);
                      }}
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

              className="mt-5 min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
            />

          </>

        )}



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
