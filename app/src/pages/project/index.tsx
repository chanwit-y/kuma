import { ProjectContainer } from "@/components/container/project";
import { GetServerSideProps, NextPage } from "next";

type Props = {}

const Project: NextPage<Props> = ({ }: Props) => {
  return (<ProjectContainer />)
}

export default Project;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {}
  }
}