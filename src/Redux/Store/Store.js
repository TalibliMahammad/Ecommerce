import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../CreateSlice/Counterslice";
import  AuthSlice  from "../CreateSlice/AuthSlice";
import  fetchDataSlice  from "../CreateSlice/FetchDataSlice";
import  WishList  from "../CreateSlice/WishList";
import cartSlice from "../CreateSlice/CartSlice";


 export const store = configureStore({
    reducer:{

        cartState: cartSlice,
        count:counterSlice,
        auth: AuthSlice,
        fetchData: fetchDataSlice,
        wishList: WishList,
    },
});
