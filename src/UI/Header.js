import React, { Component } from 'react';


class App extends Component {
    state = {
        searchText: '',
    }
    render() {
        return (
            <div>
                <header className="header header--black" style={{ 'backgroundColor': '#5a8f29' }}>
                    <div className="header__left">
                        <div className="header-item">
                            <a className="header-item__content" href="/">
                                <img alt="" className="logo" src="/images/logo.png" />
                            </a>
                        </div>
                        <a className="header-item header-item--address" href="/">
                            <div className="header-item__label">Your Location</div>
                            <div className="user-address" title="Bhubaneswar">Bhubaneswar</div>
                        </a>
                    </div>
                    <div className="search">
                        <div className="react-autosuggest__container">
                            <div className="search__box">
                                <input type="text" value={this.state.searchText} autoComplete="off"
                                    role="combobox" className="react-autosuggest__input"
                                    placeholder="Search products in Super Store - Bhubaneswar"
                                    onChange={this.searchTextHandler} />
                                <button className="btn search__btn"></button>
                            </div>
                            <div id="react-autowhatever-search" className="react-autosuggest__suggestions-container"></div>
                        </div>
                    </div>

                    <div className="header__right">
                        <div className="header-item header-item--my-account" role="presentation" tabIndex="-1">
                            <div className="account header-item__content" onClick={this.loginBoxHandler}>
                                <div className="account-wrapper">
                                    <div className="account__my-account hide@mobile display--none@mobile">


                                        <div className="account__login">Login/Sign Up</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-item">
                            <a href="/" className="shopping-cart shopping-cart--empty">
                                <span>
                                    {/*<span className="item-count">1</span>-->*/}
                                    <span className="item-cart-total display--none@mobile">
                                        My Cart
                                </span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <span></span>
                </header>
            </div>
        );
    }
    searchTextHandler = (e) => {
        this.setState({searchText:e.target.value});
    }
    
    loginBoxHandler = () => {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("modal-content").style.display = "block";
        document.getElementsByTagName('body')[0].style.overflow="hidden";
    }
}

export default App;
