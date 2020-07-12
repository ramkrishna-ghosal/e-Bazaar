import React, { Component } from 'react';

import $ from 'jquery';
class Header extends Component {

    state = {
        profileActive: false,
        notificationActive: false,
        mobNavigationToggleActive:false,
        backdrop:false
    }
    componentDidMount() {
        console.log('Component Did Mount -- Header.js')
    }
    notificationToggleHandler = (e) => {
        e.preventDefault();
        this.setState(prevState => {
            return {
                profileActive: false,
                notificationActive: !prevState.notificationActive
            }
        });
    }
    profileToggleHandler = (e) => {
        e.preventDefault();
        this.setState(prevState => {
            return {
                notificationActive: false,
                profileActive: !prevState.profileActive
            }
        });
    }

    navigationToggleHandler = (e) =>{
        console.log(e);
        this.setState(prevState => {
            return {
                mobNavigationToggleActive: !prevState.mobNavigationToggleActive
            }
        });
    }

    removeBackdropHandler = () =>{
        this.setState({
                notificationActive: false,
                profileActive: false
        });
    }

    logOutHandler = () => {
        localStorage.clear();
        this.props.changeLogin();
    }
    render() {
        // var html = document.getElementsByTagName('html');
        // // html.addClass('perfect-scrollbar-off nav-open')
        if(this.state.mobNavigationToggleActive)
            $('html').addClass('perfect-scrollbar-off nav-open')
        else
            $('html').removeClass('nav-open')
        let backdrop = this.state.profileActive|this.state.notificationActive;
        
        return (
            <React.Fragment>
                {backdrop?<div className="backdrop" onClick={this.removeBackdropHandler}></div>:null}
                <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                    {/* <div className="navbar-wrapper">
                        <a className="navbar-brand" href="pablo">Table List</a>
                    </div> */}
                    <button type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" 
                    className={this.state.mobNavigationToggleActive?"navbar-toggler toggled":"navbar-toggler"}
                    aria-label="Toggle navigation" onClick={this.navigationToggleHandler}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end">
                        
                        <ul className="navbar-nav">
                            {/*<li className="nav-item">
                                <a className="nav-link" href="pablo">
                                    <i className="material-icons">dashboard</i>
                                    <p className="d-lg-none d-md-block">
                                        Stats
              </p>
                                </a>
        </li>*/}
                            <li className="nav-item dropdown">
                                <a 
                                onClick={this.notificationToggleHandler}
                                    href="/" id="navbarDropdownMenuLink"
                                    data-toggle="dropdown"
                                    className={this.state.notificationActive ? 'nav-link show' : 'nav-link'}
                                    aria-haspopup="true" aria-expanded={this.state.notificationActive}>
                                    <i className="material-icons">notifications</i>
                                    <span className="notification">5</span>
                                    <p className="d-lg-none d-md-block">
                                        Some Actions
              </p>
                                </a>
                                <div
                                    className={this.state.notificationActive ? 'dropdown-menu dropdown-menu-right show' : 'dropdown-menu dropdown-menu-right'}
                                    aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="/">Mike John responded to your email</a>
                                    <a className="dropdown-item" href="/">You have 5 new tasks</a>
                                    <a className="dropdown-item" href="/">You're now friend with Andrew</a>
                                    <a className="dropdown-item" href="/">Another Notification</a>
                                    <a className="dropdown-item" href="/">Another One</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    onClick={this.profileToggleHandler}
                                    href="#pablo" id="navbarDropdownProfile"
                                    className={this.state.profileActive ? 'nav-link show' : 'nav-link'}
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="material-icons">person</i>
                                    <p className="d-lg-none d-md-block">
                                        Account
              </p>
                                </a>
                                <div
                                    className={this.state.profileActive ? 'dropdown-menu dropdown-menu-right show' : 'dropdown-menu dropdown-menu-right'}
                                    aria-labelledby="navbarDropdownProfile">
                                    <a className="dropdown-item" href="/">Profile</a>
                                    <a className="dropdown-item" href="/">Settings</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/" onClick={this.logOutHandler}>Log out</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            </React.Fragment>
           
        )
    }
}

export const stateFix = () =>{
    this.setState({
        profileActive: false,
        notificationActive: false,
        mobNavigationToggleActive:false
    })
}
export default Header;
