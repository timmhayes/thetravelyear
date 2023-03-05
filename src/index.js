import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/app";
import AboutPage from "./routes/about-page";
import ErrorPage from "./routes/error-page";
import Landing from "./routes/landing-page";
import MonthListPage from "./routes/monthlist-page";
import CountryListPage from "./routes/countrylist-page";
// import PhotoListPage, { loader as photosLoader } from "./routes/dev-photolist-page";
import StoryPage, { loader as storyLoader } from "./routes/story-page";
import StoryListPage, {  loader as storyListLoader } from "./routes/storylist-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      // {
      //   path: "photos",
      //   element: <PhotoListPage />,
      //   loader: photosLoader,
      // },
      {
        path: "countries",
        element: <CountryListPage />
      },
      {
        path: "countries/:country",
        element: <StoryListPage />,
        loader: storyListLoader,
      },
      {
        path: "countries/:country/story/:storyId",
        element: <StoryPage />,
        loader: storyLoader,
      },
      {
        path: "months",
        element: <MonthListPage />
      },
      {
        path: "months/:month",
        element: <StoryListPage />,
        loader: storyListLoader,
      },
      {
        path: "months/:month/story/:storyId",
        element: <StoryPage />,
        loader: storyLoader,
      },
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
