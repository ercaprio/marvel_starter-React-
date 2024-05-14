/* eslint-disable no-unused-vars */

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=33c17539858fd8200918eb1fb94ca45f';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=209&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        let description = '';

        char.description.length > 220 ? description = char.description.slice(0, 220) + '...' : description = char.description;

        return {
            id: char.id,
            name: char.name,
            description: description ? description : 'There is no description for this character.',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url, 
            wiki: char.urls[1].url,
            comics: char.comics.items.length <= 10 ? char.comics.items : char.comics.items.slice(0, 10)
        }
    }
}

export default MarvelService;