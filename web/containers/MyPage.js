import React, {Component, Fragment} from 'react'

export default class MyPage extends Component{
	render(){
		const ID=window.sessionStorage.getItem("userInfo");

		return(
			<Fragment>
				<h2>Welcome, {JSON.parse(ID)["id"]} :D</h2>
			</Fragment>
		);
	}
}
