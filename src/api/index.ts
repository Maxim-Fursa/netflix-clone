import axios from 'axios'

export const axiosRequest = (arg: string) => {
    return new Promise((res, rej) => {
        axios({
            url: import.meta.env.VITE_FILM_API + arg + '?api_key=' + import.meta.env.VITE_FILM_AUTH_KEY,
            method: 'GET',
        }).then(({ data }) => res(data)).catch(err => rej(err))
    })
}