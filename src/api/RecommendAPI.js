import ApiManager from "./apiManager";

//이슈 할당 개발자 추천
export const getDetailCommentAPI = async (issueId) => {
  const response = await ApiManager.get(`/api/issues/${issueId}/recommend`);
  return response.data;
};
