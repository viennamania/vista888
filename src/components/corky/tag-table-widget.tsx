'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import WidgetCard from '@/components/corky/widget-card';

import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import cn from '@/utils/class-names';

import DateFiled from '@/components/controlled-table/date-field';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';

import { Button } from '@/components/ui/button';

import { CiSearch } from "react-icons/ci";

import TableFooter from '@/app/shared/table-footer';

import { exportToCSV } from '@/utils/export-to-csv';




type ColumnTypes = {
  data?: any[];
  sortConfig?: any;
  checkedItems?: string[];
  handleSelectAll?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

type BasicTableWidgetProps = {
  title?: React.ReactNode;
  className?: string;
  pageSize?: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  
  getColumns: ({
    data,
    sortConfig,
    checkedItems,
    handleSelectAll,
    onDeleteItem,
    onHeaderCellClick,
    onChecked,
  }: ColumnTypes) => any;

  data: any[];
  enablePagination?: boolean;
  variant?: 'modern' | 'minimal' | 'classic' | 'elegant' | 'retro';
  enableSearch?: boolean;
  paginatorClassName?: string;
  searchPlaceholder?: string;
  noGutter?: boolean;
  scroll?: {
    x?: number;
    y?: number;
  };
  sticky?: boolean;
};


type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};



export default function BasicTableWidget({
  title,
  data = [],
  getColumns,
  
  //pageSize = 7,

  //setPageSize,
  enablePagination,
  variant = 'modern',
  enableSearch = true,
  paginatorClassName,
  noGutter,
  sticky,
  scroll = { x: 1300 },
  className,
  searchPlaceholder = 'Search...',
}: BasicTableWidgetProps) {


  const [pageSize, setPageSize] = useState(10);




  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    handleDelete(id);
  };

  const {
    isLoading,
    sortConfig,
    totalItems,
    tableData,
    currentPage,
    searchTerm,
    handleSort,
    handleDelete,
    handleSearch,
    handlePaginate,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,

  } = useTable(data, pageSize);



  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        onHeaderCellClick,
        onDeleteItem,
        checkedItems: selectedRowKeys,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns } = useColumn(columns);

 
  const isMediumScreen = true;




  return (

    <WidgetCard
      title={title}
      className={cn('flex flex-col', className)}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      {...(enableSearch && {
        action: (
          <div className='flex flex-wrap items-center justify-center gap-3'>

            <DateFiled
              //selected={getDateRangeStateValues(filters['createdAt'][0])}
              //startDate={getDateRangeStateValues(filters['createdAt'][0])}
              //endDate={getDateRangeStateValues(filters['createdAt'][1])}
              
              onChange={(date: any) => {
                /////updateFilter('createdAt', date);
              }}

              placeholderText=""

              {...(isMediumScreen && {
                inputProps: {
                  //label: 'Created Date',
                  labelClassName: 'font-medium text-gray-700',
              },

              })}
            />

              ~

            <DateFiled
              //selected={getDateRangeStateValues(filters['createdAt'][0])}
              //startDate={getDateRangeStateValues(filters['createdAt'][0])}
              //endDate={getDateRangeStateValues(filters['createdAt'][1])}
              onChange={(date: any) => {
                /////updateFilter('createdAt', date);
              }}
              placeholderText=""
              {...(isMediumScreen && {
                inputProps: {
                  //label: 'Created Date',
                  labelClassName: 'font-medium text-gray-700',
              },

              })}
            />



            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onClear={() => handleSearch('')}
              onChange={(event) => handleSearch(event.target.value)}
              clearable
              prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
            />
      

            <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
              <CiSearch className="me-1.5 h-[17px] w-[17px]" />
              검색
            </Button>

          </div>

        ),
      })}
    >
      
      
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7')}
      >
        
        <ControlledTable
          showLoadingText={false}
          isLoading={isLoading}
          data={tableData}
          columns={visibleColumns}
          scroll={scroll}
          sticky={sticky}

          ///variant={variant}
          variant='modern'

          //className="mt-4  "

          {...(enablePagination && {
            
            
      
            
            paginatorOptions: {
              pageSize,
              setPageSize,
              total: totalItems,
              current: currentPage,
              onChange: (page: number) => handlePaginate(page),
            },


            paginatorClassName: cn(
              'mt-4 lg:mt-5',
              noGutter && 'px-5 lg:px-7',
              paginatorClassName
            ),
          })}

          className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"

        />
        


      </div>
      



    </WidgetCard>
    
  );
}
