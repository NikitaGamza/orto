import Axios from "axios";

export const signIn = async (body) => await Axios.post('/api/users/signin', body)
