import env from 'react-dotenv';

class Api {
    constructor({ url }) {
        this._url = url;
    }

    getResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo(token) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
        })
            .then(this.getResponse)
    }

    setUserInfo({name, about}) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(this.getResponse)
    }

    setUserAvatar({avatar}) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                avatar,
            }),
        })
            .then(this.getResponse)
    }

    getCards(token) {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        })
            .then(this.getResponse)
    }

    addCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
              authorization: `Bearer ${localStorage.getItem('jwt')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                link,
            })
        })
            .then(this.getResponse)
    }

    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${localStorage.getItem('jwt')}`,
              'Content-Type': 'application/json',
            },
        })
            .then(this.getResponse)
    }

    toggleLike(cardId, like) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: like ? 'PUT' : 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
              },
        })
            .then(this.getResponse)
    }
}

const api = new Api({
    url: env.BASE_URL,
  });
  
console.log(api.url) 
export default api;

