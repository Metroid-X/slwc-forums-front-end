const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/comments`;

const index = async () => {
    try {

        const res = await fetch(BASE_URL, {
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

const update = async (formData, commentId) => {
    try {

        const res = await fetch(`${BASE_URL}/update/${commentId}`, {
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

const deleteComment = async (commentId) => {
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
    create,
    update,
    deleteComment,
};