import Blog from "./pages/Blog";
import BlogList from "./pages/BlogList";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogList/>
  },
  {
    path: "/blog/create",
    element: <Blog/>
  },
  {
    path: "/blog/edit",
    element: <Blog/>
  }

])

function App() {

  return <RouterProvider router={router} />
}

export default App;
