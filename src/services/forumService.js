const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/forums`;

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

const newTopic = async (branchName) => {
    try {

        const res = await fetch(`${BASE_URL}/${branchName}/for-new-topic`);

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

const search = async (tagQ=null,textQ=null) => {
    try {

        const query = textQ?textQ.split(' '):null;
        
        const tags = tagQ?tagQ.split(' '):null;

        const res = await fetch(`${BASE_URL}/search/query${
            query||tags?(
                '?'
            ):(
                ''
            )
        }${
            query?.length?(
                `q=${query[0]}${query.slice(1)?.map(part=>(`+${part}`))}`
            ):(
                ''
            )
        }${
            query&&tags?(
                `&`
            ):(
                ``
            )
        }${
            tags?.length?(
                `t=${tags[0]}${tags.slice(1)?.map(tag=>(`+${tag}`))}`
            ):(
                ''
            )
        }`);

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

const searchByUser = async (userId) => {
    try {

        const res = await fetch(`${BASE_URL}/search/query/${userId}`);

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
    branch,
    newTopic,
    search,
    searchByUser,
};