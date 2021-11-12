import React from 'react';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';
import ConnectedUsers from './ConnectedUsers';

export default class Chat extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="container app">
				<div className="row app-one">
					<div className="col-sm-4 side">
						<div className="side-one">
							<div className="row heading">
								<div className="col-sm-3 col-xs-3 heading-avatar">
									<div className="heading-avatar-icon">
										<img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
									</div>
								</div>
								<div className="col-sm-1 col-xs-1  heading-dot  pull-right">
									<i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
								</div>
								<div className="col-sm-2 col-xs-2 heading-compose pull-right">
									<i className="fa fa-comments fa-2x  pull-right" aria-hidden="true"></i>
								</div>
							</div>
							<div className="row searchBox">
								<div className="col-sm-12 searchBox-inner">
									<div className="form-group has-feedback">
										<input id="searchText" type="text" className="form-control" name="searchText" placeholder="Search" />
										<span className="glyphicon glyphicon-search form-control-feedback"></span>
									</div>
								</div>
							</div>
							<div className="row sideBar">
								{/* <Button variant="danger" onClick={()=> this.props.closeConnection()}>Leave Room</Button> */}
								<ConnectedUsers users={this.props.users}></ConnectedUsers>
							</div>
						</div>
					</div>
					<div className="col-sm-8 conversation">
						<div className="row heading">
							<div className="col-sm-1 col-md-1 col-xs-3 heading-avatar">
								<div className="heading-avatar-icon">
									<img src="https://portais.univasf.edu.br/reitoria/imagens/5ba6d9f7590b4a7d8f4456737206be0e.png" />
								</div>
							</div>
							<div className="col-sm-9 col-xs-7 heading-name">
								<a className="heading-name-meta">{this.props.room}</a>
								<span className="heading-online">Online</span>
							</div>
							<div className="col-sm-1 col-xs-1  heading-dot pull-right">
								<i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
							</div>
						</div>
						<MessageContainer messages={this.props.messages} user={this.props.user}></MessageContainer>
						<SendMessageForm sendMessage={this.props.sendMessage}></SendMessageForm>
					</div>
				</div>
			</div>
		);
	}
}