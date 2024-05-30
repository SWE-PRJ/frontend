import ApiManager from "./apiManager";

export const CreateProjectAPI = async () => {
    const params = {
        name: "Project",
    };
    console.log('Header', ApiManager.defaults.headers);

    const response = await ApiManager.post("/api/projects?name=testInNext");
    console.log(response.data);
    return response.data;
};
