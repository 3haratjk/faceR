import React from 'react'
import './SignIn.css'
import Logo from '../logo/Logo'

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onSubmit = () => {
        fetch('https://glacial-brushlands-04666.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(Response => Response.json())
        .then(data => {
            if(data.id){
                this.props.loadUser(data);
                this.props.handleSignIn();
            } else{
                this.setState({
                    email: '',
                    password: ''
                })
            }
        })
        
    }


    render(){

        const {handleRegister} = this.props;

        return(
            <div className="SignIn">
    
                <Logo />
                <div className="authContainer">
                    <h1>Sign In</h1>
                    <label htmlFor="email">
                        <p>Email</p>
                        <input name="email" 
                            className="emailInput" 
                            type="email" 
                            value={this.state.email}
                            placeholder="example@example.com" 
                            onChange={this.onEmailChange}
                            />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input name="password" 
                            className="passwordInput" 
                            type="password" 
                            value={this.state.password}
                            placeholder="Password" 
                            onChange={this.onPasswordChange}
                            />
                    </label>
                    <input className="signInBtn pointer" 
                        type="submit" 
                        value="Sign In" 
                        onClick={this.onSubmit} 
                        />
                    <p className="registerCall pointer pa2" onClick={handleRegister}>Register</p>
                </div>
    
            </div>
        )
    }
}


export default SignIn;