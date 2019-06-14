import React, { Component } from 'react';
import './index.css';

const REGISTER_BUTTON_TEXT = 'Register';
const BACK_BUTTON_TEXT = 'Back';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            duid: '',
            password: '',
            confirmPassword: '',
            isRegistration: false
        }

        this.primaryButtonHandler = this.primaryButtonHandler.bind(this);
        this.usernameHandler = this.usernameHandler.bind(this);
        this.duidHandler = this.duidHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.confirmPasswordHandler = this.confirmPasswordHandler.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.registration = this.registration.bind(this);
    }

    primaryButtonHandler(e) {
        const { username } = this.state;
        const { history } = this.props

        localStorage.setItem('user', username);
        history.push('/home');
        this.setState({ isRegistration: false });
    }

    usernameHandler(e) {
        const username  = e.target.value;
        this.setState({ username });
    }

    duidHandler(e) {
        const duid  = e.target.value;
        this.setState({ duid });
    }

    passwordHandler(e) {
        const password  = e.target.value;
        this.setState({ password });
    }

    confirmPasswordHandler(e) {
        const confirmPassword  = e.target.value;
        this.setState({ confirmPassword });
    }

    isFormValid() {
        const {
            username,
            duid,
            password,
            confirmPassword,
            isRegistration
        } = this.state;
        
        let isValid = username && duid && password;

        if (isRegistration) {
            isValid =  isValid && password === confirmPassword;
        }

        return isValid;
    }

    registration() {
        this.setState({ isRegistration: true });
    }

    render() {
        return (
            <form className="login-page" >
                <h2 className="text-center">Welcome</h2>
                <div className="form-group">
                    <label>Username *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        onChange={this.usernameHandler}
                    />
                </div>
                <div className="form-group">
                    <label>DUID *</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter DUID"
                        onChange={this.duidHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Password *</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={this.passwordHandler}
                    />
                </div>
                <div className="form-group" hidden={!this.state.isRegistration}>
                    <label>Confirm Password *</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={this.confirmPasswordHandler}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={this.primaryButtonHandler}
                    disabled={!this.isFormValid()}
                >
                    Submit
                </button>
                <h5 className="text-center" hidden={this.state.isRegistration}>OR</h5>
                <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block mt-2"
                    onClick={this.registration}
                >
                    {this.state.isRegistration ? BACK_BUTTON_TEXT : REGISTER_BUTTON_TEXT}
                </button>
            </form>
        );
    }
};

export default Login;