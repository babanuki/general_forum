import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import '../style/Search.css'

export default class Search extends Component{
	state={
		List:{},
		search:""
	}

	find=async()=>{
		var q=this.props.match.params.query;

		if(q==null || q.trim()==""){
			alert("Invalid search term");

			history.go(-1);

			return;
		}

		var res=await axios.post("http://url/q",{
			query:q
		});

		if(res.data===1){
			alert("An Error Occurs");

			return;
		}

		this.setState({
			List:res
		});
	}

	componentWillMount=()=>{
		this.find();
	}

	search=()=>{
		var q=this.state.search;

		if(q==""){
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
		var Queue=[];

		for(var i in this.state.List.data){
			Queue.push(
				<Fragment>
					<td className="list-title">
						<a key={i} href={"/page/"+this.state.List.data[i].id}>
							&nbsp;&nbsp;{this.state.List.data[i].title}
						</a>
					</td>
					<td className="list-author">
						{this.state.List.data[i].uploader}
					</td>
					<td className="list-date">
						{this.state.List.data[i].time_stamp}
					</td>
				</Fragment>
			);
			Queue.push(<br key={-i-1}/>);
		}

		return Queue;
	}

	render(){
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
				/>
				&nbsp;&nbsp;
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
			</div>
		);
	};


}
