export const baseURL = "http://192.168.2.25:1337/api";
export const houseId = 3;

const paths = {
    CREATE_USER: `/user/create`, //POST
    AUTH: `/auth`, //POST

    GET_ROOMS: `/rooms/`, //GET
    GET_ROOMS_BY_ID: `/rooms/${houseId}`,//GET
    ADD_ROOM: `rooms/create`, //POST

    GET_DEVICE: `device/`, //GET
    GET_DEVICE_UNUSED: `device/getUnused`, //GET
    ATTACH_DEVICE: `device/attachDevice`, //PUT
    UPDATE_DEVICE_INFO: `device/updateInfo`, //PUT
}

export default paths;