import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem("cartData")) ? JSON.parse(localStorage.getItem("cartData")) : [],
    totalQuantity: 0,
    totalAmount: 0,
    selectedQuantities: JSON.parse(localStorage.getItem("selectedQuantities")) || {},
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            
            // Save selected quantity per item
            if (newItem.quantity) {
                state.selectedQuantities[newItem.id] = newItem.quantity;
                localStorage.setItem("selectedQuantities", JSON.stringify(state.selectedQuantities));
            }
            
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: newItem.quantity || 1,
                    totalPrice: newItem.price * (newItem.quantity || 1),
                    image: newItem.images[0],
                    selectedColor: newItem.selectedColor,
                    selectedSize: newItem.selectedSize
                });
                localStorage.setItem("cartData", JSON.stringify(state.items))
            } else {
                existingItem.quantity = newItem.quantity || existingItem.quantity + 1;
                existingItem.totalPrice = newItem.price * existingItem.quantity;
            }
            state.totalAmount += newItem.price * (newItem.quantity || 1);

            localStorage.setItem("cartData", JSON.stringify(state.items))
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.totalPrice;
                state.items = state.items.filter(item => item.id !== id);
                
                // Remove selected quantity tracking
                delete state.selectedQuantities[id];
                localStorage.setItem("selectedQuantities", JSON.stringify(state.selectedQuantities));
            }
            localStorage.setItem("cartData", JSON.stringify(state.items))
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            state.selectedQuantities = {};
            localStorage.setItem("cartData", JSON.stringify(state.items))
            localStorage.setItem("selectedQuantities", JSON.stringify({}))
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item && quantity > 0) {
                const priceDifference = item.price * (quantity - item.quantity);
                state.totalAmount += priceDifference;
                state.totalQuantity += (quantity - item.quantity);
                item.quantity = quantity;
                item.totalPrice = item.price * quantity;
                
                // Update selected quantity
                state.selectedQuantities[id] = quantity;
                localStorage.setItem("selectedQuantities", JSON.stringify(state.selectedQuantities));
                localStorage.setItem("cartData", JSON.stringify(state.items))
            }
        }
    },
});

export const { addItem, removeItem, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;