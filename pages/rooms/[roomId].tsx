import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import Layout from "../../components/layouts/layout";
import type { NextPageWithLayout } from "../_app";


const Page: NextPageWithLayout = () => {
  const router = useRouter();
  
  const { roomId } = router.query;

  return (
  <div>
    {roomId}
  </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};


export default Page;
