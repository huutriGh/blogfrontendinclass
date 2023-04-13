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

import qs from "qs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

const BlogList = () => {
  const nevigate = useNavigate();

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

  const [isLogin, setIsLogin] = useState(false);

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
    const logIn = async () => {
      const data = { username: "user", password: "password" };
      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
        url: "http://localhost:8080/login",
      };
      const res = await client(options);
      return res;
    };
    console.log("RUN LOGIN");
    logIn()
      .then((res) => {
        console.log("Response after login success: ", res);
        setIsLogin(true);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  useEffect(() => {
    if (isLogin) {
      getBlogs();
    }
  }, [isLogin]);

  const handleChangePage = async (event, page) => {
    getBlogs(page);
  };

  const handleDelete = (blog) => {
    client
      .delete("/blogs/delete", { data: blog })
      .then((res) => {
        console.log(res);
        const blogs = state.data.filter((item) => item.blogId !== blog.blogId);
        setState((prev) => ({
          ...prev,
          data: blogs,
        }));
      })
      .catch((err) => {
        console.log(err);
        alert("Delete fail");
      });
  };
  const handleClick = () => {
    nevigate("/blog/create");
  };

  const handleEdit = (blog) => {
    nevigate("/blog/edit", { state: { blog } });
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
          <Grid item md={12} xs={12}>
            <Button onClick={handleClick} variant="contained">
              Create Blog
            </Button>
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
                  <Button onClick={() => handleEdit(item)}>Edit</Button>
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
};

export default BlogList;
