import ProjectProvider from "./Context";
import { List } from "./List";
import { Toolbar } from "./Toolbar";

export default function Project() {

  return (<ProjectProvider>
    <Toolbar />
    <List />
  </ProjectProvider>)
}
