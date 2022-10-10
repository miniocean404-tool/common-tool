import thunk from 'redux-thunk' // 使得 redux 自动处理异步 action
import { createLogger } from 'redux-logger'

export const middleware = [thunk, process.env.NODE_ENV === 'development' && createLogger()]
