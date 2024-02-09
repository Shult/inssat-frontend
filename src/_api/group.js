import {apiAcademy} from './client'

const getUsersByGroupId = (id) => apiAcademy.get(`/groups/${id}/users`);
const getAllGroup = () => apiAcademy.get(`/groups`);

export {
    getAllGroup,
    getUsersByGroupId
}
