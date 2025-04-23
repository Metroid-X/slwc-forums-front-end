const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/topics`;


// GET ALL
const index = async () => {
    try {

        const res = await fetch(`${BASE_URL}/get`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });

        const data = await res.json();

        if (data.err) {
            throw new Error(data.err);
        };

        return data;

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

// GET BRANCH TOPICS ONLY
const branch = async (branch) => {
    try {

        const res = await fetch(`${BASE_URL}/get/${branch}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });

        const data = await res.json();

        if (data.err) {
            throw new Error(data.err);
        };

        return data;

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

// GET SINGLE TOPIC IN BRANCH
const branchTopic = async (branch,topic) => {
    try {

        const res = await fetch(`${BASE_URL}/get/${branch}/${topic}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });

        const data = await res.json();

        if (data.err) {
            throw new Error(data.err);
        };

        return data;

    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const create = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/new`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(formData),
        });

        return res.json();

    } catch (err) {
        console.log(err);
    }
};

const update = async (formData, topicId) => {
    try {

        const res = await fetch(`${BASE_URL}/update/${topicId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(formData),
        });

        return res.json();

    } catch (err) {
        console.log(err);
    }
};

const deleteTopic = async (topicId) => {
    try {
        const res = await fetch(`${BASE_URL}/delete/${topicId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export {
    index,
    branch,
    branchTopic,
    create,
    update,
    deleteTopic,
};