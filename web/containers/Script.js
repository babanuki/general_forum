import React, {Component, Fragment} from 'react'
import axios from 'axios'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default class Script extends Component{
	state={
		title:"",
		inner:"",
		id:"",
		code:"",
		files:null
	}

	send=async()=>{
		var Title=this.state.title;
		var Inner=this.state.inner;
		var ID=this.state.id;
		var Code=this.state.code;
		var imgName=null;
		const formData=new FormData();

		if(window.sessionStorage.getItem("userInfo")!=null){
			ID=JSON.parse(window.sessionStorage.getItem("userInfo"))["id"];
			Code=JSON.parse(window.sessionStorage.getItem("userInfo"))["pw"];
		}

		if(Title.trim()==""){
			alert("Please type a title");

			return;
		}
		if(ID.trim()==""){
			alert("Please type your ID");
			
			return;
		}
		if(Code.trim()==""){
			alert("Please type your code");

			return;
		}
		if(Inner.trim()==""){
			alert("Please type your story");

			return;
		}
		if(ID.replace(/ /g,"")!=ID){
			alert("Please remove blanks in your ID");

			return;
		}
		if(Code.replace(/ /g,"")!=Code){
			alert("Please remove blanks in your code");

			return;
		}

		if(this.state.files!=null){
			formData.append(
				"upload",
				this.state.files[0],
				this.state.files[0].name
			);
	
			const config={
				headers:{"content-type":"multipart/form-data"}
			};
	
			var res=await axios.post('http://1.232.80.181:5555/upload',
						formData,
						config
					);

			if(res.data==1){
				alert("file upload failed");

				return;
			}

			imgName=res.data;

		}

		res=await axios.post("http://1.232.80.181:5555/script", {
			title:Title,
			inner:Inner,
			id:ID,
			code:Code,
			imgName:imgName
		});

		if(res==1){
			alert("Failed to upload your story");
			
			return;
		}
		else{
			alert("Upload is done");

			window.location.href="/board/1";

			return;
		}
	}

	fileChange=event=>{
		const Files=event.target.files;

		this.setState({
			files:Files
		}), function(){
			console.log("");
		};
	}

	render(){
		const ID=window.sessionStorage.getItem("userInfo");

		return(
			<Fragment>
				<br/>
				<TextField
					variant="outlined"
					placeholder="Title"
					onChange={(event)=>{
						try{
							this.setState({
								title:event.target.value
							});
						}catch(e){};
					}}
				/>
				&nbsp;&nbsp;
				<TextField
					variant="outlined"
					placeholder="ID"
					onChange={(event)=>{
						try{
							this.setState({
								id:event.target.value
							});
						}catch(e){};
					}}
					value={ID==null?null:JSON.parse(ID)["id"]}
					disabled={ID==null?false:true}
				/>
				<TextField
					variant="outlined"
					type="password"
					placeholder="code"
					onChange={(event)=>{
						try{
							this.setState({
								code:event.target.value
							});
						}catch(e){}
					}}
					value={ID==null?null:JSON.parse(ID)["pw"]}
					disabled={ID==null?false:true}
				/>
				<br/><br/>
				<input type="file" multiple onChange={this.fileChange} />
				<br/><br/>
				<TextField
					width="50%"
					rows={10}
					multiline
					variant="outlined"
					fullWidth
					placeholder="Your Story"
					onChange={(event)=>{
						try{
							this.setState({
								inner:event.target.value
							}, function(){
								console.log(this.state.inner);
							});
						}catch(e){};
					}}
				/>
				<br/><br/>
				<center>
				<Button
					variant="contained"
					color="primary"
					onClick={this.send}
				>Submit</Button>
				</center>
			</Fragment>
		);
	}
};
