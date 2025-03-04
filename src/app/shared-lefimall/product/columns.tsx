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



export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,

  onClickUser,
  onClickShop,
}: Columns) => [

  {
    title: <HeaderCell title="No" />,
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


  {
    title: <HeaderCell title="상품명" />,
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (_: any, row: any) => (


      <Tooltip
        size="sm"
        content={() => {return '상품번호: ' + row?.id}}
        placement="top"
        color="invert"
      >
      <div className="flex flex-row gap-2 items-center justify-start">

        <Image
          src={row.avatar}
          alt="Product Image"
          width={80}
          height={80}
          className="rounded-md"
        />
        
        <Link
          href={routes.product.details(row.id)}
          className="ps-4 hover:text-gray-900 hover:underline"
        >
          
            <Text className="text-center">{row.name}</Text>
          
        </Link>


      
      </div>
      </Tooltip>
      
    ),
  },



  {
    title: <HeaderCell title="Merchant" />,
    dataIndex: 'shop',
    key: 'shop',
    width: 100,
    render: (_: any, row: any) => (

      
      <div className="flex items-center justify-start ml-5">

        <Tooltip
          size="sm"
          content={() => {return '입점번호: ' + row?.shop?.id}}
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
            name={row?.shop?.name || 'Merchant'}
            //description={row.email}
          />
        </button>

        </Tooltip>
        
      </div>

    ),
  },


  {
    title: 
      <div className="flex flex-col items-center justify-center gap-2">
        <HeaderCell title="정상가" />
        <HeaderCell title="판매가(할인가)" />
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
        {/* line */}
        <div className="w-full h-1 bg-gray-200"></div>
        <Text className="text-center">{
          Number(row?.price).toFixed(0)
        } 원
        </Text>
      </div>
      
    ),
  },

 


  {
    title: <HeaderCell title="적립금" />,
    dataIndex: 'point',
    key: 'point',
    width: 80,
    render: (value: string) => (
      <Text className="text-center">{value}</Text>
    ),
  },

  {
    title:
      <div className="flex flex-col items-center justify-center gap-2">
        <HeaderCell title="재고" />
        <HeaderCell title="판매" />
        <HeaderCell title="문의" />
      </div>
    ,

    dataIndex: 'stock',
    key: 'stock',
    width: 80,
    render: (_: any, row: any) => (
      <div className='flex flex-col items-center justify-center gap-2'>
        <Text className="text-center">{row?.stock}</Text>
        {/* line */}
        <div className="w-full h-1 bg-gray-200"></div>
        <Text className="text-center">{row?.sales}</Text>
        {/* line */}
        <div className="w-full h-1 bg-gray-200"></div>
        <Text className="text-center">{row?.inquiry}</Text>
      </div>
    
    ),
  },
 

  {
    title: <HeaderCell title="판매여부" />,
    dataIndex: 'sales',
    key: 'sales',
    width: 80,
    render: (value: string) => (
      <Text className="text-center">정상판매</Text>
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
