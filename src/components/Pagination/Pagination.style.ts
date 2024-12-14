import styled from "styled-components";

export const PagingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  button {
  }
`;

export const BtnFirst = styled.button``;
export const BtnPrev = styled.button``;
export const BtnNext = styled.button``;
export const BtnEnd = styled.button``;

export const PageBtn = styled.button<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) => ($isActive ? "#f7e4ff" : "#efefef")};
`;
