import React, {Component, Fragment} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import '../style/Page.css' 

export default class Page extends Component{
	state={
		elim:0,
		page:{},
		comment:"",
		comment_id:"",
		delete_code:""
	}

	getPage=async()=>{
		var ID=this.props.match.params.page;

		var res=await axios.post("http://1.232.80.181:5555/page", {
			id:ID
		});

		if(res===1){
			alert("That Page doesn't exist");

			return;
		}

		this.setState({
			page:res
		});
	}

	pushComment=async()=>{
		const tmp=this.state.comment;
		const ID=this.props.match.params.page;
		var userID1=window.sessionStorage.getItem("userInfo");
		var userID2=this.state.comment_id;
		
		var userID=(userID1==null?userID2:JSON.parse(userID1)["id"]);
		var userPW=(userID1==null?this.state.delete_code:encodeURIComponent(JSON.parse(userID1)["pw"]));

		if(tmp.trim()==""){
			alert("Please type your comment");

			return;
		}

		if(userID.trim()==""){
			alert("Please type your ID");

			return;
		}

		if(userPW.trim()==""){
			alert("Please type your code");

			return;
		}

		if(userID.replace(/ /g, "")!=userID){
			alert("Please remove blank in your ID");

			return;
		}

		if(userPW.replace(/ /g, "")!=userPW){
			alert("Please remove blank in your code");

			return;
		}

		var res=await axios.post("http://1.232.80.181:5555/comment1", {
			q:tmp,
			script:ID,
			comment_id:userID,
			delete_code:userPW
		});

		if(res.data==1){
			alert("failed to give a comment :(");

			return;
		}

		window.location.reload();
	}

	componentWillMount(){
		this.getPage();
	}

	deletePage=async()=>{
		var PW=prompt("Please type your delete code");

		PW=encodeURIComponent(PW);

		var res=await axios.post("http://1.232.80.181:5555/delete_page", {
			id:this.props.match.params.page,
			code:PW
		});

		if(res.data==1){
			alert("failed to delete the page :(");

			return;
		}

		alert("this page is deleted");

		window.location.href="/board/1";
	}

	close=async()=>{
		var PW=prompt("Please type your delete code");	

		PW=encodeURIComponent(PW);

		var res=await axios.post("http://1.232.80.181:5555/delete_comment1", {
			id:this.state.elim,
			code:PW
		});

		if(res.data==1){
			alert("failed to delete the comment :(");

			return;
		}

		alert("that comment is deleted");

		window.location.reload();

		return;
	}

	printPage=()=>{
		var List=[];
		var tmp=this.state.page;

		if(JSON.stringify(tmp)=="{}")
			return;

		List.push(<br/>);
		List.push(<textarea className="page_title" wrap="soft" disabled readOnly value={tmp.data.page.title}/>);
		List.push(<textarea className="deleteButton" readOnly
			onClick={this.deletePage} value="X"/>);
		
		if(tmp.data.page.img!=null){
			List.push(<br/>);
			List.push(<img className="imgTag" src={"http://1.232.80.181:5555/"+tmp.data.page.img}/>);
		}
		List.push(<br/>);
		List.push(<h5>{tmp.data.page.inner_text}</h5>);

		List.push(<br/>);
		List.push(<br/>);

		for(var i in tmp.data.comment){
			List.push(
				<div>
					<textarea className="comment_text" value={tmp.data.comment[i].comment} readOnly disabled />
					<textarea className="commentor" value={tmp.data.comment[i].uploader} readOnly disabled />
					<textarea className="comment_date" value={tmp.data.comment[i].time_stamp} readOnly disabled />
					<textarea name={tmp.data.comment[i].id} className="closeButton" value="X" readOnly
						onClick={
							(event)=>{
								this.setState({
									elim:event.target.name
								}, function(){
									this.close();
								});
							}
						}
					/>
					<br/>
				</div>
			);
		}
		
		return List;
	}

	handleKeyPress=(e)=>{
		if(e.key=='Enter'){
			this.pushComment();
		}
	}

	render(){
		const ID=window.sessionStorage.getItem("userInfo");

		return(
			<div className="page-style">
				{this.printPage()}

				<br/><br/>

				<TextField
					onChange={(event)=>{
						try{
							this.setState({
								comment:event.target.value
							});
						}catch(e){}
					}}
					onKeyPress={this.handleKeyPress}
					placeholder="Comment..."
					variant="outlined"
					fullWidth
				/>
				<br/>
				<TextField
					variant="outlined"
					disabled={ID==null?false:true}
					value={ID==null?null:JSON.parse(ID)["id"]}
					placeholder="ID..."
					onChange={(event)=>{
						try{
							this.setState({
								comment_id:event.target.value
							}, function(){
								console.log(this.state.comment_id);
							});;
						}catch(e){}
					}}
				/>
				<TextField
					variant="outlined"
					type="password"
					disabled={ID==null?false:true}
					value={ID==null?null:JSON.parse(ID)["pw"]}
					placeholder="PW..."
					onChange={(event)=>{
						try{
							this.setState({
								delete_code:event.target.value
							}, function(){
								console.log(this.state.delete_code);
							});
						}catch(e){}
					}}
				/>
				<Button
					onClick={this.pushComment}
					color="primary"
					variant="contained"
				>Comment</Button>

			</div>
		);
	}
}
