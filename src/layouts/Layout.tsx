import { Outlet } from "react-router-dom";
import Aside from "../components/Aside/Aside";
import * as S from "./Layout.style";

function Layout() {
  return (
    <S.LayoutWrpper>
      <Aside />
      <Outlet />
    </S.LayoutWrpper>
  );
}

export default Layout;
