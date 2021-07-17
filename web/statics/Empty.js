import React, {Component, Fragment} from 'react'

export default class Empty extends Component{
	render(){
		alert("invalid request");

		history.go(-1);

		return;
	}
}
