import HttpService from "./http-service";

export const search = async (payload) => {
    let response = await HttpService.get(`/api/todos/${payload.userId}`, {
        params: {
            title: payload.title,
        },
    });

    return response.data;
};

export const create = async (payload) => {
    const formData = new FormData();

    for (let key in payload) {
        formData.set(key, payload[key]);
    }

    let response = await HttpService.post('/api/todos', {
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};


export const update = async (payload) => {
    const formData = new FormData();

    for (let key in payload) {
        formData.set(key, payload[key]);
    }

    let response = await HttpService.patch(`/api/todos/${payload.id}`, {
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};


export const deleteTodo = async (payload) => {
    let response = await HttpService.delete(`/api/todos/${payload.id}`);

    return response.data;
};
