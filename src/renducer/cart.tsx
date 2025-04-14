// cartReducer.ts
import { ICart, TypeCart } from "../inface/cart"; // Chắc chắn rằng TypeCart có các giá trị đúng

export const cartReducer = (state: ICart, action: { type: TypeCart, payload: any }) => {
    switch (action.type) {
        case TypeCart.updateCart:
            return { ...state, carts: action.payload }; // Cập nhật giỏ hàng
        case TypeCart.openSidebar:
            return { ...state, isOpenSidebar: action.payload }; // Mở/đóng sidebar
        default:
            return state;
    }
};
