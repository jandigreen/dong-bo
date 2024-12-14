import * as S from "./Aside.style";

const Aside = () => {
  return (
    <S.Asidewrap>
      <S.LogoBox>
        <h1>로고</h1>
        <S.Title>동물 품종 데이터 관리</S.Title>
      </S.LogoBox>
      <S.MenuList>
        <li>
          <S.TextLink to="/">Home</S.TextLink>
        </li>
      </S.MenuList>
    </S.Asidewrap>
  );
};

export default Aside;
