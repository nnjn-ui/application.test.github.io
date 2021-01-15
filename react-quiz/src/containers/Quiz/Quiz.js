import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById} from '../../store/actions/quiz'

class Quiz extends Component {


    onAnswerClickHendler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuistion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuistion: this.state.activeQuistion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)

           
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }

    }

    isQuizFinished() {
        return this.state.activeQuistion +1 === this.state.quiz.length
    }

    retryHendler = () => {
        this.setState({
            activeQuistion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                <h1>Ответить на все вопросы</h1>

                {
                    this.props.loading && this.props.quiz
                        ? <Loader />
                        : this.props.isFinished
                            ? <FinishedQuiz 
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.retryHendler}
                            />
                            :  <ActiveQuiz 
                            answers={this.props.quiz[this.props.activeQuistion].answers}
                            question={this.props.quiz[this.props.activeQuistion].question}
                            onAnswerClick={this.onAnswerClickHendler}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuistion + 1}
                            state={this.props.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}

function maStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuistion: state.quiz.activeQuistion,
        answerState: state.quiz.answerState, 
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById())
    }
}

export default connect(maStateToProps, mapDispatchToProps)(Quiz)