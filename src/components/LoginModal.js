import React, { Component } from 'react';


class Category extends Component {

    render() {
        return (
            <React.Fragment>
            <div id="overlay" onClick={this.props.close}></div>
            <div id="modal-content" className="ReactModal__Content ReactModal__Content--after-open modal-content" tabIndex="-1">
                <button className="modal-close__btn " data-test-id="btn-modal-close" aria-label="Close Login Box" onClick={this.props.close}>×</button>
                <div className="login center-aligned">
                    <div className="login-head">
                        <h2 className="login-head__text weight--light">Phone Number Verification</h2>
                    </div>
                    <div className="login__body">
                        <div className="login-help weight--semibold">
                            <div>
                                <div className="login-help weight--semibold">Enter your phone number to</div>
                                <div className="login-help weight--semibold">Login/Sign up</div>
                            </div>
                        </div>
                        <form>
                            <div className="login-phone">
                                <input type="tel" maxLength="10" className="login-phone__input input" data-test-id="phone-no-text-box" />
                            </div>
                            <button className="btn weight--semibold login-button btn--gray" data-test-id="login-next-button">Next</button>
                        </form>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default Category;


