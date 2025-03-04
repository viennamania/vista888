'use client';

import PageHeader, { PageHeaderTypes } from '@/app/shared/page-header';
import ImportButton from '@/app/shared/import-button';
import ExportButton from '@/app/shared/export-button';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';

import { useRouter } from 'next/navigation';

import { routes } from '@/config/routes';

import { IoCreateOutline } from 'react-icons/io5';


type TableLayoutProps = {
  //data: unknown[];
  //header: string;
  fileName: string;
} & PageHeaderTypes;

export default function TableLayout({
  //data,
  //header,
  fileName,
  children,
  ...props
}: React.PropsWithChildren<TableLayoutProps>) {

  const { push } = useRouter();


  return (
    <>
      <PageHeader {...props}>

        {/*
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton data={data} fileName={fileName} header={header} />
          <ImportButton title={'Import File'} />
        </div>
        */}

        {fileName && (  // fileName이 있으면

          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            엑셀다운로드
          </Button>
          </div>
        
        )}


       
        <Button
          size="lg"
          variant="solid"
          color="primary"
          //size="small"
          //leftIcon={<PiDownloadSimpleBold />}
          onClick={() => {
            //push(routes.user.member);
            //setOpen(true);
            // route to /product/create
            //push(routes.product.create);

            //window.location.href = '/certificate/create';

            push(routes.certificate.create);

          }}

        >
          <IoCreateOutline className="w-6 h-6 mr-2" />
          저작권 등록신청
        </Button>
        

        
      </PageHeader>

      {children}

      <div className='h-40'></div> 

    </>
  );
}
