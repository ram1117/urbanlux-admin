const Page = ({ params }: { params: { orderid: string } }) => {
  return <main className="min-h-screen">{params.orderid}</main>;
};

export default Page;
