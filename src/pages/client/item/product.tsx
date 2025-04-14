import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { IProduct } from "../../../inface/product";
import StarProduct from "./rating";
import { TypeCart } from "../../../inface/cart";
import { useContext } from "react";
import { cartContext } from "../../../conText/cartContext";
import { message } from "antd";
import axios from "axios";

type Props = {
    products: IProduct;
};


const ItemProduct = ({ products }: Props) => {
    const {dispatch} = useContext(cartContext)
    
    const addTocart = async (productid: number) => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token hiện tại:", token); 

            if (!token) {
                message.error("Bạn cần đăng nhập để thêm vào giỏ hàng!");
                return;
            }

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };

            const cart = {
                "productId": productid,
                "quantity": 1
            };

            const { data } = await axios.post(`http://localhost:3000/carts`, cart, config);
            dispatch({ type: TypeCart.updateCart, payload: data.data.Items });
            message.success("Thêm giỏ hàng thành công");
        } catch (error: any) {
            console.log("Lỗi API:", error);
            if (error.response && error.response.status === 401) {
                message.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
            } else {
                message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
            }
        }
    }

    return (
        <div key={products.id || products.name} className="bg-white flex flex-col h-[400px]">
            <div className="relative bg-gray-100 icon-container h-[300px] flex items-center justify-center">
                <img
                    src={products.image}
                    alt={products.name}
                    className="max-h-full max-w-full object-contain p-4"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                    <AiOutlineHeart className="w-9 h-9 rounded-full bg-white p-2 hover:bg-gray-100 transition-colors" />
                    <Link to={`/detail/${products.id}`}>
                        <AiOutlineEye className="w-9 h-9 rounded-full bg-white p-2 hover:bg-gray-100 transition-colors" />
                    </Link>
                </div>
                    <button
                        onClick={async () => {
                            await addTocart(products.id);
                            dispatch({ type: TypeCart.openSidebar, payload: true });
                        }}
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2
                        bg-black text-white font-semibold py-2 px-6 add-to-cart z-10 w-full"
                    >
                        Add To Cart
                    </button>
            </div>

            <div className="py-4 flex flex-col flex-grow">
                <h3 className="mt-2 font-semibold text-gray-800 line-clamp-2">{products.name}</h3>
                <div className="flex items-center mt-2 text-yellow-300">
                    <p className="text-red-500 font-semibold text-lg pr-2">${products.price}</p>
                    <StarProduct score={products.rating} />
                    <span className="ml-2 mb-0.5 text-gray-600">(35)</span>
                </div>
            </div>
        </div>
    )
};

export default ItemProduct;