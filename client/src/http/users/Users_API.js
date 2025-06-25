import {$host} from "../index";

export const FetchUsers = async () => {
    try
    {
        const { data } = await $host.get('/api/users');

        console.log('res', data);
        //setUsers(res.data)
        if (data?.error)
            throw new Error(data.error);

        return data;
    }catch (error)
    {
        console.log(error);

        return {
            error: error.message
        };
    }

};

export const Search = async (query) => {
    try
    {
        const { data } = await $host.post(`/api/users/search?key=${query}`);

        console.log(data);

        if (data?.error)
            throw new Error(data.error);

        return data;
    }catch (error)
    {
        alert(error);

        return {
            error: error.message
        };
    }

};

export const Delete = async (id) => {
    try
    {
        const { data } = await $host.delete(`/api/users/${id}`);

        console.log(data);

        if (data?.error)
            throw new Error(data.error);

        return data;
    }catch (error)
    {
        alert(error);

        return {
            error: error.message
        };
    }

};

export const Add = async (form, setForm) => {
    try
    {
        const { data } = await $host.post('/api/users', form);

        console.log(data);

        if (data?.error)
            throw new Error(data.error);

        return data;
    }catch (error)
    {
        alert(error);

        return {
            error: error.message
        };
    }

};

export const FindOne = async (id) => {
    try
    {
        const { data } = await $host.get(`/api/users/${id}`);

        console.log(data);

        if (data?.error)
            throw new Error(data.error);

        return data;
    }catch (error)
    {
        alert(error);

        return {
            error: error.message
        };
    }

};

export const Update = async (form, setForm, id) => {
    try
    {
        const { data } = await $host.put(`/api/users/${id}`, form);

        console.log(data);

        if (data?.error)
            throw new Error(data.error);

        return data;
    }catch (error)
    {
        alert(error);

        return {
            error: error.message
        };
    }

};