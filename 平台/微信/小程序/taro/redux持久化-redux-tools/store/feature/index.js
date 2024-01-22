import { combineReducers } from 'redux'
import counterSlice from '@/store/feature/count'

// 合并 reducer
export const reducers = combineReducers({
  counter: counterSlice,
})
