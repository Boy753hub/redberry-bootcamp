import { Outlet, createHashRouter } from "react-router-dom";
import Header from "../components/Header";
import MainPage from "../pages/MainPage";
import AddBlogPage from "../pages/AddBlogPage";
import VlogHeader from "../components/VlogHeader";
import BlogPage from "../pages/BlogPage";

export const router = createHashRouter([
    {
        element: (
            <div>
                <Header />
                <Outlet />
            </div>
          ),
          path: "/",
          children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: "/blog/:id",
                element: <BlogPage />,
            }
        ]
    },
    {
        element: (
            <div>
                <VlogHeader />
                <AddBlogPage />
            </div>
        ),
        path: "/addBlog",
    }
    
  ]);
  