import App from 'next/app'
import Layout from '../components/Layout'
import MyContext from '../lib/my-context'
import { Provider } from 'react-redux'
import store from '../store/store'
import hoc from '../lib/with-redux'
// import 'antd/dist/antd.css' // babelrc里配置了就可以不写

// 自定义app
class myApp extends App {
  state = {
    msg: '全局的',
    context: 'value'
  }

  // 这个方法每次页面切换都会调用
  static async getInitialProps(ctx) {
    const {Component} = ctx
    let pageProps
    // 自义定app后,如果页面有用到getInitialProps,则需要手动从这里传过去
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props // Component对应的是页面

    return (
      <Layout>
        <Provider store={reduxStore}>
          <MyContext.Provider value={this.state.context}>
            <Component {...pageProps}></Component>
            <button
              onClick={() =>
                this.setState({ context: `000${this.state.context}000` })
              }
            >
              update context
            </button>
          </MyContext.Provider>
        </Provider>
      </Layout>
    )
  }
}

export default hoc(myApp)
