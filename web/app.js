import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter, Route, Link } from 'react-router-dom'

import First from './containers/First'
import Second from './containers/Second'
import Home from './containers/Home'
import Script from './containers/Script'
import Board from './containers/Board'
import Page from './containers/Page'
import Empty from './statics/Empty'
import MyPage from './containers/MyPage'
import Search from './containers/Search'
import Header from './statics/Header'

ReactDOM.render(
    <BrowserRouter>
	<div>
		<Header/>
		<Route exact path='/' component={ Home } />
        <Route path='/first' component={ First } />
        <Route path='/second' component={ Second } />
		<Route path='/script' component={ Script } />
		<Route path='/board/:page' component={ Board } />
		<Route exact path='/board' component={ Empty } />
		<Route path='/search/:query' component={ Search } />
		<Route exact path='/search' component={ Empty } />
		<Route path='/page/:page' component={ Page } />
		<Route exact path='/page' component={ Empty } />
		<Route path='/mypage' component={ MyPage } />
		</div>
    </BrowserRouter>
    , document.getElementById('root')
);
