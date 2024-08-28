import axios from "axios";

const URL_PRODUCT = "http://localhost:8080/products"


export const getAllProducts = async (name, category)=> {
    try {
        let URL = `${URL_PRODUCT}?_sort=name&_order=asc&_expand=category&`;
        if (name) {
            URL += `name_like=${name}&`;
        }
        if (category) {
            URL += `categoryId=${category}&`;
        }
        const res = await axios.get(URL);
        return res.data;
    } catch (e) {
        return [];
    }
}
export const saveProduct = async (product) => {
    try {
        await axios.post(URL_PRODUCT, product)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}



