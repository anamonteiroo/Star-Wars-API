import axios from 'axios';

const getFilms = async() => {
    let result = [];
    let response = [];

    for (let page = 1; page <= 6; page++) {
        const api = await axios.get(`http://swapi.dev/api/planets/?page=${page}`).then((response) => {
            response.data.results.forEach(element => {

                result.push({
                    Planet: element.name,
                    Quantidade: element.films.length
                });
            });

            return result;
        }).catch((error) => {
            return error;
        });

        let end = [];
        response = end.concat(api);
    }
    return response;
};

export default getFilms;