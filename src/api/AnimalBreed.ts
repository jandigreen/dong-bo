import { axiosInstance } from "./api";

export type MetaInfo = {
  id: number;
  memberName: string;
  fciGroupCode: number;
  country: string;
  kind: string;
  childKindCodeList: { id: number; kind: string }[];
  externalDataList: string[];
  updatedAt: string;
};

export type MetaInfoList = {
  message: string;
  metaAnimalSearch: { fciGroupCodeList: number[]; countryList: string[] };
  animalList: MetaInfo[];
  count: number;
  misMatchingCount: number;
};

export type ReqCreateMetaList = {
  memberId: number;
  fciGroupCode: number;
  country: string;
  kind: string;
  childKindCodeList: number[];
  externalDataList: string[];
};

export type ReqUpdateMetaList = ReqCreateMetaList & { id: number };

export type RespCreateMetaList = MetaInfo & {
  message: string;
};

/**
 * @getLists : 목록 조회
 * @createLists : 생성
 * @updateLists : 수정
 * @getListsPop : 팝업조회
 */

const AnimalBreed = {
  // getDetail: (id: number): Promise<MetaInfo[]> => {
  //   const query = new URLSearchParams();
  //   query.append("animalId", id.toString());
  //   return axiosInstance
  //     .get(`/bo/v1/animals/meta?${query.toString()}`)
  //     .then((resp) => {
  //       return resp.data;
  //     })
  //     .catch((e) => console.log(e));
  // },
  // getFilter: () => {
  //   return axiosInstance
  //     .get(`/bo/v1/animals/filter`)
  //     .then((resp) => {
  //       return resp.data;
  //     })
  //     .catch((e) => console.log(e));
  // },
  getLists: (
    fciGroupCode?: number,
    country?: string,
    kind?: string,
    page = 1
  ): Promise<MetaInfoList> => {
    const query = new URLSearchParams();

    if (fciGroupCode) {
      query.append("fciGroupCode", fciGroupCode.toString());
    }
    if (country) {
      query.append("country", country);
    }
    if (kind) {
      query.append("kind", kind);
    }
    // append는 string 만 받을 수 있어서 형 변환 필수
    query.append("page", page.toString());
    query.append("size", "20");

    return axiosInstance
      .get(`bo/v1/animals/meta?${query.toString()}`)
      .then((resp) => {
        console.log(resp.data);
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
  createLists: async (body: ReqCreateMetaList): Promise<RespCreateMetaList> => {
    const result = await axiosInstance.post(`bo/v1/animals/meta`, body);

    return result.data;
  },
  updateLists: async (
    body: ReqUpdateMetaList,
    metaAnimalId: number
  ): Promise<RespCreateMetaList> => {
    const result = await axiosInstance.put(
      `bo/v1/animals/meta/${metaAnimalId}`,
      body
    );

    return result.data;
  },
  getListsPop: (
    id?: number
  ): Promise<{
    metaAnimal: null | MetaInfo;
    fciGroupCodeList: number[];
    childKindMetaAnimalList: { id: number; kind: string }[];
    externalDataList: string[];
  }> => {
    if (!id) {
      id = 0;
    }

    return axiosInstance
      .get(`bo/v1/animals/meta/popup?id=${id}`)
      .then((resp) => {
        console.log(resp.data);
        return resp.data;
      })
      .catch((e) => console.log(e));
  },
};

export default AnimalBreed;
