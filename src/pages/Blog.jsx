import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import client from "../api/client";
import validate from "validate.js";
// Validation schema
const schema = {
  blogId: {
    presence: {
      allowEmpty: false,
     // message: "Blog Id is quired",
    },
    length: {
      minimum: 1,
      maximum: 8,
     // message: "Blog Id is invalid",
    },
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
     // message: "Blog Id is invalid",
    },
  },
  title: {
    presence: {
      allowEmpty: false,
      message: "Title is quired",
    },
    length: {
      minimum: 1,
      maximum: 255,
      message: "Title is invalid",
    },
  },
  url: {
    presence: {
      allowEmpty: false,
      message: "Url is quired",
    },
    length: {
      minimum: 1,
      maximum: 255,
      message: "Url is invalid",
    },
  },
};

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
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isValid: false,
  });

  // Use effect check validation
  useEffect(() => {
    const valid = setTimeout(() => {
      const errors = validate(blog, schema);
      setValidation((prev) => ({
        ...prev,
        isValid: errors ? false : true,
        errors: errors || {},
      }));
    }, 500);
    return () => {
      clearInterval(valid);
    };
  }, [blog]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const handleChange = (event) => {
    setBlog((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
    setValidation((prev) => ({
      ...prev,
      touched: {
        ...prev.touched,
        [event.target.name]: true,
      },
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
              error={hasError("blogId")}
              helperText={
                hasError("blogId") ? validation.errors.blogId[0] : null
              }
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
              error={hasError("title")}
              helperText={hasError("title") ? validation.errors.title[0] : null}
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
              error={hasError("url")}
              helperText={hasError("url") ? validation.errors.url[0] : null}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Button
              variant="contained"
              onClick={isEdit ? handleEdit : handleAdd}
              disabled={!validation.isValid}
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
