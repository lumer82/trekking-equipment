// import { Action } from '@ngrx/store';
// import { EntityAdapter, EntityState } from '@ngrx/entity';
//
// export function reducerDelegate<T, V>(state: EntityState<T>,
//                                       action: Action,
//                                       selector: (T) => V,
//                                       delegateReducer: (V, action: Action) => V,
//                                       adapter: EntityAdapter<T>): EntityState<T> {
//   Object.values(state.entities).forEach(e => {
//     const delegateState = delegateReducer(selector(e), action);
//     if (delegateState !== selector(e)) {
//       state = adapter.updateOne({ id: e.id, changes: {...e, delegateState}}, state);
//     }
//   });
//   return state;
// }
