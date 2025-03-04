'use client';

/*
import StorageReport from '@/app/shared/file/dashboard/storage-report';
import FileStats from '@/app/shared/file/dashboard/file-stats';
import StorageSummary from '@/app/shared/file/dashboard/storage-summary';
import RecentFiles from '@/app/shared/file/dashboard/recent-files';
import QuickAccess from '@/app/shared/file/dashboard/quick-access';
import ActivityReport from '@/app/shared/file/dashboard/activity-report';
import Members from '@/app/shared/file/dashboard/members';
import FileListTable from '@/app/shared/file/dashboard/file-list/table';
import UpgradeStorage from '@/app/shared/file/dashboard/upgrade-storage';
import RecentActivities from '@/app/shared/file/dashboard/recent-activities';
import { allFilesData } from '@/data/all-files';
*/

import cn from '@/utils/class-names';
import { Title } from '@/components/ui/text';

import MetricCardsWithIcon from './stat-cards';

import UserMetrics from './user-metrics';
import PageViewMetrics from './pageview-metrics';


import Image from 'next/image';

import { routes } from '@/config/routes';
import Link from 'next/link';

import { useSession } from 'next-auth/react';


import ProfileDetails from '@/app/shared-corky/shop/member-details';

import UnderlineShape from '@/components/shape/underline';


import { useState, useEffect } from 'react';



