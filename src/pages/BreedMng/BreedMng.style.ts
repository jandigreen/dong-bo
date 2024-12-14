import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 754px;
  position: relative;
`;

export const TopWrap = styled.div`
  background-color: #f7e4ff;
  height: 100px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const OptionBox = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  &:last-child {
    margin-right: 0;
  }
  select {
    width: 100px;
    height: 35px;
    border-radius: 6px;
  }
  input {
    width: 250px;
    height: 35px;
    border-radius: 6px;
    padding-left: 10px;
  }
  button {
    width: 50px;
    height: 35px;
    border-radius: 6px;
    margin-left: 10px;
    background-color: ${({ theme }) => theme.lightversion.fontSecondary};
    color: #fff;
  }
`;

export const OptionTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-right: 5px;
`;

export const ContentWrap = styled.div``;

export const TableInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SearchCase = styled.div``;
export const InfoBox = styled.div`
  display: flex;
  align-items: center;
  p {
    span {
      color: ${({ theme }) => theme.lightversion.primary};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
    &:hover {
      text-decoration: underline;
    }
  }
  button {
    width: 75px;
    height: 30px;
    border-radius: 6px;
    margin-left: 10px;
  }
`;

export const TableContainer = styled.div`
  border: 1px solid #f7e4ff;
  text-align: center;
  margin-top: 10px;
  border-radius: 10px;
  margin-bottom: 30px;
  table {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.md};
    thead {
      background-color: #f7e4ff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      tr {
        th {
          height: 30px;
          line-height: 40px;
          &:first-child {
            width: 10.66%;
            border-top-left-radius: 10px;
          }
          &:nth-child(2) {
            width: 22.66%;
          }
          &:nth-child(3) {
            width: 16.66%;
          }
          &:nth-child(4) {
            width: 16.66%;
          }
          &:nth-child(5) {
            width: 22.66%;
          }
          &:last-child {
            width: 10.7%;
            border-top-right-radius: 10px;
          }
        }
      }
    }
    tbody {
      tr {
        border-bottom: 1px solid #debbf0;
        td {
          padding: 8px 6px 4px;
          button {
            width: 45px;
            height: 30px;
            border-radius: 3px;
          }
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
`;

export const PagingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 712px;
  left: 50%;
  transform: translateX(-50%);
  button {
  }
`;

export const BtnFirst = styled.button``;
export const BtnPrev = styled.button``;
export const BtnNext = styled.button``;
export const BtnEnd = styled.button``;

export const PopContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 30px;
  width: 450px;
  h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

export const VarietyList = styled.ul`
  padding-bottom: 15px;
  li {
    + li {
      margin-top: 20px;
    }
    h3 {
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

export const NodataChildKind = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-top: 10px;
`;

export const DataBox = styled.div`
  border: 1px solid #d9d9d9;
  padding: 5px 5px 0;
  border-radius: 12px;
  margin-top: 10px;
  span {
    display: inline-block;
    border-radius: 12px;
    background-color: #f7e4ff;
    height: 24px;
    line-height: 26px;
    padding: 0 10px;
    margin: 0 5px 5px 0;
  }
`;

export const ListType = styled.li`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  grid-gap: 10px;
  margin-top: 30px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 52px;
    border-radius: 12px;
    background-color: #748bff;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
  }
`;

export const CreateForm = styled.form`
  ul {
    li {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      h3 {
        font-weight: bold;
        flex-shrink: 0;
        width: 70px;
      }
      input {
        flex: 1;
      }
    }
  }
`;

export const PopInput = styled.input`
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0 10px;
`;

export const ErrorMsg = styled.div`
  font-size: 12px;
  color: #f00;
`;

export const ListItem = styled.li`
  display: block !important;
`;

export const PartBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  span {
    padding: 10px;
    border-radius: 10px;
    background-color: #d8d8d8;
  }
`;
