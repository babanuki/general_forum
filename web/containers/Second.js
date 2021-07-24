import React, { Component, Fragment } from 'react'
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default class Second extends Component {
	state={
		id:"",
		pw:""
	}

	create=async()=>{
		var ID=this.state.id;
		var PW=this.state.pw;

		if(ID.trim()===""){
			alert("Please fill your ID");

			return;
		}
		if(PW.trim()===""){
			alert("Please fill your PW");

			return;
		}

		if(ID.replace(/ /g, "")!=ID){
			alert("No Blank >:(");

			return;
		}

		if(PW.replace(/ /g, "")!=PW){
			alert("No Blank >:(");

			return;
		}
		PW=encodeURIComponent(PW);

		var res=await axios.post("http://url/create",
				{
					id:ID,
					pw:PW
				}
		);

		if(res.data===1){
			alert("Already registered ID");

			return;
		}
		else{
			alert("Completed to create Account");

			window.location.href='/';
		}
	}

	handleKeyPress=(e)=>{
		if(e.key==='Enter'){
			this.create();
		}
	}

    render() {
        return (
            <Fragment>
				<br/><br/>
				You can make a account in this page :D
				<br/>
				<TextField
					onChange={(event)=>{
						try{
							this.setState({
								id:event.target.value
							});
						}catch(e){}
					}}
					placeholder="ID..."
					onKeyPress={this.handleKeyPress}
				/>
				<br/>
				<TextField
					onChange={(event)=>{
						try{
							this.setState({
								pw:event.target.value
							});
						}catch(e){}
					}}
					placeholder="PW..."
					onKeyPress={this.handleKeyPress}
					type="password"
				/>
				<br/>
				<Button
					onClick={this.create}
				>Create Account</Button>
			</Fragment>
        );
    }
}
