import ApiManager from "./apiManager";

//코멘트 추가
export const createCommentAPI = async (issueId, content) => {
  const response = await ApiManager.post(
    `/api/issues/${issueId}/comments?content=${content}`
  );
  return response.data;
};

//단일 코멘트 조회
export const getDetailCommentAPI = async (issueId, commentId) => {
  const response = await ApiManager.get(
    `/api/issues/${issueId}/comments/${commentId}`
  );
  return response.data;
};

//코멘트 삭제
export const deleteCommentAPI = async (issueId, commentId) => {
  const response = await ApiManager.delete(
    `/api/issues/${issueId}/comments/${commentId}`
  );
  return response.data;
};

//코멘트 수정
export const updateCommentAPI = async (issueId, commentId, content) => {
  const body = {
    content: content,
  };
  const response = await ApiManager.patch(
    `/api/issues/${issueId}/comments/${commentId}`,
    body
  );
  return response.data;
};

//코멘트 전체 조회
export const getCommentsAPI = async (issueId) => {
  const response = await ApiManager.get(`/api/issues/${issueId}/comments`);
  return response.data;
};
