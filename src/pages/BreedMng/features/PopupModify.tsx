import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as S from "../BreedMng.style";
import AnimalBreed, {
  MetaInfo,
  ReqUpdateMetaList,
} from "../../../api/AnimalBreed";
import MultiSelector from "../../../components/Selector/MultiSelector";
import Selector, { ListItem } from "../../../components/Selector/Selector";
import { FCI_GROUP } from "../constants";

type Props = {
  selectedItem?: MetaInfo;
  onPopClose?: () => void;
};

const PopupModify = ({
  selectedItem,

  onPopClose,
}: Props) => {
  const [selectedFciListItem, setSelectedFciListItem] = useState<ListItem>();
  const [matchingListItem, setMatchingListItem] = useState<ListItem>();
  const [selectChildKind, setSelectChildKind] = useState<ListItem>();

  const [childKind, setChildKind] = useState<ListItem[]>([]);
  const [matchingData, setMatchingData] = useState<ListItem[]>([]);

  // fetchedExternalItem : 매칭
  const [fetchedExternalItem, setFetchedExternalItem] = useState<string[]>([]);
  const [fetchedChildKindItem, setFetchedChildKindItem] = useState<
    { id: number; kind: string }[]
  >([]);

  const childKindList: ListItem[] = fetchedChildKindItem.map((item) => ({
    label: item.kind,
    value: item.id.toString(),
  }));

  const externalItemList: ListItem[] = fetchedExternalItem.map((item) => ({
    label: item,
    value: item,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReqUpdateMetaList>({
    defaultValues: {
      id: selectedItem?.id,
      kind: selectedItem?.kind || "",
      fciGroupCode: selectedItem?.fciGroupCode,
      country: selectedItem?.country || "",
    },
  });

  const fetchData = async () => {
    try {
      const response = await AnimalBreed.getListsPop();
      console.log("Fetched response:", response);
      if (response) {
        setFetchedExternalItem(response.externalDataList || []);
        setFetchedChildKindItem(response.childKindMetaAnimalList || []);
      }
    } catch (error) {
      console.error("데이터 조회에 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setSelectedFciListItem({
        label: selectedItem?.fciGroupCode.toString() || "",
        value: selectedItem?.fciGroupCode.toString() || "",
      });
      setMatchingData(
        selectedItem.externalDataList.map((item) => {
          console.log(item);
          return { label: item, value: item };
        })
      );
      setChildKind(
        selectedItem.childKindCodeList.map((item) => {
          return { label: item.kind, value: item.id.toString() };
        })
      );
    }
  }, [selectedItem]);

  const submitForm: SubmitHandler<ReqUpdateMetaList> = async (data) => {
    if (!data.id) return;

    try {
      await AnimalBreed.updateLists(
        {
          ...data,
          childKindCodeList: childKind.map((item) => parseInt(item.value)),
          memberId: 0,
          externalDataList: matchingData.map((item) => item.label),
          fciGroupCode: parseInt(selectedFciListItem?.value || "0"),
        },
        data.id
      );

      alert("수정 완료");
      if (onPopClose) onPopClose();
      window.location.reload();
    } catch (e) {
      console.error("수정에 실패했습니다:", e);
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <S.PopContainer>
      <h2>수정</h2>
      <S.CreateForm onSubmit={handleSubmit(submitForm)}>
        <ul>
          <li>
            <h3>품종</h3>
            <S.PopInput
              {...register("kind", {
                required: { value: true, message: "품종을 입력해주세요" },
              })}
              type="text"
            />
            <S.ErrorMsg>{errors.kind?.message}</S.ErrorMsg>
          </li>
          <li>
            <MultiSelector
              selected={selectChildKind?.label}
              placeholder="선택해주세요"
              list={childKindList}
              onSelected={(item) => {
                setSelectChildKind(item);
              }}
              title="하위 품종"
              width="150px"
              selectedItem={childKind}
              setSelectedItem={setChildKind}
            />
          </li>
          <li>
            <MultiSelector
              selected={matchingListItem?.label}
              placeholder="선택해주세요"
              list={externalItemList}
              onSelected={(item) => setMatchingListItem(item)}
              width="150px"
              title="매칭 데이터"
              selectedItem={matchingData}
              setSelectedItem={setMatchingData}
            />
          </li>
          <li>
            <h3>FCI 그룹</h3>
            <Selector
              selected={selectedFciListItem?.label}
              placeholder="선택해주세요"
              list={FCI_GROUP}
              onSelected={setSelectedFciListItem}
              width="150px"
            />
          </li>
          <li>
            <h3>출생지</h3>
            <S.PopInput
              {...register("country", {
                required: { value: true, message: "출생지를 입력해주세요" },
              })}
              type="text"
            />
            <S.ErrorMsg>{errors.country?.message}</S.ErrorMsg>
          </li>
        </ul>
        <S.ButtonRow>
          <button type="button" onClick={onPopClose}>
            취소
          </button>
          <button type="submit">수정 완료</button>
        </S.ButtonRow>
      </S.CreateForm>
    </S.PopContainer>
  );
};

export default PopupModify;
