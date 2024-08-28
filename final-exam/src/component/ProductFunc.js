import {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import { Table, Form, Button, Modal } from 'react-bootstrap';
import * as productService from "../../../final-exam/src/service/ProductService";
import * as categoryService from "../../../final-exam/src/service/CategoryService";
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import moment from "moment";

function ProductFunc() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [selectedCategory,setSelectedCategory] = useState("");
    const [categories,setCategories] = useState([]);

    useEffect (() => {
        //     Call API search  name
        getAllProducts(name,selectedCategory);
    },[name,selectedCategory])

    useEffect (() => {
        //     Call API search  name
        getAllCategory()
    },[])


    useEffect(() => {
        return () => {
            //clean up <=> componentWillUnmount
        }
    }, [])


    const getAllProducts = async (name) => {
        let res = await productService.getAllProducts(name,selectedCategory);
        console.log(res)
        console.log(selectedCategory)
        setProducts(res)
    }

    const getAllCategory = async () => {
        let res = await categoryService.getAllCategory();
        console.log(res)
        setCategories(res)
    }

    return (
        <>
            <div className='container-fluid mt-3'>
                <p className="mt-4"><strong>Tìm kiếm sản phẩm theo tên : </strong></p>
                <input className="w-25" value={name} placeholder="Nhập tên sản phẩm cần tìm kiếm"
                       onChange={(e) => setName(e.target.value)}/>

                <div className="mt-4">
                    <p><strong>Tìm kiếm sản phẩm theo thể loại : </strong></p>
                    <div className="mb-3">
                        <select
                            id="category"
                            className="form-control w-50"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Chọn thể loại</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='mb-3'>
                    <Link to="/create">
                        <button className='btn btn-primary'>Thêm mới</button>
                    </Link>
                </div>

            </div>
            <table className="table table-hover text-center">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Ma</th>
                    <th>Ten</th>
                    <th>The loai</th>
                    <th>So luong</th>
                    <th>Gia</th>
                    <th>Ngay nhap</th>
                </tr>
                </thead>

                <tbody>
                {products.map((product, index) => {
                    return (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{product.category ? product.category.name : 'Không xác định'}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>{moment(product.inputDate, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    )
}

export default ProductFunc;