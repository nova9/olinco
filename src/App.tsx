import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import ErrorPage from "./routes/error-page";
import Services from "./routes/services";
import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'services',
        element: <Services />,
      }
    ]
  }
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
  )
}

export default App
