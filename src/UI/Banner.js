import React, { Component } from 'react';


class App extends Component {
    state = {
        searchText: '',
    }
    render() {
        return (
            <div>
                <div className="store-card-container">
                    <div className="store-card">
                        <div className="store-offers__offer" data-index="0" tabIndex="-1">
                            <a href="/">
                                <img className="display--inline-block img" alt="" src="images/banner2.jpg" />
                            </a>
                        </div>
                        <div className="store-offers__offer" data-index="1" tabIndex="-1">
                            <a href="/">
                                <img className="display--inline-block img" alt="" src="images/banner1.jpg" />
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default App;
