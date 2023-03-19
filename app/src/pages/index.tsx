import { GetServerSideProps, type NextPage } from "next";
import Head from "next/head";

import f from "@/utils/firebase"

import { api } from "@/utils/api";
import { useEffect } from "react";
import { KeyValue } from "@/utils/logic/@types";
import { getValueFromNestedObject } from "@/utils/logic/service/variable";
import { ApproverDetail, getFieldModel } from "@/utils/logic/example";
import apiService from "@/utils/logic/service/api";

type Props = {
  data: KeyValue
}

const Home: NextPage<Props> = ({ data }) => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  useEffect(() => {
    f.findAll("connection").then((r) => { console.log(r) })
  }, [])

  useEffect(() => {
    // const game_indices = getValueFromNestedObject(data, 'game_indices')
    // console.log(game_indices)
    // const version = getValueFromNestedObject(game_indices, 'version')
    // console.log(version)
    // const url = getValueFromNestedObject(data, 'url')
    // console.log(version['url'])
    // console.log(url)
  }, [data])

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <pre>{JSON.stringify(data, undefined, 2)}</pre>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  getFieldModel(ApproverDetail, "Profile")
  const res = await apiService.get({ url: "/user-profile/users", stringArray: { name: "userIds", values: ["dev-52", "120"]} })
  return {
    props: {
      data: res.data
    },
  }
}