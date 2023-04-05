import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import "./App.css";

import { useEffect, useState } from "react";
import client from "./api/client";

function App() {
  const [state, setState] = useState([]);

  const getBlogs = async () => {
    const resp = await client.get("/blogs");
    console.log(resp.data);
    setState(resp.data.content);
  };
  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Container>
      <Paper sx={{ padding: "30px" }}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography variant="h3" align="center">
              My blogs
            </Typography>
          </Grid>
          {state.map((item) => (
            <Grid item md={4} xs={12} key={item.blogId}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {item.title}
                  </Typography>
                  <Typography gutterBottom variant="p">
                    {item.url}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button>Edit</Button>
                  <Button>DELETE</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
