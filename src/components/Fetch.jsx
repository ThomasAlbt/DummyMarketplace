import annoncesData from '../data/Annonces_30.json';

const FetchAll = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const allAnnonce = annoncesData;
                resolve(allAnnonce);
            } catch (error) {
                console.log(error);
                reject([]);
            }
        }, 500);
    });
}

const FetchDetails = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const annonces = annoncesData.annonces || [];
                const found = annonces.filter(a => String(a.id) === String(id));
                console.log(found)
                resolve(found);
            } catch (error) {
                console.log(error);
                reject([]);
            }
        }, 500);
    });
}

export { FetchAll, FetchDetails } ;