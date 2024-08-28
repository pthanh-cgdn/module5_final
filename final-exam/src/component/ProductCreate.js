import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as productService from "../service/ProductService";
import * as categoryService from "../service/CategoryService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {saveProduct} from "../service/ProductService";

function ProductCreate() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const initialValues = {
        code: "",
        name: "",
        description: "",
        category: 0,
        price: 0,
        quantity : 0,
        input : ""
    };

    useEffect(() => {
        getAllCategory();
    },[]);

    const getAllCategory = async () => {
        try{
            const category = await categoryService.getAllCategory();
            setCategories(category);
        } catch (e) {
            console.error("Lỗi :", e);
        }
    }

    const objectValid = {
        code: Yup.string().required("Mã sản phẩm không được để trống")
            .matches(/^PROD-\d{4}$/,"Mã sản phẩm nhập chưa đúng định dạng (yêu cầu : PROD - XXXX với X là các chữ số"),
        name: Yup.string()
            .required("Tên không được để trống")
            .min(3, "Tên không được ngắn hơn 3 ký tự")
            .max(200,"Tên không được vượt quá 200 ký tự"),
        quantity: Yup.number()
            .required("Số lượng không được để trống")
            .min(1, "Số lượng phải lớn hơn 0")
            .typeError("Điểm phải là một số hợp lệ"),
        inputDate: Yup.date()
            .required("Ngày nhập sản phẩm không được để trống")
            .max(new Date(), "Ngày nhập sản phẩm không được lớn hơn ngày hiện tại"),
        categoryId: Yup.string().required("Không được để trống thể loại sản phẩm"),
        price: Yup.number().required("Không được để trống Giá sản phẩm"),
        description: Yup.string().required("Không được để trống mô tả")
    }

    const saveProduct = async (values) => {
        values.quantity = +values.quantity;
        values.category = +values.category;
        values.price = +values.price;
        console.log(values)

        let isSuccess = await productService.saveProduct(values);
        if (isSuccess) {
            toast.success("Thêm mới sản phẩm thành công");
            navigate("/products");
        } else {
            toast.error("Thêm mới sản phẩm thất bại.");
        }
    };

    return (
        <div className="container">
            <h1>Thêm mới sản phẩm</h1>
            <Formik initialValues={initialValues} onSubmit={saveProduct} validationSchema={Yup.object(objectValid)}>
                <Form>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Mã sản phẩm</label>
                        <Field
                            name="code"
                            type="text"
                            className="form-control w-50"
                            id="code"
                        />
                        <ErrorMessage className="error" name="code" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                        <Field
                            name="name"
                            type="text"
                            className="form-control w-50"
                            id="name"
                        />
                        <ErrorMessage className="error" name="name" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoryID" className="form-label">Chọn thể loại sản phẩm</label>
                        <Field as="select" name="categoryId" className="form-control w-50" id="categoryID">
                            <option value="">Chọn thể loại</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage className="error" name="category" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Giá tiền</label>
                        <Field
                            name="price"
                            type="number"
                            className="form-control w-50"
                            id="price"
                        />
                        <ErrorMessage className="error" name="price" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Số lượng</label>
                        <Field
                            name="quantity"
                            type="number"
                            className="form-control w-50"
                            id="quantity"
                        />
                        <ErrorMessage className="error" name="quantity" component="p"></ErrorMessage>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="inputDate" className="form-label">Ngày Nhập sản phẩm</label>
                        <Field
                            name="inputDate"
                            type="date"
                            className="form-control w-50"
                            id="inputDate"
                        />
                        <ErrorMessage className="error" name="inputDate" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Mô tả sản phẩm</label>
                        <Field
                            name="description"
                            as="textarea"
                            className="form-control w-50"
                            id="description"
                        />
                        <ErrorMessage className="error" name="description" component="p"></ErrorMessage>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <button type='submit' className="btn btn-primary">Thêm mới sản phẩm</button>
                        <Link className="btn btn-success" to="/">Trở lại trang chủ</Link>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default ProductCreate;