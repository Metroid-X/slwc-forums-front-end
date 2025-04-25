const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/profiles`;

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

const userprofile = async (param) => {
    try {

        const res = await fetch(`${BASE_URL}/${param}`, {
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
}

const updateProfile = async (formData, profileId) => {
    try {

        const res = await fetch(`${BASE_URL}/${profileId}/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(formData),
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
}

export {
    index,
    userprofile,
    updateProfile,
};