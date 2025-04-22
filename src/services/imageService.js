const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/images`;

const index = async () => {
    try {

        const res = await fetch(BASE_URL);

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

const branch = async (branchName) => {
    try {

        const res = await fetch(`${BASE_URL}/${branchName}`);

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

export {
    index,
};