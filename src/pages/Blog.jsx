import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import client from "../api/client";

const Blog = () => {
  const location = useLocation();
  const nevigate = useNavigate();

  const isEdit = location.state?.blog.blogId ? true : false;

  const initialBlog = {
    blogId: "",
    title: "",
    url: "",
  };
  const [blog, setBlog] = useState(isEdit ? location.state?.blog : initialBlog);

  const handleChange = (event) => {
    setBlog((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };

  const handleAdd = () => {
    client
      .post("/blogs/add", blog)
      .then((res) => {
        if (res.status === 201) {
          setBlog(initialBlog);
        }
      })
      .catch((err) => {
        alert("Add blog fail!!!");
      });
  };
  const handleEdit = () => {
    client
      .put("/blogs/update", blog)
      .then((res) => {
        if (res.status === 200) {
          alert("Edit successfully");
          nevigate(-1);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Edit blog fail!!!");
      });
  };

  return (
    <Container>
      <Paper sx={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography align="center" variant="h4">
              {isEdit ? "Edit Blog" : "Create Blog"}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Id"
              name="blogId"
              fullWidth
              size="small"
              value={blog.blogId}
              onChange={handleChange}
              disabled={isEdit}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              size="small"
              value={blog.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              label="Url"
              name="url"
              fullWidth
              size="small"
              value={blog.url}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Button
              variant="contained"
              onClick={isEdit ? handleEdit : handleAdd}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Blog;
