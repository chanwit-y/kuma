import ProjectProvider from "./Context";
import { List } from "./List";
import { Toolbar } from "./Toolbar";
import { memo } from "react";

type Props = {}

export const ProjectContainer  = memo(({}: Props) => {

  return (<ProjectProvider>
    <Toolbar />
    <List />
  </ProjectProvider>)
})
