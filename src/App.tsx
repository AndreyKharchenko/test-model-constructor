import './App.css'
import { ParamEditor } from './components'
import { model, params } from './mocks'

function App() {

  return (
    <>
      <ParamEditor params={params} model={model} />
    </>
  )
}

export default App
