import { GetServerSideProps, NextPage } from "next";
import ProjectProvider from "./Context";
import { List } from "./List";
import { Toolbar } from "./Toolbar";

type Props = {}

const Project: NextPage<Props> = ({}: Props) => {

  return (<ProjectProvider>
    <Toolbar />
    <List />
  </ProjectProvider>)
}

export default Project;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {}
  }
}