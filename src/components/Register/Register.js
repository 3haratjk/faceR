import React from 'react'
import './Register.css'

import Logo from '../logo/Logo'


class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            nameError: '',
            emailError: '',
            passwordError: ''
        }
    }

    onNameChange = (event) => {
        this.setState({
            name: event.target.value,
            nameError: !event.target.value ? '*this field cannot be empty' : ''
        })
    }

    onEmailChange = (event) => {
        this.setState({
            email: event.target.value,
            emailError: !event.target.value ? '*this field cannot be empty' : ''
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value,
            passwordError: !event.target.value ? '*this field cannot be empty' : ''
        })
    }

    onSubmit = () => {
        if(this.state.name || this.state.email || this.state.password){
            fetch('https://glacial-brushlands-04666.herokuapp.com/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(Response => Response.json())
            .then((data) => {
                if(data === 'registered'){
                    this.props.handleRegister();
                } else{
                    this.setState({
                        name: '',
                        email: '',
                        password: ''
                    })
                }
            })
        }
    }

    
    render(){
        const {handleRegister} = this.props;

        return(
            <div className="Register">
    
                <Logo />
                <div className="formContainer">
                    <h1>Register</h1>
                    <label htmlFor="name">
                        <p>Name:</p>
                        <input name="name" 
                            className="nameInput" 
                            type="text" 
                            value={this.state.name}
                            placeholder="Username"
                            onChange={this.onNameChange} 
                         />
                        {this.state.nameError && <p className="errorMsg">{this.state.nameError}</p>}
                    </label>
                    <label htmlFor="email">
                        <p>E-mail:</p>
                        <input name="email" 
                            className="emailInput" 
                            type="email" 
                            value={this.state.email}
                            placeholder="E-mail" 
                            onChange={this.onEmailChange}
                            />
                        {this.state.emailError && <p className="errorMsg">{this.state.emailError}</p>}
                        
                    </label>
                    <label htmlFor="password">
                        <p>New password:</p>
                        <input name="password" 
                            className="passwordInput" 
                            type="password"
                            value={this.state.password} 
                            placeholder="Password" 
                            onChange={this.onPasswordChange}
                            />
                        {this.state.passwordError && <p className="errorMsg">{this.state.passwordError}</p>}
                        
                    </label>
                    <input className="registerBtn pointer" 
                    type="submit" 
                    value="Register" 
                    onClick={this.onSubmit} 
                    />
                    <p className="registerCall pointer pa2" onClick={handleRegister}>Sign in</p>
                </div>
    
            </div>
        )
    }

}

export default Register;