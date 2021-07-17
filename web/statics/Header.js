import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Home_title from '../imgs/Home_title.jpg'
import '../style/Header.css'

export default class Header extends Component{
	logout=()=>{
		const ID=window.sessionStorage.getItem("userInfo");

		if(ID==null){
			alert("You need to log-in to start log-out :)");

			return;
		}

		window.sessionStorage.clear();

		window.location.href="/";
	}

	render(){
		const ID=window.sessionStorage.getItem("userInfo");

		return(
			<div className="header-container">
				<img src={Home_title}/>
				<p/>
				<Button
					onClick={this.logout}
					color="secondary"
					variant="contained"
				>LOGOUT</Button>
				<p/>
				<nav className="web-menu">
				{
					(function(){
						if(ID==null){
							return(
								<Link to="/" style={{textDecoration:'none'}} className="menu-item">홈</Link>
							);
						}
						else{
							return(
								<Link to="/mypage" style={{textDecoration:'none'}} className="menu-item">홈</Link>
							);
						}
					})()
				}
					<Link to='/script' style={{textDecoration:'none'}} className="menu-item">게시글 작성</Link>
					<Link to='/board/1' style={{textDecoration:'none'}} className="menu-item">최근 글 확인</Link>
				</nav>
				<br/>
			</div>
		);
	}
}
