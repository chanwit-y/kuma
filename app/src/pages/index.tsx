import { Box } from "@mui/material";
import Link from "next/link";



export default function Home() {

  return (
    <Box display="flex" flexDirection="column">
      <Link href="project">
        project
      </Link>
      <Link href="entity">
        entity
      </Link>
    </Box>
  )
}
