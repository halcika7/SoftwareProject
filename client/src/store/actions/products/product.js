import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { returnProductDataOnError } from '../../../helpers/product';
import { logoutUser } from '../auth/login';

export const addProduct = (formData, config, callBack) => async dispatch => {
  dispatch({ type: actionTypes.PRODUCT_START });
  const token = localStorage.jwtToken;
  const productData = returnProductDataOnError(formData);
  const configuration = {
    headers: { Authorization: token, ...config.headers }
  };
  const response = await axios.post(
    '/products/product/addproduct',
    formData,
    configuration
  );
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
  }
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      productData,
      failedMessage: response.data.failedMessage
    });
  } else if (response.data.errors) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      productData,
      errors: response.data.errors
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      successMessage: response.data.successMessage
    });
  }
};

export const getBannerProducts = () => async dispatch => {
  // dispatch({ type: actionTypes.PRODUCT_START });
  const response = await axios.get('/products/product/getbannerproducts');
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      bannerProducts: response.data.bannerProducts
    });
  }
};

export const getFeaturedProducts = () => async dispatch => {
  // dispatch({ type: actionTypes.PRODUCT_START });
  const response = await axios.get('/products/product/getfeaturedproducts');
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      featuredProducts: response.data.featuredProducts
    });
  }
};

export const getTopSellingProducts = () => async dispatch => {
  // dispatch({ type: actionTypes.PRODUCT_START });
  const response = await axios.get('/products/product/gettopsellingproducts');
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      topSellingProducts: response.data.topSellingProducts
    });
  }
};

export const getOurProducts = () => async dispatch => {
  // dispatch({ type: actionTypes.PRODUCT_START });
  const response = await axios.get('/products/product/getourproducts');
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      ourProducts: response.data.ourProducts
    });
  }
};

export const getDailyOfferProducts = () => async dispatch => {
  // dispatch({ type: actionTypes.PRODUCT_START });
  const response = await axios.get('/products/product/getdailyofferproducts');
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      dailyOffer: response.data.dailyOffer
    });
  }
};

export const getWeeklyOfferProducts = () => async dispatch => {
  // dispatch({ type: actionTypes.PRODUCT_START });
  const response = await axios.get('/products/product/getweeklyofferproducts');
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      weeklyOffer: response.data.weeklyOffer
    });
  }
};

export const getNewProducts = () => async dispatch => {
  // dispatch({ type: actionTypes.PRODUCT_START });
  const response = await axios.get('/products/product/getnewproducts');
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      newProducts: response.data.newProducts
    });
  }
};

export const homePageProducts = () => async dispatch => {
  dispatch({ type: actionTypes.PRODUCT_START });
  dispatch(getBannerProducts());
  dispatch(getFeaturedProducts());
  dispatch(getTopSellingProducts());
  dispatch(getOurProducts());
  dispatch(getDailyOfferProducts());
  dispatch(getWeeklyOfferProducts());
  dispatch(getNewProducts());
};

export const getProduct = id => async dispatch => {
  // dispatch({ type: actionTypes.PRODUCT_START });
  const response = await axios.get('/products/product/getproduct?id=' + id);
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      singleProduct: response.data.product,
      similarProducts: response.data.similarProducts
    });
  }
};

export const getAllProducts = id => async dispatch => {
  dispatch({ type: actionTypes.PRODUCT_START });
  const response = await axios.get('/products/product/getallproducts');
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      products: response.data.products
    });
  }
};

export const deleteProduct = (id, name, callBack) => async dispatch => {
  dispatch({ type: actionTypes.PRODUCT_START });
  const token = localStorage.jwtToken;
  const response = await axios.delete(
    `/products/product/deleteproduct?id=${id}&name=${name}`,
    {
      headers: { Authorization: token }
    }
  );
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
  }
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      successMessage: response.data.successMessage,
      products: response.data.products
    });
  }
};

export const clearSingleProduct = () => async dispatch => {
  dispatch({
    type: actionTypes.PRODUCT_SUCCESS,
    singleProduct: {}
  });
};

export const searchProducts = query => async dispatch => {
  // dispatch({ type: actionTypes.PRODUCT_START });
  const response = await axios.get(
    '/products/product/serachforproduct?query=' + query
  );
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PRODUCT_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PRODUCT_SUCCESS,
      loading: true
    });

    {
      dispatch({
        type: actionTypes.PRODUCT_SUCCESS,
        searchedProducts: response.data.products
      });
    }
  }
};
