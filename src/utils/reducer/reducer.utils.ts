import { AnyAction } from "redux";
/*
- AnyAction is an interface that extends the Action interface
- Action interface looks a lot like out Action type
- AnyAction extends that to include additional properties(like payload) 
*/

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
}; //AC --> ActionCreator

//------------INTERSECTION-----------------------------------------------------------
type Human = {
  name: string;
};

type Alien = {
  canFly: boolean;
};

type Hybrid = Human & Alien;
//this is an intersection, meaning hybrid will have both "name" and "canFly" properties
//--------------------------------------------------------------------------------------

type MyFunc = () => number;
type MyReturn = ReturnType<MyFunc>;
/*ReturnType is a KEYWORD in Ts, which gives us the type of something
 */

/*
- In Js this function(createAction) is just generating an object with two keys
- The "type" is a string for action type
- Payload is an object and can have many values
- We need to type this in such a way that everytime we call this with
  specific action type and payload it gives us an object of that special type
*/

/*
- In Js we can have payload in the actions object as undefined
- In fact in Js and Python we often makes decisions based on 
  whether something is undefined or not
- In typescript that won't work, we have to change our thinking
- Actions with payloads are different from those without
*/
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

/*
- If there is payload, action of type ActionWithPayload will be returned
- Else Action type will be returned
- We need one function --> createAction to do this
- So we use function overloading
- In ts, function overloading requires all signatures to have same number of params
- We can use void type to denote that payload won't be there
- We will define a function and then there will be separate function signatures
  for the purpose of overloading
*/
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
