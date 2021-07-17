import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import '../style/Board.css'

export default class Board extends Component{
	state={
		page:0,
		search:"",
		list:{}
	}

	getPage=async()=>{
		var Page=this.props.match.params.page;

		if(Page<1){
			alert("this page doesn't exist");

			return;
		}

		var res=await axios.post("http://1.232.80.181:5555/list", {
			page:Page
		});

		if(res.data===1){
			alert("this page doesn't exist");

			history.go(-1);

			return;
		}

		this.setState({
			list:res
		});
	}

	componentWillMount(){
		this.getPage();
	}

	search=()=>{
		var q=this.state.search;

		if(q.trim()==""){
			alert("Please enter your search term");

			return;
		}

		window.location.href="/search/"+q;
	}

	handleKeyPress=(e)=>{
		if(e.key==='Enter'){
			this.search();
		}
	}

	printPage=()=>{
		var List=[];

		for(var i in this.state.list.data){
			List.push(
				<Fragment>
					<td className="list-title">
						<a key={i} href={"/page/"+this.state.list.data[i].id}>
							&nbsp;&nbsp;{this.state.list.data[i].title}
						</a>
					</td>
					<td className="list-author">
						{this.state.list.data[i].uploader}
					</td>
					<td className="list-date">
						{this.state.list.data[i].time_stam}
					</td>
				</Fragment>
			);
			List.push(<br key={-i-1}/>);
		}

		return List;
	}

	previousPage=()=>{
		var before=(this.props.match.params.page)*1-1;

		if(before<1){
			alert("invalid page");

			return;
		}

		window.location.href="/board/"+before;
	}

	nextPage=()=>{
		var after=(this.props.match.params.page)*1+1;

		window.location.href="/board/"+after;
	}

	render(){
		var after="/board/"+((this.props.match.params.page)*1+1);
		return(
			<div className="board-style">
				<br/>
				<TextField
					onChange={(event)=>{
						try{
							this.setState({
								search:event.target.value
							});
						}catch(e){}
					}}
					onKeyPress={this.handleKeyPress}
					placeholder="Search..."
				/>&nbsp;&nbsp;
				<Button
					onClick={this.search}
					color="secondary"
					variant="contained"
				>Search</Button>
				<br/><br/><br/>
				<center>
					<td className="board-title">제목</td>
					<td className="board-author">작성자</td>
					<td className="board-date">작성일자</td>
					{this.printPage()}
				</center>
				<br/><br/>
				<center>
				<div>
				<Button
					variant="contained"
					color="primary"
					onClick={this.previousPage}
				>Previous</Button>
				&nbsp;&nbsp;
				<Button
					variant="contained"
					color="primary"
					onClick={this.nextPage}
				>Next</Button>
				</div>
				</center>
			</div>
		);
	};
}
