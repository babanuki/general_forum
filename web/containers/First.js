import React, { Component, Fragment } from 'react'
import queryString from 'query-string'
import axios from 'axios'

export default class First extends Component {
	state={
		key:""
	}

	getSearch=async()=>{
		const tmp=this.props.location.search.split("=")[1];

		this.setState({key:tmp});
	}

	componentWillMount(){
		this.getSearch();
	}

    render() {
		const key=this.state.key

        return (
            <Fragment>
			<br/><br/>
			Searching keyword : {this.state.key}
			</Fragment>
        );
    }
}
