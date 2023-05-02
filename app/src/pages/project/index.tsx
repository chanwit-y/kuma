import { useMemo } from 'react'
import { Box, Card, Grid, Typography } from "@mui/material";
import { Project } from '@/@types';

export default function Project() {
  const projects = useMemo<Project[]>(() => [
    { name: "DOA", description: "-" },
    { name: "TAP", description: "-" },
  ], []);

  return (<Grid container spacing={2}>
    {projects.map((p) => <Grid item md={4} sm={4}>
      <Card>
        <Box p={2}  >
          <Typography>
            {p.name}
          </Typography>
          <Typography>
            {p.description}
          </Typography>
        </Box>
      </Card>
    </Grid>)}
  </Grid>)
}
