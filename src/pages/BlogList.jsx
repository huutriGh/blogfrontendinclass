import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  LinearProgress,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteBlogStart, fetchBlogStart } from "../store/blog/blog.action";
import { selecBlogsIsFetching, selectBlogs } from "../store/blog/blog.selector";
const BlogList = () => {
  const nevigate = useNavigate();

  const blogMap = useSelector(selectBlogs);
  const isLoading = useSelector(selecBlogsIsFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogStart(0, 10));
  }, [dispatch]);

  const handleChangePage = async (event, page) => {
    dispatch(fetchBlogStart(page - 1, 10));
  };

  const handleDelete = (blog) => {
    dispatch(deleteBlogStart(blog));
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
        {isLoading ? (
          <LinearProgress />
        ) : (
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
            {blogMap.data.map((item) => (
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

            {!blogMap.empty ? (
              <Grid item md={12} xs={12}>
                <Stack>
                  <Pagination
                    count={blogMap.totalPages}
                    page={blogMap.number + 1}
                    onChange={handleChangePage}
                  ></Pagination>
                </Stack>
              </Grid>
            ) : null}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default BlogList;
