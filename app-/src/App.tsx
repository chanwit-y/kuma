// import { invoke } from "@tauri-apps/api/tauri";




import { Box } from "@mui/material";
import { useState } from "react";
import { Database, DatabaseTreeView } from './components/TreeView';


function App() {

  const [dbs] = useState<Database[]>([
    {
      name: "TAP",
      tables: []
    },
    {
      name: "DOA",
      tables: []
    },
    {
      name: "ACCP",
      tables: []
    },
    {
      name: "IRS",
      tables: []
    },
  ]);

  // async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  // setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <Box 
    p={1}
    width={300} 
    height="95vh" 
    border={1}>
      <DatabaseTreeView
        name="Databases"
        dbs={dbs} />
    </Box>
  );
}

export default App;
