import axios from 'axios'

export const axiosRequest = (path: string, args: string = "") => {
    return new Promise((res, rej) => {
        axios({
            url: `${import.meta.env.VITE_FILM_API + path}?api_key=${import.meta.env.VITE_FILM_AUTH_KEY + args}`,
            method: 'GET',
        }).then(({ data }) => res(data)).catch(err => rej(err))
    })
}