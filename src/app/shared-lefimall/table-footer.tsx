'use client';

import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';

import { PiList, PiTray } from 'react-icons/pi';

interface TableFooterProps {
  checkedItems: string[];
  handleDelete: (ids: string[]) => void;
}

export default function TableFooter({
  checkedItems,
  handleDelete,
  children,
}: React.PropsWithChildren<TableFooterProps>) {
  if (checkedItems.length === 0) {
    return null;
  }

  return (
    <div className="sticky bottom-0 left-0 z-10 mt-2.5 flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm dark:border-gray-300 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
      <div className='flex flex-row items-center justify-center gap-5'>
        선택수량:{' '}<Text as="strong">{checkedItems.length}</Text>

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          onClick={() => {
            handleDelete(checkedItems);
          }}
        >
          <PiTray className="me-2 h-4 w-4" />
          선택삭제
        </button>
        
          {/*
        <Button
          size="lg"
          variant="text"
          className="underline"
          color="danger"
          onClick={() => {
            handleDelete(checkedItems);
          }}
        >
          Delete 
        </Button> 
        */}


      </div>
      {children}
    </div>
  );
}
