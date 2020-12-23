import axios from 'axios';
import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL} from '../Constance/ProductContance';

// thunk create a function in a function

export const listProducts = ()=> async(dispatch)=> {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

    const {data} = await axios.get('api/products')

    dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data
    })
    } catch (error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message : error.message, 
        })
    }
    
}