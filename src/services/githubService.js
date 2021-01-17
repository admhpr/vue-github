const baseURL = 'https://api.github.com/users/';
export default {
    user: (username) => {
        return fetch(`${baseURL}${username}`)
    },
    events: (username) => {
        return fetch(`${baseURL}${username}/events`)
    }
}