'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import TableAvatar from '@/components/ui/avatar-card';

import DateCell from '@/components/ui/date-cell';

import DeletePopover from '@/app/shared/delete-popover';
import { Button } from 'rizzui';

import { Router } from 'next/router';

import Image from 'next/image';


/*
        Nose (코): 빨간색
Right Eye (오른쪽 눈): 보라색
Left Eye (왼쪽 눈): 분홍색
Right Ear (오른쪽 귀): 진한 분홍색
Left Ear (왼쪽 귀): 진한 분홍색
Right Shoulder (오른쪽 어깨): 주황색
Left Shoulder (왼쪽 어깨): 연두색
Right Elbow (오른쪽 팔꿈치): 노란색
Left Elbow (왼쪽 팔꿈치): 연두색
Right Wrist (오른쪽 손목): 연노란색
Left Wrist (왼쪽 손목): 연두색
Right Hip (오른쪽 엉덩이): 청록색
Left Hip (왼쪽 엉덩이): 연두색
Right Knee (오른쪽 무릎): 청록색
Left Knee (왼쪽 무릎): 파란색
Right Ankle (오른쪽 발목): 밝은 청록색
Left Ankle (왼쪽 발목): 파란색


width bar graph from flowing data

Right Eye: 0.8
Left Eye: 0.7
Right Shoulder: 0.6
Left Shoulder: 0.5
Right Elbow: 0.4
Left Elbow: 0.3
Right Wrist: 0.2
Left Wrist: 0.1
Right Hip: 0.9
Left Hip: 0.8
Right Knee: 0.7
Left Knee: 0.6
Right Ankle: 0.5
Left Ankle: 0.4

*/
// horizontal bar graph

//import { BarChart, Bar, ResponsiveContainer } from 'recharts';

import RatingProgressBar from '@/components/rating-progress-bar';



function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}



type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;

  onClickUser: (id: string) => void;
  onClickShop: (id: string) => void;
};


/*
  id: string,
  createdAt: string,
  name: string,
  companyName: string,
  category: string,
  image: string,
  sku: string,
  listPrice: number,
  price: number,
  status: string,
  rating: number[],
  point: number,
  stock: number,
  sales: number,
  inquiry: number,
*/



