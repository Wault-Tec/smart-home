export const baseURL = "http://192.168.2.25:1337/api";
export const houseId = 2;

const paths = {
    CREATE_USER: `/user/create`, //POST
    AUTH: `/auth`, //POST

    GET_ROOMS: `/rooms/`, //GET
    ADD_ROOM: `rooms/create`, //POST
}

export default paths;