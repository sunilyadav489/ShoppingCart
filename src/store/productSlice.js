import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const STATUSES = Object.freeze({
    LOADING: 'loading',
    IDLE: 'idle',
    ERROR: 'error',
})

const productSlice = createSlice({
    name: 'product',
    initialState:{
        data: [],
        status: STATUSES.IDLE
    },
    reducers:{
        // add (state, action) {
        //     //old redux core 
        //     // return [...state, action.payload]
        //     state.push(action.payload);            
        // },
        // remove (state, action) {
        //     return state.filter(item => item.id !== action.payload);
        // }

        //basic core thunk
        // setProducts (state, action) {
        //     state.data = action.payload;
        // },
        // setStatus (state, action) {
        //     state.status = action.payload
        // }
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {                
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
    }
});

// export const {add, remove} = cartSlice.actions;
export const {setProducts, setStatus} = productSlice.actions;

export default productSlice.reducer;


//RTK data fetching

export const fetchProducts = createAsyncThunk('product/fetch', async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
})

//Basic core Thunk..fetching & stroing data in store using thunk
// export function fetchProducts () {
//     return async function fetchProductThunk (dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING))
//         try {
//             const res = await fetch("https://fakestoreapi.com/products");
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch(err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }

// }