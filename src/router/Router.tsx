import { BrowserRouter, Route, Routes } from "react-router-dom";
import BreedMng from "../pages/BreedMng/BreedMng";
import Layout from "../layouts/Layout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<BreedMng />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
