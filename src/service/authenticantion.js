import { api } from "./api";
const authentication =  async () => {
    const response = await api.get("/authentication")
    return response.data

}
export default authentication