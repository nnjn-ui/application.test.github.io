import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'react-redux'
import {Provider} from 'react-redux'
import rootReducer from './store/reducers/rootReducer'

const store = createStore(rootReducer)


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>  
    </Provider> 
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
