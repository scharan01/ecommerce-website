import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState : {
        products : [],
        quantity : 0,
        total : 0,
    },
    reducers : {
        addProduct : (state,action)=>{
            
            for(let i=0;i<state.products.length;i++){
                if(state.products[i]._id === action.payload._id && state.products[i].color === action.payload.color && state.products[i].size === action.payload.size){
                    state.products[i].amount += action.payload.amount;
                    state.total += action.payload.price*action.payload.amount;
                    return;
                }
            }

            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price*action.payload.amount;
        },
        modifyProductQuantity : (state,action)=>{
            for(let i=0;i<state.products.length;i++){
                if(state.products[i]._id === action.payload._id){
                    if(action.payload.val === "inc"){
                        state.products[i].amount += 1;
                        state.total += action.payload.price;
                    }else{
                        state.products[i].amount -= 1;
                        state.total -= action.payload.price;
                    }
                }
            }
        },
        removeProduct : (state,action)=>{
            for(let i=0;i<state.products.length;i++){
                if(state.products[i]._id === action.payload._id && state.products[i].color === action.payload.color && state.products[i].size === action.payload.size){
                    state.products.splice(i,1);
                    state.total -= action.payload.price*action.payload.amount;
                    state.quantity -= 1;
                }
            }
        },

        clearstate : (state) =>{
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    }
})

export const {addProduct,modifyProductQuantity,clearstate,removeProduct} = cartSlice.actions;
export default cartSlice.reducer;
