import { data } from "jquery";

const BASE_URL = "https://thinkful-list-api.herokuapp.com/scott";

const listFetch = function (...args) {
    let error;
    return fetch(...args)
        .then(res => {
            if(!res.ok) {
                error = {code: res.status};

                if(!res.headers.get('content-type').includes('json')) {
                    error.message = res.statusText;
                    return Promise.reject(error);
                }
            }
            return res.json();
        })
        .then(data => {
            if(error) {
                error.message = data.message;
                return Promise.reject(error);
            }
            return data;
        });
}

const getItems = () => {
    return listFetch(`${BASE_URL}/items`);
};

const createItem = (name) => {
    let newItem = {
        name
    };

    return listFetch(`${BASE_URL}/items`,
    {
        method: 'POST',
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    });
}

const updateItem = (id, updateTarget) => {
    return listFetch(`${BASE_URL}/items/${id}`, 
    {
        method: 'PATCH',
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateTarget)
    });
}

const deleteItem = (id) => {
    return listFetch(`${BASE_URL}/items/${id}`, 
    {
        method: 'DELETE'
    });
}

export default {
    getItems,
    createItem,
    updateItem,
    deleteItem
};