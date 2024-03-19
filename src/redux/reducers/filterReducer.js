import { TOGGLE_BRAND } from "../actionTypes/actionTypes";

export const initialState = {
  filters: {
    brands: [],
    stock: false,
  },
  keyword: "",
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_BRAND:
      return {
        ...state,
        filters: {
          ...state.filters,
          brands: [...state.filters.brands, action.payload],
        },
      };
      default:
        return state
  }
};
