import React, { Fragment, Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import axios from '../config/axios';
import config from '../config/config';

import Spinner from '../UI/Spinner';

class ForgotPassword extends Component {
    state = {
        email: '',
        otp: '',
        password: '',
        rePassword: '',
        otpSent: false,
        error: ''
    }
    render() {
        return (

            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-t-50 p-b-90">
                            {this.state.loading ? <Spinner /> :
                                <div>
                                    <Fragment>
                                        <span className="login100-form-title p-b-51">
                                            Forgot Password
                                        </span>


                                        <div className="wrap-input100 validate-input m-b-16" data-validate="Username is required">
                                            <input className="input100" type="text" name="email" disabled={this.state.otpSent}
                                                placeholder="E-mail Address" value={this.state.email} onChange={this.changeTextHandler} />
                                            <span className="focus-input100"></span>
                                        </div>
                                        {this.state.otpSent ?
                                            (<Fragment><div className="wrap-input100 validate-input m-b-16" data-validate="Username is required">
                                                <input className="input100" type="num" name="otp"
                                                    placeholder="Enter Otp" value={this.state.otp} onChange={this.changeTextHandler} />
                                                <span className="focus-input100"></span>
                                            </div>

                                                <div className="wrap-input100 validate-input m-b-16" data-validate="Username is required">
                                                    <input className="input100" type="password" name="password"
                                                        placeholder="Password" value={this.state.password} onChange={this.changeTextHandler} />
                                                    <span className="focus-input100"></span>
                                                </div>

                                                <div className="wrap-input100 validate-input m-b-16" data-validate="Username is required">
                                                    <input className="input100" type="password" name="rePassword"
                                                        placeholder="Repeat Password" value={this.state.rePassword} onChange={this.changeTextHandler} />
                                                    <span className="focus-input100"></span>
                                                </div>
                                            </Fragment>) : null
                                        }



                                        <div className="flex-sb-m w-full p-t-3 p-b-24">
                                            {!this.state.otpSent ? <Link to="/" className="txt1">
                                                Login Here
                                            </Link> :
                                                <Link to="" onClick={this.resendOtp} className="txt1">
                                                    Resend OTP
                                            </Link>}
                                        </div>
                                        <div className="flex-sb-m w-full p-t-3 text-danger">
                                            {this.state.error}
                                        </div>
                                        <div className="container-login100-form-btn m-t-17">
                                            {!this.state.otpSent ? <button className="login100-form-btn" onClick={this.checkEmail}>
                                                Verify email
                                            </button> :
                                                <button className="login100-form-btn" onClick={this.resetPassword}>
                                                    Reset Password
                                            </button>}
                                        </div>
                                    </Fragment>

                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    componentDidMount() {
        if (localStorage.getItem('Auth_token') !== null && localStorage.getItem('Auth_token') !== undefined) {
            this.props.history.push('/dashboard')
        }
    }

    checkEmail = () => {
        const { email } = this.state;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // console.log(regex.test(email))
        if (!regex.test(email)) {
            this.setState({ error: 'Please enter valid e-mail' })
        }
        else {
            this.setState({ error: '' });
            let data = crypto.AES.encrypt(
                JSON.stringify({email}),
                config.key
              ).toString();
            axios.post('admin/auth/forgotpassword', { data }).then(response => {
                // console.log(response.data);
                if (response.data.status === 0) {
                    this.setState({ error: response.data.message });
                }
                else {
                    this.setState({ otpSent: true });
                }
            })
        }
    }

    resetPassword = () => {
        let { email, password, rePassword, otp } = this.state;
        if (password !== rePassword) {
            this.setState({ error: 'Both password fields should match' })
        }
        else if (otp.length !== 6) {
            this.setState({ error: 'Enter 6 digit OTP' })
        }
        else {
            this.setState({ error: '' });
            const payload = {
                email:this.state.email,
                secretCode:this.state.otp,
                newPassword:this.state.password
            }
            axios.post('admin/auth/changepassword', payload).then(response => {
                // console.log(response.data);
                if (response.data.status === 0) {
                    this.setState({ error: response.data.message });
                }
                else {
                    this.props.history.push('/')
                    alert('Password Changed! Please Login')
                }
            })
        }
    }

    resendOtp = (e) => {
        e.preventDefault();
        const { email } = this.state;
        axios.post('admin/auth/resendotp', { email }).then(response => {
            // console.log(response.data);
            if (response.data.status === 0) {
                this.setState({ error: response.data.message });
            }
            else {
                this.setState({ otpSent: true, error:'New OTP Sent' });
            }
        })
    }
    changeTextHandler = (e) => {
        let ctrlName = e.target.name;
        let ctrlValue = e.target.value;
        let newData = {
            ...this.state,
            [ctrlName]: ctrlValue
        }

        this.setState(newData);
    }
}

export default withRouter(ForgotPassword);
