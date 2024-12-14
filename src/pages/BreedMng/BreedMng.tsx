import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Portal from "../../components/Portal";
// import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import * as S from "./BreedMng.style";
import AnimalBreed, { MetaInfo, MetaInfoList } from "../../api/AnimalBreed";
import Selector, { ListItem } from "../../components/Selector/Selector";
import dayjs from "dayjs";
import Pagination from "../../components/Pagination/Pagination";
import PopupDetail from "./features/PopupDetail";
import PopupModify from "./features/PopupModify";
import PopupNew from "./features/PopupNew";

type PopupType = "detail" | "new" | "modify";

const BreedMng = () => {
  const [isPopup, setIsPopup] = useState(false);
  // const [selectedFCI, setSelectedFCI] = useState<number | undefined>();
  // const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  // const [breed, setBreed] = useState<string | undefined>();

  const [selectFCI, setSelectFCI] = useState<ListItem>();
  const [selectCountry, setSelectCountry] = useState<ListItem>();
  const [selectedItem, setSelectedItem] = useState<MetaInfo>();
  const [popupType, setPopupType] = useState<PopupType>("detail");
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searhResult, setSearhResult] = useState<MetaInfoList>();

  // const queryClient = useQueryClient();

  const popupOpen = (type: PopupType) => {
    setPopupType(type);
    setIsPopup(true);
  };

  const popupClose = () => {
    setIsPopup(false);
  };

  // const { data } = useQuery({
  //   // queryKey에서 page 의 역할은 useEffect 와 동일
  //   queryKey: ["getBreed", page],
  //   queryFn: () =>
  //     AnimalBreed.getLists(undefined, undefined, undefined, page + 1),
  // });

  useEffect(() => {
    AnimalBreed.getLists(undefined, undefined, undefined, page + 1).then(
      (resp) => {
        setSearhResult(resp);
        console.log(resp);
      }
    );
  }, [page]);

  // const createAnimal = useMutation({
  //   mutationFn: () => createLists()
  // })

  const onClickListTr = (selectedItem: MetaInfo) => {
    setSelectedItem(selectedItem);
  };

  const mutation = useMutation({
    mutationFn: () => {
      // 내가 입력한 값, 실행하는 함수
      return AnimalBreed.getLists(
        selectFCI ? Number(selectFCI.value) : undefined,
        selectCountry?.value,
        searchInput
      );
    },
    onSuccess: (resp) => {
      setSearhResult(resp);
      console.log(resp);
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  // const resetSearchData = () =>{
  //   setSearhResult()
  //   queryClient.invalidateQueries({ queryKey: ["getBreed", page] });
  // }

  return (
    <>
      <S.Container>
        <S.TopWrap>
          <S.OptionBox>
            <S.OptionTitle>FCI 그룹</S.OptionTitle>
            <Selector
              selected={selectFCI?.label}
              placeholder="선택해주세요"
              list={
                searhResult?.metaAnimalSearch.fciGroupCodeList.map((item) => {
                  return { label: item.toString(), value: item.toString() };
                }) || []
              }
              onSelected={(item) => setSelectFCI(item)}
              width="110px"
            />
          </S.OptionBox>
          <S.OptionBox>
            <S.OptionTitle>출생국</S.OptionTitle>
            <Selector
              selected={selectCountry?.label}
              placeholder="선택해주세요"
              list={
                searhResult?.metaAnimalSearch.countryList.map((item) => {
                  return { label: item.toString(), value: item.toString() };
                }) || []
              }
              onSelected={(item) => setSelectCountry(item)}
              width="150px"
            />
          </S.OptionBox>
          <S.OptionBox>
            <input
              type="text"
              placeholder="품종을 입력해주세요"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={() => mutation.mutate()}>검색</button>
          </S.OptionBox>
        </S.TopWrap>
        <S.ContentWrap>
          <S.TableInfoWrap>
            <S.SearchCase>{searhResult?.count}건</S.SearchCase>
            <S.InfoBox>
              <p>
                *총 <span>{searhResult?.misMatchingCount}</span>건의 미매칭
                데이터가 있습니다.
              </p>
              <button onClick={() => popupOpen("new")}>신규 작성</button>
            </S.InfoBox>
          </S.TableInfoWrap>
          <S.TableContainer>
            <table>
              <thead>
                <tr>
                  <th>FCI 그룹</th>
                  <th>품종</th>
                  <th>출생지</th>
                  <th>매칭 데이터 수</th>
                  <th>최근 작업일 | 작업자</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {searhResult?.animalList.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      onClickListTr(item);
                      popupOpen("detail");
                    }}
                  >
                    <td>{item.fciGroupCode}</td>
                    <td>{item.kind}</td>
                    <td>{item.country}</td>
                    <td>{item.externalDataList?.length || 0}</td>
                    <td>
                      {dayjs(item.updatedAt).format("YY.MM.DD")} |
                      {item.memberName}
                    </td>
                    <td
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickListTr(item);
                        popupOpen("modify");
                      }}
                    >
                      <button>수정</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </S.TableContainer>
        </S.ContentWrap>
        <Pagination
          currentPage={page}
          // totalCount={data?.count || 0}
          totalCount={575}
          onClickPage={(page) => setPage(page)}
        />
      </S.Container>
      {isPopup && (
        <Portal>
          <Modal
            type="center"
            backDropAnimation={false}
            // onClickBackDrop={popupClose}
            // isCloseBtn={false}
            onHide={popupClose}
          >
            {/* 
              @PopupDetail - 자세히보기
              @PopupNew - 신규
              @PopupModify - 수정
            */}
            {popupType === "detail" && (
              <PopupDetail
                selectedItem={selectedItem}
                onPopClose={popupClose}
              />
            )}
            {popupType === "new" && (
              <PopupNew
                onPopClose={popupClose}
              />
            )}
            {popupType === "modify" && (
              <PopupModify
                selectedItem={selectedItem}
                onPopClose={popupClose}
              />
            )}
          </Modal>
        </Portal>
      )}
    </>
  );
};

export default BreedMng;
