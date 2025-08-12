import dotenv from 'dotenv';

const FetchAPI = async () => {
    try {
        const idInfos = await fetch(process.env.REACT_API_URI);
        return(idInfos);
    } catch (error) {
        console.log(`error : ${error}`);
    }
}

export default FetchAPI;