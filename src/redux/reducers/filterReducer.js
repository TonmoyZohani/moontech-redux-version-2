import { TOGGLE_BRAND } from "../actionTypes/actionTypes";

const initialState = {
  filter: {
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
        filter: {
          ...state.filter,
          brand: [...state.filter.brands, action.payload],
        },
      };
  }
};
