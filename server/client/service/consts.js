/**
 // All the const values are define here
 **/

// system configs
const SESSION_KEY = 'saddwerfsdgfsrtfewr465623as5f65eswf1';

// API
const BASE_URL = 'http://localhost:5000/api/';

const AUTH_END_POINT = `${BASE_URL}auth`;
const CREATE_USER_END_POINT = `${BASE_URL}user`;
const UPDATE_USER_END_POINT = `${BASE_URL}user`;
const RESET_PASSWORD_END_POINT = `${BASE_URL}user/reset-password`;

const GET_ALL_DELIVERY = `${BASE_URL}delivery/getAll`;
const ADD_DELIVERY = `${BASE_URL}delivery/create`;
const DELETE_DELIVERY = `${BASE_URL}delivery/deleteById/`;
const UPDATE_DELIVERY = `${BASE_URL}delivery/update`;
const GET_DELIVERY_BY_ID = `${BASE_URL}delivery/getById/`;

const GET_ALL_CATEGORIES = `${BASE_URL}category/getAll`;
const ADD_CATEGORY = `${BASE_URL}category/create`;
const GET_CATEGORY_BY_ID = `${BASE_URL}category/getById/`;
const DELETE_CATEGORY = `${BASE_URL}category/deleteById/`;
const UPDATE_CATEGORY = `${BASE_URL}category/update`;

const ADD_ITEM = `${BASE_URL}item/create`;
const GET_ALL_ITEMS = `${BASE_URL}item/getAll`;
const GET_ITEM_BY_ID = `${BASE_URL}item/getById/`;
const DELETE_ITEM = `${BASE_URL}item/deleteById/`;
const UPDATE_ITEM = `${BASE_URL}item/update`;

const GET_CART=`${BASE_URL}cart/getAll`;
const ADD_CART= `${BASE_URL}cart/create`;
const UPDATE_CART = `${BASE_URL}cart/update`;
const DELETE_CART = `${BASE_URL}cart/deleteById/`;
const GET_CART_BY_ID = `${BASE_URL}cart/getById/`;

const ADD_ORDER= `${BASE_URL}order/create`;
const GET_ORDER=`${BASE_URL}order/getAll`;

const ADD_CARD_PAYMENT = 'http://localhost:5100/api/v1/payment/card';
const ADD_PHONE_PAYMENT = 'http://localhost:5100/api/v1/payment/phone';
