'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PiXBold } from 'react-icons/pi';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import cn from '@/utils/class-names';
import PostFeed from '@/app/shared/profile/post-feed';
import FollowerModal from '@/app/shared/profile/follower-modal';
import { postData, followersData, followingData } from '@/data/profile-data';

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

import { getColumns } from '@/app/shared-corky/point/columns';


import { useForm, Controller } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';

import dynamic from 'next/dynamic';


import FormGroup from '@/app/shared-corky/form-group';
import { Form } from '@/components/ui/form';


import { Checkbox } from '@/components/ui/checkbox';

const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});




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



export default function AdminDetails() {
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


  return (
    
    <>
      
      <div className=" grid divide-y divide-solid divide-gray-200 border rounded-lg ">

        <FormGroup
          title="아이디"
        >
          <Text>
            superman
          </Text>
        </FormGroup>

        <FormGroup
          title="관리역할"
        >

          <Text>
            영양사
          </Text>

        </FormGroup>


        <FormGroup
          title="담장자명"
        >
          <Text>
            김영양
          </Text>
        </FormGroup>

        <FormGroup
          title="연락처"
        >
          <Text>
            010-1234-5678
          </Text>
        </FormGroup>





      </div>

     



            {/* check box */}

            <div className='mt-10 mb-10 p-5 flex flex-col items-start justify-start gap-5  border rounded-lg '>


              <FormGroup
                title="권한설정"
              >
              </FormGroup>

                <div className=" grid grid-cols-7 items-start justify-start gap-5">

                  <div className='flex flex-col items-start justify-start gap-2  border rounded-lg p-5'>
                    <div>User</div>
                    <Checkbox
                      label="회원"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="Inactive User"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="관리계정관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>피드</div>
                    <Checkbox
                      label="피드관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="피드통계"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>자유게시판</div>
                    <Checkbox
                      label="게시글관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="추천태그관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>설문</div>
                    <Checkbox
                      label="설문관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="설문통계"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>운영</div>
                    <Checkbox
                      label="건강정보"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                    <Checkbox
                      label="유형별가이드"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                    <Checkbox
                      label="공지사항"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                    <Checkbox
                      label="FAQ"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                    <Checkbox
                      label="FAQ분류관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>포인트</div>
                    <Checkbox
                      label="포인트관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="포인트설정"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                  <div className='flex flex-col items-start justify-start gap-2 border rounded-lg p-5'>
                    <div>설정</div>
                    <Checkbox
                      label="식품DB관리"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />

                    <Checkbox
                      label="약관"
                      className="mt-3"
                      labelClassName="text-gray-800"
                      size="lg"
                    />
                  </div>

                </div>

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
