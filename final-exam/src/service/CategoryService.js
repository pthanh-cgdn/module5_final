import axios from "axios";

const URL_CLASS = "http://localhost:8080/categories"

export const getAllCategory = async (id) => {
    try {
        let res = await axios.get(URL_CLASS)
        console.log(res.data)
        return res.data
    } catch (e) {
        return []
    }
}