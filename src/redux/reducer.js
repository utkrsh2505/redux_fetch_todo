import { actionConstants } from "./actions";
const initState = {
  todos: [],

  isLoading: true,
  isError: false
};
function reducer(state = initState, action) {
  switch (action.type) {
    case actionConstants.ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    }
    case actionConstants.REMOVE_TODO_ITEM: {
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action?.payload?.id)
      };
    }
    case actionConstants.TOGGLE_TODO_ITEM: {
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: !item.status }
            : item
        )
      };
    }
    case actionConstants.GET_TODO_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case actionConstants.GET_TODO_SUCCESS: {
      return {
        ...state,
        todos: action.payload.todos,
        isLoading: false
      };
    }
    case actionConstants.GET_TODO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    }

    default:
      return state;
  }
}
export default reducer;
