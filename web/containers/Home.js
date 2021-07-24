import React, { Component, Fragment } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Home_title from '../imgs/Home_title.jpg'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Second from './Second'

export default class Home extends Component{
	state={
		id:"",
		pw:"",
		key:""
	}

	search=()=>{
		var tmp=this.state.key;

		if(tmp.trim()===""){
			alert("Please type a keyword");

			return;
		}

		tmp=encodeURIComponent(tmp);

		window.location.href='/first?key='+tmp;
	}

	login=async()=>{
		var ID=this.state.id;
		var PW=this.state.pw;

		if(ID.trim()===""){
			alert("Please type your ID");

			return;
		}
		if(PW.trim()===""){
			alert("Please type your PW");

			return;
		}

		PW=encodeURIComponent(PW);

		var res=await axios.post("http://url/login", {
				id:ID,
				pw:PW
			}
		);

		if(res.data===2){
			alert("No such User");

			return;
		}
		else if(res.data===1){
			alert("Wrong Password");

			return;
		}
		else{
			alert("Welcome, "+ID);

			const userObj={
				id:ID,
				pw:PW
			};

			window.sessionStorage.setItem("userInfo", JSON.stringify(userObj));

			window.location.href="/board/1";

			return;
		}
	}

	handleKeyPressSearch=(e)=>{
		if(e.key==='Enter'){
			this.search();
		}
	}

	handleKeyPressLogin=(e)=>{
		if(e.key==='Enter'){
			this.login();
		}
	}

	render(){
		const ID=window.sessionStorage.getItem("userInfo");

		return(
			<div className="board-style">
				<br/>
				<center><h1>LOGIN</h1></center>
				<p/><p/>
				<div className="textfield">
				<center>
					<TextField
						variant="outlined"
						onChange={(event)=>{
							try{
								this.setState({id:event.target.value});
							}catch(e){}
						}}
						placeholder="ID..."
						onKeyPress={this.handleKeyPressLogin}
					/><br/><br/>
					<TextField
						variant="outlined"
						onChange={(event)=>{
							try{
								this.setState({pw:event.target.value});
							}catch(e){}
						}}
						placeholder="PW..."
						type="password"
						onKeyPress={this.handleKeyPressLogin}
					/><br/><br/><br/>
				</center>
				</div>
				<center>
				<div>
					<Button
						onClick={this.login}
						color="primary"
						variant="contained"
					>Login</Button>
					&nbsp;&nbsp;
					<Button
						onClick={()=>{window.location.href='/second'}}
						color="secondary"
						variant="contained"
					>Create</Button>
					<br/><br/>
				</div>
				</center>
			</div>
		);
	}
}
