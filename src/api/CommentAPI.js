import ApiManager from "./apiManager";

//코멘트 추가
export const createCommentAPI = async (issueId, userId, content) => {
  const body = {
    userId: userId,
    content: content,
  };
  const response = await ApiManager.post(
    `/api/issues/${issueId}/comments`,
    body
  );
  return response.data;
};
