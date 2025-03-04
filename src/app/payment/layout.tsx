import Header from './header';

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // center the content

  return (
    <div className="
      flex flex-col items-center justify-center
      @container
    ">
      
      
      {/*<Header />*/}
      

      {children}
    </div>
  );
}
