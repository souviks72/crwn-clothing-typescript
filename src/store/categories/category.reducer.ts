import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { CategoryAction } from "./category.action";
/*
- Our categories reducer wmust react only to category related actions
- There are only 3 category action types possible
- So we must type our category actions to emit specific category type actions
- We must type our category reducers to react only to category type actions
*/

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};
//these values are readonly because we don't edit state values
//we simply create new objects for the state data and return the new objects

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as CategoryAction // Discriminatory Union --> will accept action of this union type only
) => {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
/*
PROBLEM with DISCRIMINATORY UNION in REDUX----------------------------------------------
- when an action is fired, redux passes the action to ALL reducers
- this means actions of user will also pass though CategoriesReducer
- However, since we have already used a Discriminatory Union, Ts thinks that only
  CategoryAction types will pass through this reducer. If we remove the default case in
  switch{} Ts will not throw error because of this
- This is will cause problems
- SOLUTION: Use a MatchAble/ Type Predicate Functions
//https://medium.com/@thomas.laforge/typescript-type-predicate-d9b8c4a15569
- Since everything, including functions in Js are objects, we can assign addtional properties on them
- So we will add on to our action creators an additonal duty --> to perform type checking for incoming 
  actions against the action type they themselves hold
*/
