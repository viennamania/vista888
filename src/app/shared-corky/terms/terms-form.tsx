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


import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

import { SubmitHandler, Controller } from 'react-hook-form';


import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';



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



const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});





export default function TermsForm() {


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


  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  
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

          <div className=" mt-0 w-full max-w-[1294px]">

          <div className=" flex flex-row items-center justify-end">

            <Button
              type="submit"
              //isLoading={isLoading}
              className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              onClick={() => {
                onSubmit(getValues());
              } }
            >
              Save
            </Button>

          </div>

              
          <div className="mt-5 mb-10 grid divide-y divide-solid divide-gray-200 border rounded-lg ">
            


          <Box sx={{ width: '100%' }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  >
                <Tab label="이용약관" {...a11yProps(0)} />
                <Tab label="개인정보처리방침" {...a11yProps(1)} />
                <Tab label="마케팅정보수신" {...a11yProps(2)} />
                <Tab label="회원탈퇴약관" {...a11yProps(3)} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>

              <div className='mb-10 grid gap-7 divide-y divide-dashed divide-gray-200'>

                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (

                    <QuillEditor
                      //value={value}
                      //onChange={onChange}
                      //value={content}
                      //onChange={setContent}

                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[600px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />

                    
                  )}
                />
                
              </div>

            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>

              <div className='mb-10 grid gap-7 divide-y divide-dashed divide-gray-200'>

                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (

                    <QuillEditor
                      //value={value}
                      //onChange={onChange}
                      //value={content}
                      //onChange={setContent}

                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[600px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />

                    
                  )}
                />

              </div>

            </CustomTabPanel>


            <CustomTabPanel value={value} index={2}>


              <div className='mb-10 grid gap-7 divide-y divide-dashed divide-gray-200'>

                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (

                    <QuillEditor
                      //value={value}
                      //onChange={onChange}
                      //value={content}
                      //onChange={setContent}

                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[600px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />

                    
                  )}
                />

              </div>

            </CustomTabPanel>


            <CustomTabPanel value={value} index={3}>


              <div className='mb-10 grid gap-7 divide-y divide-dashed divide-gray-200'>

                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (

                    <QuillEditor
                      //value={value}
                      //onChange={onChange}
                      //value={content}
                      //onChange={setContent}

                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[600px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />

                    
                  )}
                />

              </div>

            </CustomTabPanel>


          </Box>


          </div>

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
        
      }}
    </Form>

  );

}
