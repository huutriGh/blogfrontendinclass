import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import "./App.css";

import { useEffect, useState } from "react";
import client from "./api/client";

function App() {
  const [state, setState] = useState({
    data: [],
    first: true,
    last: false,
    size: 0,
    number: 0,
    totalElements: 0,
    totalPages: 0,
    empty: true,
  });

  const getBlogs = async (page) => {
    const resp = await (page
      ? client.get(`/blogs?pageNo=${page - 1}`)
      : client.get("/blogs"));
    console.log(resp.data);

    const {
      empty,
      first,
      last,
      numberOfElements,
      totalElements,
      totalPages,
      content,
      number,
    } = resp.data;

    setState((prev) => ({
      ...prev,
      empty,
      first,
      last,
      numberOfElements,
      totalElements,
      totalPages,
      number,
      data: content,
    }));
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleChangePage = async (event, page) => {
    getBlogs(page);
  };

  const handleDelete = async (blog) => {
    const resp = await client.post("/blogs/delete", blog);
    console.log(resp);
    if (resp.status === 200) {
      const blogs = state.data.filter((item) => item.blogId !== blog.blogId);

      setState((prev) => ({
        ...prev,
        data: blogs,
      }));
    } else {
      alert("Delete fail");
    }
  };
  return (
    <Container>
      <Paper sx={{ padding: "30px" }}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography variant="h3" align="center">
              My blogs
            </Typography>
          </Grid>
          {state.data.map((item) => (
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
                  <Button onClick={() => handleDelete(item)}>DELETE</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {!state.empty ? (
            <Grid item md={12} xs={12}>
              <Stack>
                <Pagination
                  count={state.totalPages}
                  page={state.number + 1}
                  onChange={handleChangePage}
                ></Pagination>
              </Stack>
            </Grid>
          ) : null}
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
