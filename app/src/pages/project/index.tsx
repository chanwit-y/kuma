import { ProjectContainer } from "@/components/container/project";
import { GetServerSideProps, NextPage } from "next";


import { exec as execCb } from 'child_process';
import { promisify } from 'util';
import { Fragment } from "react";

const exec = promisify(execCb);

type Props = {
  stdout: string;
}

const Project: NextPage<Props> = ({ stdout }: Props) => {
  return (<Fragment>
    {stdout}
    <ProjectContainer />
  </Fragment>)
}

export default Project;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  let resutl: string = "";
  try {
    // const {  } = await exec('cd out && ls -la');
    // const { stdout, stderr } = await exec('ls -la');
    const { stdout, stderr } = await exec('cd .. && cd out && mkdir D && cd D && go mod init D && ls -la');
    // const { stdout, stderr } = await exec('pwd');
    resutl = stdout;
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (error) {
    console.error('Error:', error);
  }

  return {
    props: {
      stdout: resutl,
    }
  }
}