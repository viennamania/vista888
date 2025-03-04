'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

import WidgetCard from '@/components/corky/widget-card';

import { PiMagnifyingGlassBold } from 'react-icons/pi';

import { useColumn } from '@/hooks/use-column';

import ControlledTable from '@/components/controlled-table';

import cn from '@/utils/class-names';

import DateFiled from '@/components/controlled-table/date-field';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';

import { DatePicker } from '@/components/ui/datepicker';


import { Button } from '@/components/ui/button';

import { CiSearch } from "react-icons/ci";

import TableFooter from '@/app/shared/table-footer';

import { exportToCSV } from '@/utils/export-to-csv';


import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';


import { useTable } from '@/hooks/corky/use-table-user';


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



export default function UserTableWidget({

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
  



  const [pageSize, setPageSize] = useState(20);




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
    
    ////////searchTerm,

    handleSort,
    handleDelete,
    
    handleSearch,

    handlePaginate,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,

  } = useTable(data, pageSize);


  const [searchTerm, setSearchTerm] = useState('');





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


  const [value, setValue] = useState('all');

  const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth() - 1, 1 ));
  const [endDate, setEndDate] = useState<Date>(new Date());



  return (

    <WidgetCard
      title={title}
      className={cn('flex flex-col  ', className)}
      headerClassName=" widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      
      {...(enableSearch && {
        action: (


            <div className='flex flex-col items-start justify-center gap-3'>


              <div className='flex flex-wrap items-center justify-start gap-3'>

                <div className='flex flex-row items-center justify-center gap-3'>
                  가입일시
                </div>
              
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}

                  placeholderText=""
                  showFullMonthYearPicker
                  popperPlacement="bottom-end"

                  {...(isMediumScreen && {
                    inputProps: {
                      //label: 'Created Date',
                      //labelClassName: 'text-base font-medium',
                      inputClassName: ' text-base font-medium',
                  },

                  })}
                  className=" w-44 "
                />

                  ~

                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  placeholderText=""
                  showFullMonthYearPicker
                  popperPlacement="bottom-end"
                  
                  {...(isMediumScreen && {
                    inputProps: {
                      //label: 'Created Date',
                      //labelClassName: 'text-base font-medium',
                      inputClassName: ' text-base font-medium',
                  },

                  })}
                  className=" w-44 "
                />





                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  ///onClear={() => handleSearch('')}
                  //onChange={(event) => handleSearch(event.target.value)}
                  ///clearable

                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  } }

                  prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
                />


                <div className='flex flex-row items-center justify-center gap-3'>
                  <Button
                    className="w-24 bg-gray-200 text-black "
                    onClick = {() => {
                      //alert('초기화');
                      console.log('초기화');
                      setSearchTerm('');
                      setStartDate(new Date( new Date().getFullYear(), new Date().getMonth() - 1, 1 ));
                      setEndDate(new Date());
                      handleSearch('');

                    } }
                  >
                    초기화
                  </Button>
                  <Button
                    className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                    onClick = {() => {
                      //alert('Search');
                      console.log('Search');
                      handleSearch(searchTerm);
                    } }
                  >
                    <CiSearch className="me-1.5 h-[17px] w-[17px]" />
                    검색
                  </Button>
                </div>

              </div>


              {/*
              <div className='flex flex-wrap items-center justify-center gap-3'>
                가입유형

                <RadioGroup
                  value={value}
                  //setValue={setValue}

                  setValue={(value) => {
                    //setValue(value);
                    console.log('value', value);
                  } }

                  className="justify-center space-x-4 space-y-4"
                >
                  
                  <div className="divide-slate-300 grid grid-cols-3 xl:flex items-center justify-center gap-5">
                    
                    <Radio
                      name="regType"
                      label="전체"
                      value="all"
                      labelClassName="pl-2  text-base  "
                    />
                    <Radio
                      name="regType"
                      label="이메일"
                      value="email"
                      labelClassName="pl-2 text-base"
                      //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                      //helperText="Notify me for all reminders."
                    />
                    <Radio
                      name="regType"
                      label="카카오톡"
                      value="kakao"
                      labelClassName="pl-2 text-base "
                      //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                      //helperText="Notify me for all reminders."
                    />
                    <Radio
                      name="regType"
                      label="네이버"
                      value="naver"
                      labelClassName="pl-2 text-base "
                      //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                      //helperText="Notify me for all reminders."
                    />
                    <Radio
                      name="regType"
                      label="애플"
                      value="apple"
                      labelClassName="pl-2 text-base "
                      //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                      //helperText="Notify me for all reminders."
                    />
                    <Radio
                      name="regType"
                      label="구글"
                      value="google"
                      labelClassName="pl-2 text-base "
                      //helperClassName="text-gray-500 text-sm mt-3 ms-8"
                      //helperText="Notify me for all reminders."
                    />
                  </div>
                </RadioGroup>

              </div>
              */}

            </div> 

        ),

      })}

    >
      
      <div className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7 ')} >

        {/* total items */}
        <div className=" flex flex-row items-center justify-between mt-10">
          <div className=" text-base ">
            검색결과: 총 {totalItems}건
          </div>
        </div>
        
        <ControlledTable
          showLoadingText={false}
          isLoading={isLoading}
          data={tableData}
          columns={visibleColumns}
          scroll={scroll}
          sticky={sticky}

          
          
          //variant={variant}
          variant='modern'

          className="mt-4 lg:mt-5"

          {...(enablePagination && {
            
            /*
            paginatorOptions: {
              pageSize,
              ...(setPageSize && { setPageSize }),
              total: totalItems,
              current: currentPage,
              onChange: (page: number) => handlePaginate(page),
            },
            */

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

        />
      </div>

    </WidgetCard>
    
  );
}
