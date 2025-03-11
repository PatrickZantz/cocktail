import './index.css';
import Layout from './layout/Layout';
import Home from './pages/Home';
import AddDrink from './pages/AddDrink';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import SelectedCat from './pages/SelectedCategory/SelectedCategory';

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* Index route for the home page */}
        <Route index element={<Home />} />
        
        {/* Route for AddDrink */}
        <Route path="add-drink" element={<AddDrink />} />
        
        {/* Dynamic route for SelectedCat */}
        <Route path=":linkParam" element={<SelectedCat />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
