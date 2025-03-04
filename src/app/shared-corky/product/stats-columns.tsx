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
};




export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [

  {
    title: <HeaderCell title="No" />,
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string) => <Text className='text-center'>{value}</Text>,
  },
  {
    title: (
      <HeaderCell
        title="일자"
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
    //render: (value: Date) => <DateCell date={value} />,
    ender: (value: string) => <Text>#{value}</Text>,
  },

  {
    title: <HeaderCell title="홍길동" />,
    dataIndex: 'feedbackCount1',
    key: 'feedbackCount1',
    width: 90,
    render: (value: string) => <Text>{value}</Text>,
  },

  {
    title: <HeaderCell title="김범수" />,
    dataIndex: 'feedbackCount2',
    key: 'feedbackCount2',
    width: 90,
    render: (value: string) => <Text>{value}</Text>,
  },

  {
    title: <HeaderCell title="이수만" />,
    dataIndex: 'feedbackCount3',
    key: 'feedbackCount3',
    width: 90,
    render: (value: string) => <Text>{value}</Text>,
  },

  {
    title: <HeaderCell title="홍서방" />,
    dataIndex: 'feedbackCount4',
    key: 'feedbackCount4',
    width: 90,
    render: (value: string) => <Text>{value}</Text>,
  },

  {
    title: <HeaderCell title="기무라타케시" />,
    dataIndex: 'feedbackCount5',
    key: 'feedbackCount5',
    width: 90,
    render: (value: string) => <Text>{value}</Text>,
  },

  {
    title: <HeaderCell title="정형돈" />,
    dataIndex: 'feedbackCount6',
    key: 'feedbackCount6',
    width: 90,
    render: (value: string) => <Text>{value}</Text>,
  },

  {
    title: <HeaderCell title="박명수" />,
    dataIndex: 'feedbackCount7',
    key: 'feedbackCount7',
    width: 90,
    render: (value: string) => <Text>{value}</Text>,
  },

  {
    title: <HeaderCell title="유재석" />,
    dataIndex: 'feedbackCount8',
    key: 'feedbackCount8',
    width: 90,
    render: (value: string) => <Text>{value}</Text>,
  },

  {
    title: <HeaderCell title="정준하" />,
    dataIndex: 'feedbackCount9',
    key: 'feedbackCount9',
    width: 90,
    render: (value: string) => <Text>{value}</Text>,
  },

  {
    title: <HeaderCell title="노홍철" />,
    dataIndex: 'feedbackCount10',
    key: 'feedbackCount10',
    width: 90,
    render: (value: string) => <Text>{value}</Text>,
  }



  /*

  writer1: '홍길동',
  writer2: '김범수',
  writer3: '이수만',
  writer4: '홍서방',
  writer5: '기무라타케시',
  writer6: '정형돈',
  writer7: '박명수',
  writer8: '유재석',
  writer9: '정준하',
  writer10: '노홍철',
  writer11: '하하',
  writer12: '파이썬',
  writer13: '자바',
  */

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
      <Text className="font-medium text-gray-700">{value}</Text>
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
      <Text className="font-medium text-gray-700">${value}</Text>
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
