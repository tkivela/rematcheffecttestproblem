import { h, render } from 'preact' // eslint-disable-line
import { init } from '@rematch/core'
import { Provider } from 'preact-redux'

import * as models from './models'
import App from './components/App'

if (module.hot) {
  require('preact/devtools')
}

const store = init({
  models
})

const RematchApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

const mountNode = document.getElementById('root')

render(<RematchApp />, mountNode, mountNode.lastChild)
