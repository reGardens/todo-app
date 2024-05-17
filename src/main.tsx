import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/index.tsx';
import "./styles/index.css"
import { Provider } from 'react-redux'
import { store } from './app/store.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  </React.StrictMode>,
)
