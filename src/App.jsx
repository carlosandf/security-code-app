import React from 'react';
import { UseState } from '@components/UseState';
import { UseReducer } from '@components/UseReducer';
import './App.css'

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />
      <UseReducer name="Use Reducer" />
    </div>
  )
}
export default App;