export const getColumnsUser = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,

  onClickUser,
  onClickShop,
}: Columns) => [

  /*
  {
    title: <HeaderCell title="등록번호" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (value: string) => (
        <Text className='text-center'>{value}</Text>
    ),
  },

  {
    title: (
      <HeaderCell
        title="등록일"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
    render: (value: Date) => <DateCell date={value} className="text-center"/>,
  },
  */

  /*
  {
    title: 
      <div className="flex flex-col items-center justify-center gap-2">
        <HeaderCell title="등록번호" />
        <HeaderCell title="등록일자" />
      </div>
    ,
    dataIndex: 'id',
    key: 'id',
    width: 120,
    render: (_: any, row: any) => (
      <div className='flex flex-col items-center justify-center gap-2'>
        <Text className="text-center text-base xl:text-xl font-bold">#{row.id}</Text>
        <DateCell date={row.createdAt} className="text-center"/>
      </div>
      
    ),
  },
  */
  


  {
    ////title: <HeaderCell title="저작물" />,

    title: 
      <div className="flex flex-col items-center justify-center gap-2">
        <HeaderCell title="등록번호" />
        <HeaderCell title="등록일자" />
        <HeaderCell title="저작물" />
      </div>
    ,

    dataIndex: 'name',
    key: 'name',
    width: 120,
    render: (_: any, row: any) => (


      <div className=" w-28 xl:w-28 flex flex-col items-center justify-center gap-2">
        

        <Text className="text-center text-base xl:text-xl font-bold">#{row.id}</Text>
        <DateCell date={row.createdAt} className="text-center"/>



      {/*
      <Tooltip
        size="sm"
        content={() => {return '등록번호: ' + row?.id}}
        placement="top"
        color="invert"
      >
      */}

        {/*
        <Link
          //href={routes.product.details(row.id)}
          href={`/user/certificate/${row?.id}`}

          className="ps-4 hover:text-gray-900 hover:underline"
        >
          
            <Text className="text-center">{row.name}</Text>
          
        </Link>
        */}

        {/* row?.avatar is imaage or video */}

        {
          row?.avatar?.includes('.mp4') ?
          <video
            className="rounded-md"
            width="200"
            height="200"
            controls

            // full screen control



          >
            <source src={row?.avatar} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          :
          <Image
            src={row?.avatar || '/logo.png'}
            alt="Product Image"
            width={200}
            height={200}
            className="rounded-md"
          />
        }

         {/*
      </Tooltip>
      */}
      
      </div>

      
    ),
  },

  // Homan Detection
  // 성공 / 실패

  {

    title:
    <div className="flex flex-col items-center justify-center gap-2">
      <HeaderCell title="품질평가(사람검출, Human Detection)" />
      <Image
          src="/images/corky/human.png"
          alt="human"
          width={150}
          height={150}
          className="rounded-md"
        />
    </div>,

    dataIndex: 'human',
    key: 'human',
    width : 80,
    render: (_: any, row: any) => (
      <div className="flex flex-col items-center justify-center gap-2">

        <div className="flex items-center justify-center gap-2">
          <RatingProgressBar
            // color
            progressBarClassName='bg-red-500'
            //label={1}
            ratingCount={0.8}
            totalReviews={1}
          />
        </div>

      </div>
    ),
  },

  {
    //title: <HeaderCell title="품질" />,

    title:
    <div className="flex flex-col items-center justify-center gap-2">
      <HeaderCell title="품질평가(자세정보, Body Keypoint)" />
      <Image
          src="/images/corky/openpose.jpeg"
          alt="openpose"
          width={150}
          height={150}
          className="rounded-md"
        />
    </div>,

    dataIndex: 'pose',
    key: 'pose',
    width: 150,
    render: (_: any, row: any) => (
      <div className="flex flex-col items-center justify-center gap-2">


        {/*
        Nose (코): 빨간색
Right Eye (오른쪽 눈): 보라색
Left Eye (왼쪽 눈): 분홍색
Right Ear (오른쪽 귀): 진한 분홍색
Left Ear (왼쪽 귀): 진한 분홍색
Right Shoulder (오른쪽 어깨): 주황색
Left Shoulder (왼쪽 어깨): 연두색
Right Elbow (오른쪽 팔꿈치): 노란색
Left Elbow (왼쪽 팔꿈치): 연두색
Right Wrist (오른쪽 손목): 연노란색
Left Wrist (왼쪽 손목): 연두색
Right Hip (오른쪽 엉덩이): 청록색
Left Hip (왼쪽 엉덩이): 연두색
Right Knee (오른쪽 무릎): 청록색
Left Knee (왼쪽 무릎): 파란색
Right Ankle (오른쪽 발목): 밝은 청록색
Left Ankle (왼쪽 발목): 파란색


width bar graph from flowing data

Right Eye: 0.8
Left Eye: 0.7
Right Shoulder: 0.6
Left Shoulder: 0.5
Right Elbow: 0.4
Left Elbow: 0.3
Right Wrist: 0.2
Left Wrist: 0.1
Right Hip: 0.9
Left Hip: 0.8
Right Knee: 0.7
Left Knee: 0.6
Right Ankle: 0.5
Left Ankle: 0.4


        */}

        <div className="flex flex-col items-start justify-center gap-2">

          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <Text className="w-20">코</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-red-500'
              //label={1}
              ratingCount={0.8}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <Text className="w-20">오른쪽 눈</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-purple-500'
              //label={1}
              ratingCount={0.7}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
            <Text className="w-20">왼쪽 눈</Text>
            <RatingProgressBar

              // color
              progressBarClassName='bg-pink-500'
              //label={1}
              ratingCount={0.6}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-pink-800 rounded-full"></div>
            <Text className="w-20">오른쪽 귀</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-pink-800'
              //label={1}
              ratingCount={0.5}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            <Text className="w-20">왼쪽 귀</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-orange-500'
              //label={1}
              ratingCount={0.4}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-lime-500 rounded-full"></div>
            <Text className="w-20">오른쪽 어깨</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-lime-500'
              //label={1}
              ratingCount={0.3}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <Text className="w-20">왼쪽 어깨</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-yellow-500'
              //label={1}
              ratingCount={0.2}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
            <Text className="w-20">오른쪽 팔꿈치</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-yellow-300'
              //label={1}
              ratingCount={0.1}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
            <Text className="w-20">왼쪽 팔꿈치</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-cyan-500'
              //label={1}
              ratingCount={0.9}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-cyan-300 rounded-full"></div>
            <Text className="w-20">오른쪽 손목</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-cyan-300'
              //label={1}
              ratingCount={0.8}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <Text className="w-20">왼쪽 손목</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-blue-500'
              //label={1}
              ratingCount={0.7}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
            <Text className="w-20">오른쪽 엉덩이</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-blue-300'
              //label={1}
              ratingCount={0.6}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
            <Text className="w-20">왼쪽 엉덩이</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-teal-500'
              //label={1}
              ratingCount={0.5}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-teal-300 rounded-full"></div>
            <Text className="w-20">오른쪽 무릎</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-teal-300'
              //label={1}
              ratingCount={0.4}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
            <Text className="w-20">왼쪽 무릎</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-indigo-500'
              //label={1}
              ratingCount={0.3}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-indigo-300 rounded-full"></div>
            <Text className="w-20">오른쪽 발목</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-indigo-300'
              //label={1}
              ratingCount={0.2}
              totalReviews={1}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
            <Text className="w-20">왼쪽 발목</Text>
            <RatingProgressBar
              // color
              progressBarClassName='bg-blue-300'
              //label={1}
              ratingCount={0.1}
              totalReviews={1}
            />
          </div>










          
         

        </div>


      </div>
    ),
  },



  /*
  {
    title: <HeaderCell title="Merchant" />,
    dataIndex: 'shop',
    key: 'shop',
    width: 100,
    render: (_: string, row: any) => (
      <div className='flex flex-col items-center justify-center gap-2'>
        <Text className="text-center">{row.companyName}</Text>

      </div>
    ),
  },
  */

  /*

  {
    title: <HeaderCell title="저작권리자" />,
    dataIndex: 'shop',
    key: 'shop',
    width: 120,
    render: (_: any, row: any) => (

      
      <div className="flex items-center justify-start ml-5">

        <Tooltip
          size="sm"
          content={() => {return '저작권리자번호: ' + row?.shop?.id}}
          placement="top"
          color="invert"
        >
        <button
          type="button"
          className=' hover:font-bold hover:underline'
          onClick={() => onClickShop(row?.shop?.id)}
        >  
          <TableAvatar
            src={row?.shop?.avatar || '/logo.png'}
            name={row?.shop?.name || 'Corky'}
            //description={row.email}
          />
        </button>

        </Tooltip>
        
      </div>

    ),
  },
  */

  /*
  {
    title: 
      <div className="flex flex-col items-center justify-center gap-2">
        <HeaderCell title="미정산 저작권료" />
        <HeaderCell title="기정산 저작권료" />
      </div>
    ,
    dataIndex: 'listPrice',
    key: 'listPrice',
    width: 120,
    render: (_: any, row: any) => (
      <div className='flex flex-col items-center justify-center gap-2'>
        <Text className="text-center">{
          Number(row?.listPrice).toFixed(0)
        } 원
        </Text>
        <div className="w-full h-1 bg-gray-200"></div>
        <Text className="text-center">{
          Number(row?.price).toFixed(0)
        } 원
        </Text>
      </div>
      
    ),
  },
  */
 

  /*
  {
    title: <HeaderCell title="적립금" />,
    dataIndex: 'point',
    key: 'point',
    width: 80,
    render: (value: string) => (
      <Text className="text-center">{value}</Text>
    ),
  },
  */

  /*
  {
    title:
      <div className="flex flex-col items-center justify-center gap-2">
        <HeaderCell title="신고" />
        <HeaderCell title="분쟁" />
        <HeaderCell title="문의" />
      </div>
    ,

    dataIndex: 'stock',
    key: 'stock',
    width: 80,
    render: (_: any, row: any) => (
      <div className='flex flex-col items-center justify-center gap-2'>
        <Text className="text-center">{row?.stock}</Text>
     
        <div className="w-full h-1 bg-gray-200"></div>
        <Text className="text-center">{row?.sales}</Text>

        <div className="w-full h-1 bg-gray-200"></div>
        <Text className="text-center">{row?.inquiry}</Text>
      </div>
    
    ),
  },
  */
 

  {
    title: <HeaderCell title="등록상태" />,
    dataIndex: 'sales',
    key: 'sales',
    width: 80,
    render: (value: string) => (
      <Text className="text-center">등록완료</Text>
    ),
  },

  // NFT 발행
  // certificate image (certificate.jpg)
  // nft link to opensea site
  // https://opensea.io/assets/matic/0x615cffda9789384089bda01f4d3b465d1f0cfdcd/13
  {
    title: <HeaderCell title="NFT 발행" />,
    dataIndex: 'nft',
    key: 'nft',
    width: 180,
    render: (_: any, row: any) => (
      <div className="flex flex-col items-center justify-center gap-2">


        {/*https://polygonscan.com/token/0x2682057d39ed5f9e1f296aed5ae5f3ab6a8626d2*/}

        <Text className="text-center text-sm">Contract:</Text>
        <Link
          href={`https://polygonscan.com/token/0x2682057d39ed5f9e1f296aed5ae5f3ab6a8626d2`}
          className="text-center text-sm font-bold">0x2682057d39ed5f9e1f296aed5ae5f3ab6a8626d2
        </Link>



        <Text className="text-center text-sm">Content Identifier (CID):</Text>
        <Link
          href={`https://ipfs.io/ipfs/${row.certificateTokenUri?.split("ipfs://")[1]}`}
          className="text-center text-xs font-bold">
          
          {
            // convert form "ipfs://QmfCbYP53GexnhgagrJq8NZtFPEMnFMWiXLNxpbnAaG8Lc/0"
            // to "QmfCbYP53GexnhgagrJq8NZtFPEMnFMWiXLNxpbnAaG8Lc"

            row.certificateTokenUri?.split("ipfs://")[1]

            //row.certificateTokenUri
          }
        </Link>

        <Text className="text-center text-lg font-bold">#{row.tokenId}</Text>
        <Link
          href={`https://opensea.io/assets/matic/0x2682057d39ED5F9E1f296aeD5AE5f3ab6A8626d2/${row.tokenId}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            size="sm"
            variant="outline"
            color="primary"
          >
            NFT
          </Button>
        </Link>
        <Image
          src="/images/corky/certificate.jpg"
          alt="NFT 발행"
          width={150}
          height={150}
          className="rounded-md"
        />
      </div>
    ),
  },

 

   /* STO */
   {
    title: <HeaderCell title="STO Total Supply" />,
    dataIndex: 'sto',
    key: 'sto',
    width: 80,
    render: (_: string, row: any) => (
      <div className='flex flex-col items-center justify-center gap-2'>

        <Text className="text-center text-xl font-bold">10,000</Text>

      </div>
    ),
  },
 



];


export const getWidgetColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: (
      <HeaderCell title="Order ID" className="ps-4 [&>div]:whitespace-nowrap" />
    ),
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string, row: any) => (
      <Link
        href={routes.eCommerce.editOrder(row.id)}
        className="ps-4 hover:text-gray-900 hover:underline"
      >
        #{value}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'customer',
    width: 300,
    hidden: 'customer',
    render: (_: any, row: any) => (
      <TableAvatar
        src={row.avatar}
        name={row.name}
        description={row.email}
      />
    ),
  },
  {
    title: <HeaderCell title="Items" />,
    dataIndex: 'items',
    key: 'items',
    width: 150,
    render: (value: string) => (
      <Text className="">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Price"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value: string) => (
      <Text className="">${value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (createdAt: Date) => <DateCell date={createdAt} />,
  },
  {
    title: (
      <HeaderCell
        title="Modified"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'updatedAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.editOrder(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Order'}
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.orderDetails(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'View Order'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),

  },
];
