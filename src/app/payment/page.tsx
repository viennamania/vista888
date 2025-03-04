'use client';


//import MultiStepFormOne from '@/app/shared/multi-step/multi-step-1';
import { metaObject } from '@/config/site.config';


// get params from url

import { useSearchParams } from 'next/navigation';


import { use, useEffect, useState } from 'react';

import { useQRCode } from 'next-qrcode';
import { set } from 'lodash';

import toast from 'react-hot-toast';



// ?storecode=2000001&memberid=creath.park@gmail.com

//export const metadata = {
//  ...metaObject('Payment'),
//};

export default function PaymentFormPage() {
  ///return <MultiStepFormOne />;


  const searchParams = useSearchParams();

  const storecode = searchParams.get('storecode') || '';
  const memberid = searchParams.get('memberid') || '';

  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {

    if (storecode && memberid) {

      const userid = memberid + '@' + storecode;

      console.log('userid: ' + userid);

      fetch('/api/cryptopay/user/create?userid=' + userid)
        .then((response) => response.json())
        .then((data : any) => {
          console.log(data);
          setWalletAddress(data.data);
        });
  
    }

  } , [storecode, memberid]);

  console.log('walletAddress: ' + walletAddress);


  const { Canvas } = useQRCode();




  // /api/erc20/transfer?userid

  const [transferArray, setTransferArray] = useState([]);

  useEffect(() => {


    if (storecode && memberid) {

      fetch('/api/cryptopay/erc20/transfer?storecode=' + storecode + '&memberid=' + memberid)
        .then((response) => response.json())
        .then((data : any) => {
          //console.log(data);
          setTransferArray(data.data);
        });
  
    }

    // reload the data from the server every 5 seconds

    const interval = setInterval(() => {

      if (storecode && memberid) {

        fetch('/api/cryptopay/erc20/transfer?storecode=' + storecode + '&memberid=' + memberid)
          .then((response) => response.json())
          .then((data : any) => {
            
            console.log(data);


            setTransferArray(data?.data);

          });
    
      }

    }, 5000);

    return () => clearInterval(interval);


  
  } , [storecode, memberid]);




  const [balance, setBalance] = useState(0);

  useEffect(() => {



    if (storecode && memberid) {

      fetch('/api/cryptopay/user/getBalance?userid=' + memberid + '@' + storecode)
        .then((response) => response.json())
        .then((data : any) => {
          console.log(data);
          setBalance(data.data.balance);
        });
  
    }


    const interval = setInterval(() => {
        
        if (storecode && memberid) {
  
          fetch('/api/cryptopay/user/getBalance?userid=' + memberid + '@' + storecode)
            .then((response) => response.json())
            .then((data : any) => {
              console.log(data);
              setBalance(data.data.balance);
            });
      
        }
  
    } , 5000);



  } , [storecode, memberid]);


  console.log('balance: ' + balance);





  const [loading, setLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  // loading is true when 30 seconds have passed
  // loadingCount is the number of times seconds have passed

  useEffect(() => {
      
      const interval = setInterval(() => {

        setLoadingCount(loadingCount + 1);

        if (loadingCount === 10) {
          setLoading(false);
        }

      }, 1000);


      return () => clearInterval(interval);

  } , [loadingCount]);



  useEffect(() => {

    if (balance > 0) {

      setLoading(true);
      setLoadingCount(0);

    }

  } , [balance]);


  return (
    <div className=" max-w-md min-h-screen bg-gray-100
      flex flex-col items-center justify-start gap-3 p-2 border-2 border-white rounded-3xl">
      <h1>Payment Form</h1>



      <div className="bg-orange-100 rounded-lg p-4 max-w-md">
        <div className="flex items-start space-x-3">
          <div className="bg-orange-400 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">This is a static wallet</h2>
            <p className="mt-1 text-sm text-gray-700">You can pay this bill as many times as you want, for different amounts.</p>
          </div>
        </div>
      </div>

      <div className='bg-gray-100 p-4 rounded-lg max-w-md'>
        <h2 className='text-xl font-bold mb-2'>Cryptocurrency transfer</h2>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-sm text-gray-600'>Currency</p>
            <p className='font-semibold'>USDT</p>
          </div>
          <div className='text-right'>
            <p className='text-sm text-gray-600'>Network</p>
            <p className='font-semibold'>Polygon</p>
          </div>
        </div>
      </div>



      <div className="flex flex-col gap-2">
        {/*
        <label className="text-white">Store Code</label>
        <input type="text" value={storecode} readOnly />

        <label className="text-white">Member ID</label>

        <input type="text" value={memberid} readOnly />

        <label className="text-white">Wallet Address</label>

        <input type="text" value={walletAddress} readOnly />
        */}

        <div className='grid grid-cols-1 gap-2 w-96'>

          {/*
          <div className="flex flex-col gap-2">
            <label className="text-white">Store Code</label>
            <input type="text" value={storecode} readOnly />
          </div>
          */}

          <div className="flex flex-row gap-2">
            <label className="text-xl font-bold">Member ID</label>
            <input
              className='bg-gray-200 p-2 rounded-md text-xs'
              type="text" value={memberid} readOnly />

            {/* storecode logo image is /logo-2000001.png */}
            {/* new window to open the store */}
            {/* logo_2000001.png : https://vienna-mania.vercel.app/ */}
            {/* logo_2000002.png : https://gopoker.vercel.app/*/}

            <a href={'https://vienna-mania.vercel.app/'} target='_blank' className='ml-5' >
              <img src={'/logo-' + storecode + '.png'} className='w-8 h-8' />
            </a>


          </div>
        
        </div>

        <div className='grid grid-cols-1 gap-2 mt-5'>

          <div className="flex flex-col gap-2">
            {/* mkae ' to escape character */}
            <label className="text-xl font-bold">Recipient&apos;s Wallet Address</label>
            <div className='flex flex-row gap-2'>
              <input
                className='bg-gray-200 p-2 rounded-md text-xs w-80 '
                type="text" value={walletAddress} readOnly />
              <button
                className='bg-green-500 text-white p-2 rounded-md'
                onClick={() => {
                  navigator.clipboard.writeText(walletAddress);
                  toast.success('Copied to clipboard');
                  
                }}>
                Copy
              </button>
            </div>
            
          </div>

        </div>

        {/* qr code */}

        <div className="flex flex-col gap-2 mt-5">
          {/* 
          <label className="text-black">QR Code</label>
          */}

          {walletAddress &&

            <div className="flex flex-col items-center justify-center">
 
            <Canvas
              text={walletAddress}
              options={{
                //level: 'M',
                margin: 2,
                scale: 4,
                width: 200,
                color: {
                    dark: '#000000FF',
                    light: '#FFFFFFFF',
                },
              }}
            />

            </div>

          }
        </div>


        {balance === 0 && (
          <div className='bg-white p-4 rounded-lg shadow-sm'>
            <div className='flex flex-row gap-3 items-center'>
              <div>
                <p className='text-gray-600 text-sm'>Amount</p>
                <p className='font-semibold'>0.00 USDT</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-gray-600 text-sm'>Confirmations</span>
                <p className='font-semibold'>
                  0 from 10
                </p>
                
              </div>
            </div>
          </div>
        )}


        {balance > 0 && (
          <div className='bg-white p-4 rounded-lg shadow-sm'>

            <div className='flex flex-row gap-5 items-center'>
              
              {/* balance */}
              <div className='flex flex-col gap-1'>
                <p className='text-gray-600 text-sm'>Amount</p>
                <p className='font-semibold'>
                  <span className='text-green-500'>
                    {Number(balance).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </span>
                  <span className='text-gray-700'> USDT</span>
                </p>
              </div>
          

              { loading &&
                <svg className='animate-spin w-6 h-6 text-gray-500 mr-3' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                </svg>}
                

              {!loading && <svg className='w-6 h-6 text-green-500 mr-3' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeDasharray='60 20'/>
              </svg>}

        


              <div className='flex flex-col gap-1'>
                <p className='text-gray-600 text-sm'>Confirmations</p>

                <p className='font-semibold'>
                  <span className='text-green-500'>
                    {loading ? loadingCount : 'Confirmed'}
                  </span>
                  {loading && (
                    <span className='text-gray-700'> from 10</span>
                  )}
                </p>

              </div>

              {loadingCount > 10 &&
                  <svg className='animate-spin w-6 h-6 text-gray-500 mr-3' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                </svg>}


            </div>

          </div>
        )}






        {/* transfer history */}
        <div className="flex flex-col gap-2">
          {transferArray.length > 0 &&
            <table className="table-auto mt-5">
              <thead>
                <tr>
                  <th className="border border-white ">Date (UTC)</th>
                  <th className="border border-white">Amount (USDT)</th>
                  <th className="border border-white">Rate</th>
                  <th className="border border-white">KRW</th>
                </tr>
              </thead>
              <tbody>

                {/* first row is bold and large and colored */}

                {transferArray?.map((transfer : any, index : number) => (


                  
                  index === 0 ? (
                    <tr key={index}>
                      <td className="border border-white text-left bg-gray-200 p-2">{transfer.regist_date}</td>
                      <td className="border border-white text-right font-bold text-lg bg-gray-200 p-2">
                        {
                          Number(transfer.eth_bill).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                        }
                      </td>
                      <td className="border border-white text-right font-bold bg-gray-200 p-2">
                        {
                          Number(transfer.eth_php_user).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                        }
                      </td>
                      <td className="border border-white text-right font-bold text-lg bg-gray-200 p-2">
                        {
                          Number(transfer.eth_php_finish).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                        }
                      </td>
                    </tr>
                     
                  ) : (

                  <tr key={index}>
                    <td className="border border-white text-left p-2">{transfer.regist_date}</td>
                    <td className="border border-white text-right p-2">
                      {
                        Number(transfer.eth_bill).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                      }
                    </td>
                    <td className="border border-white text-right p-2">
                      {
                        Number(transfer.eth_php_user).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                      }
                    </td>
                    <td className="border border-white text-right p-2">
                      {
                        Number(transfer.eth_php_finish).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                      }
                    </td>
                  </tr>

                  ) 


                ))}
              </tbody>
            </table>
          }
        </div>




      </div>

    </div>
  );


}
