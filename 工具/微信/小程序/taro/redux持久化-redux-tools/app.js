import { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persist } from './store'
import './app.less'
import './utils/monitor'

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          {/* 解决taro小程序 onLoad加载时候获取不到页面实例的情况 */}
          {/*eslint-disable-next-line*/}
          {(isLoading) => this.props.children}
        </PersistGate>
      </Provider>
    )
  }
}

export default App