import { A11y, Scrollbar, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
//import SwiperCore, { Navigation } from 'swiper/core';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




function SectionBlock({
  title,
  titleClassName,
  children,
  className,
}: React.PropsWithChildren<{
  title?: string;
  titleClassName?: string;
  className?: string;
}>) {



  return (
    <section className={className}>
      <header className="mb-2.5 lg:mb-3">
        <Title
          as="h5"
          className={cn(
            'mb-2 text-sm font-normal text-gray-700 sm:text-base',
            titleClassName
          )}
        >
          {title}
        </Title>
      </header>

      {children}
    </section>
  );

}




export default function Dashboard() {



  const { data: session } = useSession();


    /* fetch user data from an API
  /api/doingdoit/user/getUser
  */
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    name: "",
    nickname: "",
    avatar: "",
    shopId: "",
  });

  const [loadingUserData, setLoadingUserData] = useState(false);

  console.log('session?.user?.email ->', session?.user?.email);

  useEffect(() => {
    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }

      console.log('session?.user?.email ->', session?.user?.email);

      setLoadingUserData(true);

      const res = await fetch(`/api/corky/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      

      const data = json as any;

      console.log('user data ->', data.data);
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }

      setLoadingUserData(false);
    };

    fetchData();
  } , [session?.user?.email]);




  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);


  // fetch banner data from an API
  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);

      const res = await fetch(`/api/corky/banner/getAllForUser`);
      const json = await res?.json();

      const data = json as any;

      console.log('data ->', data);
      
      if (data.data) {
        setData(data.data);
      } else {
        //alert(json.message);
      }

      setLoading(false);
    };

    fetchData();
  } , []);




  const limit =  4;

  const sliderBreakPoints = {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    /*
    1600: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    */


  };


  /* swiper next and prev button click event handler */
  
  //const [swiper, setSwiper] = useState( null);

  const [swiper, setSwiper] = useState<any>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [propOpacityArray, setPropOpacityArray] = useState([0.25, 1, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]);


  const onSwiper = (swiper : any ) => {
    
    setSwiper(swiper);

  };




  const goNext = () => {
    if (swiper !== null) {
      //swiper.slideNext();
      ///swiper.slideNext();
      
      swiper.slideNext();





      /*
      if (swiper.activeIndex >= limit) {
        swiper.slideTo(0);
      }
      */

      console.log("activeIndex=", swiper.activeIndex);

      setActiveIndex(swiper.activeIndex);
     

      if (swiper.activeIndex === 0) {
        setPropOpacityArray([0.25, 1, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]);
      } else if (swiper.activeIndex === 1) {
        setPropOpacityArray([0.25, 0.25, 1, 1, 0.25, 0.25, 0.25, 0.25, 0.25]);
      } else if (swiper.activeIndex === 2) {
        setPropOpacityArray([0.25, 0.25, 0.25, 1, 1, 0.25, 0.25, 0.25, 0.25]);
      } else if (swiper.activeIndex === 3) {
        setPropOpacityArray([0.25, 0.25, 0.25, 0.25, 1, 1, 0.25, 0.25, 0.25]);
      } else if (swiper.activeIndex === 4) {
        setPropOpacityArray([0.25, 0.25, 0.25, 0.25, 0.25, 1, 1, 0.25, 0.25]);
      }
    





    }
  };
  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();

      console.log("activeIndex=", swiper.activeIndex);

      setActiveIndex(swiper.activeIndex);

      //propOpacityArray[swiper.activeIndex] = 0.25;

      //setPropOpacityArray


      if (swiper.activeIndex === 0) {
        setPropOpacityArray([0.25, 1, 1, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]);
      } else if (swiper.activeIndex === 1) {
        setPropOpacityArray([0.25, 0.25, 1, 1, 0.25, 0.25, 0.25, 0.25, 0.25]);
      } else if (swiper.activeIndex === 2) {
        setPropOpacityArray([0.25, 0.25, 0.25, 1, 1, 0.25, 0.25, 0.25, 0.25]);
      } else if (swiper.activeIndex === 3) {
        setPropOpacityArray([0.25, 0.25, 0.25, 0.25, 1, 1, 0.25, 0.25, 0.25]);
      } else if (swiper.activeIndex === 4) {
        setPropOpacityArray([0.25, 0.25, 0.25, 0.25, 0.25, 1, 1, 0.25, 0.25]);
      }


      /*
      if (swiper.activeIndex <= 0) {
        swiper.slideTo(limit);
      }
      */

    }
  };



  console.log('loadingUserData ->', loadingUserData);

  console.log('userData?.email ->', userData?.email);



  return (
    <div className="mt-2 @container ">


      {/* banner image
        /images/home-banner.png
      */}

      


  
      <div className=" mt-10 xl:mt-28 flex flex-col items-center justify-center gap-5 xl:gap-10">

        <div className="text-xl   xl:text-5xl font-bold text-gray-900">Corky</div>

        <div className="text-base xl:text-2xl font-bold text-gray-900">당신의 안무 저작권을 무료로 등록하세요.</div>

        {/*
        <UnderlineShape />
        */}

      </div>



        {/*
        <div className="mt-10 flex flex-row  gap-5">

          {loading ? (
            <div className=" h-96 w-full flex flex-row items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <div>Loading...</div>
            </div>
          ) : (

            <>
              

            <div className="flex flex-row items-center justify-center gap-2">
              <button
                //onClick={goPrev}
                onClick={goPrev}
                className="flex flex-row items-center justify-center gap-2"
              >
                <div className="text-2xl font-bold text-gray-900">{"<"}</div>
              </button>
            </div>
           

          <Swiper
            // autoplay
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, A11y]}
            ///spaceBetween={24}
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={sliderBreakPoints}
            pagination={{ clickable: true }}
            observer={true}
            //dir="ltr"
            //className="w-full pb-20 "
            onSwiper={onSwiper}
            //autoplay={{ delay: 2500, disableOnInteraction: false }}

            
          >
            {data.map((item: any) => (

              <SwiperSlide
                key={item.id}
                className="pb-10"
              
              >
                
         
                <Link
                  href={routes.product.details(item.product?.id )}
                  className="flex flex-col  items-center justify-center gap-5 border border-gray-200 rounded-lg p-5 
                  hover:border-primary hover:shadow-lg transition-shadow duration-200 ease-in-out
                  ">


                  <div className="relative w-full ">
               
                    
                    <div className="absolute w-full h-full flex flex-col items-center justify-center gap-5 p-5 mt-20">
                      
                      <div className="flex flex-col text-base font-bold text-white bg-black opacity-50 gap-3 p-3 ">                       
                        <div className="text-base font-bold text-white ">
                          {item.product?.name}
                        </div>
                        
                        <div className="text-base font-bold text-white ">
                          {
                            Number(item.product?.price).toLocaleString('ko-KR', {
                              style: 'currency',
                              currency: 'KRW',
                            })
                          }
                        </div>
                      </div>

                    </div>

                    <Image
                      src={item.product?.avatar || "/images/undercontruction.gif"}
                      alt="Logo"
                      width={200}
                      height={200}
                      className="object-contain w-full h-full  "
                    />

                  </div>

                

                </Link>

              </SwiperSlide>

            ))}
          </Swiper>

   
          <div className="flex flex-row items-center justify-center gap-2">
            <button
              //onClick={goNext}
              onClick={goNext}
              className="flex flex-row items-center justify-center gap-2"
            >
              <div className="text-2xl font-bold text-gray-900">{">"}</div>
            </button>
          </div>
  

          </>

          )}

        </div>
        */}
          
    


   




        {/* goto singin */}
        { !loadingUserData && userData?.email === '' && (

          <div className='mt-10 flex flex-col items-center justify-center '>
          
          <div className=" w-40 flex flex-col gap-4 items-center justify-center mb-4 ">
            
            <Link
              href={routes.signIn}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              관리자 로그인
            </Link>

            {/*
            <Link
              href={routes.signInShop}
              className=" w-full flex items-center justify-center gap-2 px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              Merchant Sign In
            </Link>

            <Link
              ///href={routes.signUp}

              href={'/shop/member/apply'}
              className=" w-full flex items-center justify-center gap-2 px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              Merchant Apply
            </Link>
            */}

            <Link
              href={routes.signInUser}
              className=" w-full flex items-center justify-center gap-2 px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              사용자 로그인
            </Link>
          
          </div>

          </div>
        
        )}
          
     
      

    
        

      {/*
      <SectionBlock title={''}  >
        <MetricCardsWithIcon
          className="@2xl:grid-cols-2 @6xl:grid-cols-3 4xl:gap-8 "
        />
      </SectionBlock>

      <UserMetrics className=" mt-10 @4xl:col-span-2 @7xl:col-span-12" />

      <PageViewMetrics className="mt-10 @4xl:col-span-2 @7xl:col-span-12" />
      */}

      
      {/*

      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <StatCards className="grid-cols-1 @xl:grid-cols-2 @4xl:col-span-2 @6xl:grid-cols-4 @7xl:col-span-12" />

        <Acquisition className="@7xl:col-span-4" />

        <DeviceSessions className="@7xl:col-span-4" />

        <TopTrafficSource className="@7xl:col-span-4" />

        <UserMetrics className="@4xl:col-span-2 @7xl:col-span-12" />

        <ConversionRates className="@7xl:col-span-6 @[90rem]:col-span-7 @[112rem]:col-span-8" />

        <GoalAccomplished className="@4xl:col-start-2 @4xl:row-start-3 @7xl:col-span-6 @7xl:col-start-auto @7xl:row-start-auto @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <PageMetrics className="@4xl:col-span-2 @4xl:row-start-5 @7xl:col-span-12 @7xl:row-start-auto @[90rem]:col-span-7 @[112rem]:col-span-8" />

        <AccountRetention className="@7xl:col-span-12 @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <WebsiteMetrics className="@4xl:col-span-2 @7xl:col-span-12" />
      </div>

      */}
       
    </div>
  );
}
