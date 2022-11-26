import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import Layout from "../../components/layouts/layout";
import { useQuery } from "../../convex/_generated/react";
import type { NextPageWithLayout } from "../_app";


const Page: NextPageWithLayout = () => {
  const {query, isReady} = useRouter();
  
  const { roomId } = query;
  if(!roomId) {
    return <div>
        loading...
    </div>
  }
  const roomDetails = useQuery('getOneRoom',roomId);

  console.log(roomDetails)
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
