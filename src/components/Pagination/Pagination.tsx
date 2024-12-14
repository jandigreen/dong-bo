import * as S from "./Pagination.style";

type Props = {
  totalCount: number;
  currentPage: number;
  aPageListSize?: number;
  paginationSize?: number;
  onClickPage: (page: number) => void;
};

const Pagination = ({
  totalCount,
  currentPage,
  aPageListSize = 25,
  paginationSize = 10,
  onClickPage,
}: Props) => {
  const totalPage = Math.ceil(totalCount / aPageListSize);

  const moveToFirst = () => {
    onClickPage(0);
  };

  const moveToLast = () => {
    onClickPage(totalPage - 1);
  };

  const moveToBefore = () => {
    if (currentPage === 0) return;
    onClickPage(currentPage - 1);
  };

  const moveToAfter = () => {
    if (currentPage === totalPage - 1) return;
    onClickPage(currentPage + 1);
  };

  const renderPage = () => {
    const list = [];
    const startPage = Math.floor(currentPage / paginationSize) * paginationSize;

    for (let index = startPage; index < startPage + paginationSize; index++) {
      if (index >= totalPage) break;

      list.push(
        <S.PageBtn
          key={"pagination" + index}
          $isActive={currentPage === index}
          onClick={() => onClickPage(index)}
        >
          {index + 1}
        </S.PageBtn>
      );
    }
    return list;
  };
  return (
    <S.PagingWrap>
      <S.BtnFirst onClick={moveToFirst} disabled={currentPage === 0}>
        &lt;&lt;
      </S.BtnFirst>
      <S.BtnPrev onClick={moveToBefore} disabled={currentPage === 0}>
        &lt;
      </S.BtnPrev>
      {renderPage()}
      <S.BtnNext onClick={moveToAfter} disabled={currentPage === totalPage - 1}>
        &gt;
      </S.BtnNext>
      <S.BtnEnd onClick={moveToLast} disabled={currentPage === totalPage - 1}>
        &gt;&gt;
      </S.BtnEnd>
    </S.PagingWrap>
  );
};

export default Pagination;
