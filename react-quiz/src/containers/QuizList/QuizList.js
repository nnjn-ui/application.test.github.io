import React, {Component} from 'react'
import classes from './QuizList.css'

export default class QuizList extends Component {

    renderQuizes() {
        return [1, 2, 3].map(() => {
            return (
                <li key={index}>
                    <NavLink> 
                        Тест {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    <ul>
                        { this.renderQuizes() }
                    </ul>
                </div>
            </div>
        )
    }
}