import { MetaInfo } from "../../../api/AnimalBreed";
import * as S from "../BreedMng.style";

type Props = {
  selectedItem?: MetaInfo;
  onPopClose?: () => void;
};

const PopupDetail = ({ selectedItem, onPopClose }: Props) => {
  return (
    <S.PopContainer>
      <h2>{selectedItem?.kind}</h2>
      <S.VarietyList>
        <li>
          <h3>하위 품종</h3>
          {selectedItem?.childKindCodeList?.length === 0 ? (
            <S.NodataChildKind>없음</S.NodataChildKind>
          ) : (
            <S.DataBox>
              {selectedItem?.childKindCodeList?.map((item) => (
                <span>{item.kind}</span>
              ))}
            </S.DataBox>
          )}
        </li>
        <li>
          <h3>매칭 데이터</h3>
          {selectedItem?.externalDataList.length === 0 ? (
            <S.NodataChildKind>없음</S.NodataChildKind>
          ) : (
            <S.DataBox>
              {selectedItem?.externalDataList?.map((item) => (
                <span>{item}</span>
              ))}
            </S.DataBox>
          )}
        </li>
        <S.ListType>
          <h3>FCI 그룹 : </h3>
          <span>{selectedItem?.fciGroupCode}</span>
        </S.ListType>
        <S.ListType>
          <h3>출생지 : </h3>
          <span>{selectedItem?.country}</span>
        </S.ListType>
      </S.VarietyList>
      <S.ButtonRow>
        <button type="button" onClick={onPopClose}>
          확인
        </button>
      </S.ButtonRow>
    </S.PopContainer>
  );
};

export default PopupDetail;
