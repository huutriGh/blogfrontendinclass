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

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogStart } from '../store/blog/blog.action';
import { selectBlogIsFectching, selectBlogs } from '../store/blog/blog.selector';

const BlogList = () => {
  const nevigate = useNavigate();

  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  console.log(blogs);
  const isFetching = useSelector(selectBlogIsFectching);

  useEffect(()=>{
    dispatch(fetchBlogStart(0,10))
  },[dispatch])

  const handleChangePage = async (event, page) => {
    dispatch(fetchBlogStart(page-1,10))
  };

  const handleDelete = (blog) => {
    
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
          {blogs.data.map((item) => (
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

          {!blogs.empty ? (
            <Grid item md={12} xs={12}>
              <Stack>
                <Pagination
                  count={blogs.totalPages}
                  page={blogs.number + 1}
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
