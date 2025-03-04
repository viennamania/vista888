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


///import Uploader  from '@/components/corky/upload/uploader'

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
export default function BusinessDetails({
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
  

    ////console.log(data.data);


    
    setData(data.data);

  
    setBusinessName(data.data?.businessName);
    setRepresentativeName(data.data?.representativeName);
    setBusinessType(data.data?.businessType);
    setBusinessCategory(data.data?.businessCategory);
    setBusinessRegistrationNumber(data.data?.businessRegistrationNumber);
    setBusinessRegistrationAddress(data.data?.businessRegistrationAddress);
    setBusinessRegistrationImage(data.data?.businessRegistrationImage);
    setMailOrderRegistrationNumber(data.data?.mailOrderRegistrationNumber);
    setMailOrderRegistrationImage(data.data?.mailOrderRegistrationImage);
    setBusinessPhone(data.data?.businessPhone);
    setBusinessFax(data.data?.businessFax);
    setMemo(data.data?.memo);

    setLoading(false);

  };

  useEffect(() => {
    fetchData();
  } , [ id,  ]);

  

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

      const res = await fetch(`/api/corky/shop/updateBusiness?_id=${id}`
      + `&_businessName=${businessName}&_businessType=${businessType}&_businessCategory=${businessCategory}`
      + `&_representativeName=${representativeName}`
      + `&_businessRegistrationNumber=${businessRegistrationNumber}&_businessRegistrationAddress=${businessRegistrationAddress}&_businessRegistrationImage=${businessRegistrationImage}`
      + `&_mailOrderRegistrationNumber=${mailOrderRegistrationNumber}&_mailOrderRegistrationImage=${mailOrderRegistrationImage}`
      + `&_businessPhone=${businessPhone}`
      + `&_businessFax=${businessFax}&_memo=${memo}`);
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



            <div className="mt-5 grid  divide-y divide-solid divide-gray-200 border rounded-lg ">
              {/* 업체명(브랜드명) */}
              <FormGroup
                title="업체명(브랜드명)"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Input
                    size='lg'
                    //label="Company Name"
                    placeholder="업체명(브랜드명)"
                    //className="flex-grow "
                    defaultValue={
                      businessName
                    }
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                    } }
                  />
                  {/*
                  <SavePopover
                    title={`변경`}
                    description={`변경하시겠습니까?`}
                    onSave={() => {
                      setOpen(true);
                      modalData.description = '변경되었습니다.';
                    }}
                  />
                  */}
                </div>
              </FormGroup>

              {/* 대표자명 */}
              <FormGroup
                title="대표자명"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Input
                    size='lg'
                    //label="Company Name"
                    placeholder="대표자명"
                    //className="flex-grow "
                    defaultValue={representativeName}
                    onChange={(e) => {
                      setRepresentativeName(e.target.value);
                    } }
                  />
                  {/*
                  <SavePopover
                    title={`변경`}
                    description={`변경하시겠습니까?`}
                    onSave={() => {
                      setOpen(true);
                      modalData.description = '변경되었습니다.';
                    }}
                  />
                  */}
                </div>
              </FormGroup>

              <FormGroup
                title="업태/종목"
              >
                <div className='flex flex-col items-start justify-start gap-3'>

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> 업태</Text>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="업태"
                      //className="flex-grow "
                      defaultValue={businessType}
                      onChange={(e) => {
                        setBusinessType(e.target.value);
                      } }
                    />
                    {/*
                    <SavePopover
                      title={`변경`}
                      description={`변경하시겠습니까?`}
                      onSave={() => {
                        setOpen(true);
                        modalData.description = '변경되었습니다.';
                      }}
                    />
                    */}
                  </div> 


                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Text> 종목</Text>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="종목"
                      //className="flex-grow "
                      defaultValue={businessCategory}
                      onChange={(e) => {
                        setBusinessCategory(e.target.value);
                      } }
                    />
                    {/*
                    <SavePopover
                      title={`변경`}
                      description={`변경하시겠습니까?`}
                      onSave={() => {
                        setOpen(true);
                        modalData.description = '변경되었습니다.';
                      }}
                    />
                    */}
                  </div> 

                </div>

              </FormGroup>



              <FormGroup
                title="사업자번호"
              >
                <div className='flex flex-col items-start justify-start gap-3'>

                  <div className='flex flex-row items-center justify-start gap-3'>
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
                    {/*
                    <SavePopover
                      title={`변경`}
                      description={`변경하시겠습니까?`}
                      onSave={() => {
                        setOpen(true);
                        modalData.description = '변경되었습니다.';
                      }}
                    />
                    */}

                  </div> 


                  <div className='flex flex-row items-center justify-start gap-3'>
                    {/*
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="사업자등록증사본"
                      //className="flex-grow "
                      defaultValue={data?.bank?.fileName}

                    />
                    */}
                    {/*
                    <SavePopover
                      title={`변경`}
                      description={`변경하시겠습니까?`}
                      onSave={() => {
                        setOpen(true);
                        modalData.description = '변경되었습니다.';
                      }}
                    />
                    */}
                    { data?.businessRegistrationImage.substring(0,5) === 'https' && (
                      <div className="flex flex-row items-center justify-start gap-3">
                        <Image
                          src={data?.businessRegistrationImage  }
                          //src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-12.webp"
                          alt={data?.businessRegistrationNumber}
                          priority
                          width={200}
                          height={200}
                        />
                      </div>
                    )}

                    <Uploader1
                      onSave={(url: string) => {
                        setBusinessRegistrationImage(url);
                      }}
                    />

                  </div> 

                </div>

              </FormGroup>

              <FormGroup
                title="통신판매신고번호"
              >
                <div className='flex flex-col items-start justify-start gap-3'>

                  <div className='flex flex-row items-center justify-start gap-3'>
                    <Input
                      size='lg'
                      //label="Company Name"
                      placeholder="통신판매신고번호"
                      //className="flex-grow "
                      defaultValue={mailOrderRegistrationNumber}
                      onChange={(e) => {
                        setBusinessRegistrationNumber(e.target.value);
                      } }
                    />
                    {/*
                    <SavePopover
                      title={`변경`}
                      description={`변경하시겠습니까?`}
                      onSave={() => {
                        setOpen(true);
                        modalData.description = '변경되었습니다.';
                      }}
                    />
                    */}

                  </div> 

                  <div className='flex flex-row items-center justify-start gap-3'>

                    {/* check valid url

                    data?.mailOrderRegistrationImage
                    
                    */}
                    
                    


                    { data?.mailOrderRegistrationImage?.substring(0,5) === 'https' && (
                      <div className="flex flex-row items-center justify-start gap-3">
                        <Image
                          src={data?.mailOrderRegistrationImage }
                          //src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-12.webp"
                          alt={data?.mailOrderRegistrationNumber}
                          priority
                          width={200}
                          height={200}
                        />
                      </div>
                    )}

                    <Uploader2
                      onSave={(url: string) => {
                        setMailOrderRegistrationImage(url);
                      }}
                    />
                 
                  </div> 


                </div>

              </FormGroup>


              {/* 사업장주소 */}
              <FormGroup
                title="사업장주소"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
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
                  {/*
                  <SavePopover
                    title={`변경`}
                    description={`변경하시겠습니까?`}
                    onSave={() => {
                      setOpen(true);
                      modalData.description = '변경되었습니다.';
                    }}
                  />
                  */}
                </div>
              </FormGroup>

              {/* 전화 */}
              <FormGroup
                title="전화"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
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
                  {/*
                  <SavePopover
                    title={`변경`}
                    description={`변경하시겠습니까?`}
                    onSave={() => {
                      setOpen(true);
                      modalData.description = '변경되었습니다.';
                    }}
                  />
                  */}
                </div>
              </FormGroup>
                
                {/* 팩스 */}
              <FormGroup

                title="팩스"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
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
                  {/*
                  <SavePopover
                    title={`변경`}
                    description={`변경하시겠습니까?`}
                    onSave={() => {
                      setOpen(true);
                      modalData.description = '변경되었습니다.';

                    }}
                  />
                  */}
                </div>
              </FormGroup>

              {/* 메모 */}
              <FormGroup
                title="메모"
              >
                <div className='flex flex-row items-center justify-start gap-3'>
                  <Textarea
                    size='lg'
                    //label="Company Name"
                    placeholder={memo}
                    //className="flex-grow "
                    defaultValue={memo}
                    onChange={(e) => {
                      setMemo(e.target.value);
                    } }
                    className='w-full'
                  />
                  {/*
                  <SavePopover
                    title={`변경`}
                    description={`변경하시겠습니까?`}
                    onSave={() => {
                      setOpen(true);
                      modalData.description = '변경되었습니다.';
                    }}
                  />
                  */}

                </div> 

              </FormGroup>


            </div>

            
            

        </>

      ) }



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
