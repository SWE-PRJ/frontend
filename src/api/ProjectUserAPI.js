import ApiManager from "./apiManager"

export const ProjectUserAPI = async (projectId, userId) => {
    const response = await ApiManager.post(`/api/projects/${projectId}/${userId}`);
    return response.data;
}