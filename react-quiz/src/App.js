import React, { Component } from 'react';
import Layuot from './hoc/Layout/Layout'
import {Route, Switch} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'

class App extends Component {
  render() {
    return (
      <Layuot>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" component={QuizList} />

        </Switch>

      </Layuot>
    );
  }
}

export default App
