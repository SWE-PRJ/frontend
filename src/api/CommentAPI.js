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

//단일 코멘트 조회
export const getDetailCommentAPI = async (issueId, commentId) => {
  const response = await ApiManager.get(
    `/api/issues/${issueId}/comments/${commentId}`
  );
  return response.data;
}