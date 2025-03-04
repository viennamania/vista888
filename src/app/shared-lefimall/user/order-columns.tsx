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

  onClickProduct: (id: string) => void;
};


/*
  
  id: string;
  createdAt: Date;
  amount: string;
  status: string;


  product {
    id: string;
    name: string;
    companyName: string;
    price: number;
  }

  order {
    id: string;
    name: string;
    userName: string;
  }

  delivery {
    id: string;
    name: string;
    userName: string;
    address: string;
    fee: number;
    
  }

  payment {
    id: string;
    name: string;
    userName: string;
    amount: number;
    status: string;
  }
*/



export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,

  onClickUser,
  onClickShop,
  onClickProduct,
}: Columns) => [


  {
    title: (
      <div className="flex flex-col items-center justify-center">
        <HeaderCell
          title="Order Created At"
        />
        <HeaderCell
          title="Order ID"
        />
      </div>

    ),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    render: (_: string, row: any) => (
      <div className="flex flex-col gap-2 items-center justify-center  ">
        <DateCell date={row?.createdAt} className='w-fit' />
        {/* horizontal line */}
        <div className="border-b border-gray-200 dark:border-gray-700 w-full"></div>
        <Text className="text-center">{row.id}</Text>
      </div>
    ),
  },




  /* 회원야이디, 주문자명, 수령자명 */
  {
    title: (
      <div className="flex flex-col items-center justify-center">
        <HeaderCell
          title="주문자명"
        />
        <HeaderCell
          title="수령자명"
        />
      </div>
    ),
    dataIndex: 'order',
    key: 'order',
    width: 150,
    render: (_: string, row: any) => (
      <div className="flex flex-col gap-2 items-center justify-center">
        <Text className="text-center">{row?.order?.name}</Text>
        <div className="border-b border-gray-200 dark:border-gray-700 w-full"></div>
        <Text className="text-center">{row?.delivery?.name}</Text>
      </div>
    ),
  },
  
  /* Name, 상품명 */
  {
    title: (
      <div className="flex flex-col items-center justify-center">
        <HeaderCell
          title="Name"
        />
        <HeaderCell
          title="상품명"
        />
      </div>
    ),
    dataIndex: 'product',
    key: 'product',
    width: 150,
    render: (_: string, row: any) => (
      <div className="flex flex-col gap-2 ">
        <button
          type="button"
          className=' hover:font-bold hover:underline'
          onClick={() => onClickShop(row?.product?.companyId)}
        >  
        <Text className="text-center ">{row?.product?.companyName}</Text>
        </button>

        <div className="border-b border-gray-200 dark:border-gray-700 w-full"></div>
        <button
          type="button"
          className=' hover:font-bold hover:underline'
          onClick={() => onClickProduct(row?.product?.id)}
        >  
          <Text className="text-center">{row?.product?.name}</Text>
        </button>
      </div>
    ),
  },

  /* 주문수량 */
  {
    title: (
      <HeaderCell
        title="주문(옵션)수량"
      />
    ),
    dataIndex: 'amount',
    key: 'amount',
    width: 80,
    render: (value: string) => (
      <div className="flex flex-col gap-2 ">
        <Text className="text-center">{value}</Text>
        <div className="border-b border-gray-200 dark:border-gray-700 w-full"></div>
        <Text className="text-center">옵션2</Text>
      </div>
    ),
  },

  /* 배송지 */
  {
    title: (
      <HeaderCell
        title="배송지"
      />
    ),
    dataIndex: 'delivery',
    key: 'delivery',
    width: 150,
    render: (_: string, row: any) => (
      <div className="flex flex-col">
        <Text className="text-center">{row?.delivery?.address}</Text>
      </div>
    ),
  },

  /* 배송비 */
  {
    title: (
      <HeaderCell
        title="배송비"
      />
    ),
    dataIndex: 'delivery',
    key: 'delivery',
    width: 80,
    render: (_: string, row: any) => (
      <Text className="text-center">{row?.delivery?.fee} 원</Text>
    ),
  },

  /* 주문총액 */
  {
    title: (
      <HeaderCell
        title="주문총액"
      />
    ),
    dataIndex: 'amount',
    key: 'amount',
    width: 80,
    render: (value: string) => (
      <Text className="text-center">{value} 원</Text>
    ),
  },
  




  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 80,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        {/*
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
       
        <DeletePopover
          title={`Delete`}
          description={`${row.id}번 글을 Are you sure you want to delete?`}
          onDelete={() => onDeleteItem(row.id)}
        />
         */}

        <Tooltip
          size="sm"
          content={() => '상세보기'}
          placement="top"
          color="invert"
        >
          <Link href={routes.order.details(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'상세보기'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>



        
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
        {value}
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
