import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Editor from '../Editor'
import Toolbar from '../Toolbar'

export default function App () {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/d/${uuidv4()}`} />
        </Route>
        <Route path="/d/:did" exact>
          <div>
            <Toolbar />
            <Editor />
          </div>
        </Route>
      </Switch>
    </Router>
  )
}
