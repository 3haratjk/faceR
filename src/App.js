import React from 'react';
import './App.css';

import Logo from './components/logo/Logo';
import Navigation from './components/navigation/Navigation';
import LinkInput from './components/linkInput/LinkInput';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'

import Clarifai from 'clarifai';


const initialState = {
  linkInput : "",
  imgUrl: "",
  box: "",
  isSignedIn : false,
  isRegistered: true,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',

  }
};


const app = new Clarifai.App({
  apiKey: '3ec624596217452fa1ef9f3af909f9ef'
 });

class App extends React.Component{

  constructor(){
    super();
    this.state = initialState;
  }


  handleRegister = () => {
    this.setState({
      isRegistered: !this.state.isRegistered
    })
  }

  handleSignIn = () => {
    this.setState({
        isSignedIn: !this.state.isSignedIn,
    })
  }

  loadUser = (user) => {
    this.setState({
      imgUrl: '',
      box: '',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries
      }
    })
  }


  handleChange = (e) => {
    this.setState({
      linkInput : e.target.value
    })
  }

  displayFaceBox = (response) => {
    const faceXY = response.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById("faceImg");
    const width = Number(img.width);
    const height = Number(img.height);
    const boxXY = {
      topRow: faceXY.top_row * height,
      bottomRow: height - (faceXY.bottom_row * height),
      leftColumn: faceXY.left_col * width,
      rightColumn: width - (faceXY.right_col * width)
    };

    this.setState({
      box: boxXY
    })
  }



  onSubmit = () => {
    this.setState({
      imgUrl: this.state.linkInput,
      linkInput: ""
    })

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.linkInput).then(
    (response) => {
      // do something with response     
      this.displayFaceBox(response);

      fetch('http://localhost:3001/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      }) 
        .then(Response => Response.json())
        .then(data => {
          this.setState({
            user: {
              ...this.state.user,
              entries: data
            }
          })
        });
    },
    function(err) {
      // there was an error
      console.log(err)
    }
  );
  }

  render(){


    
    return(

      <div className="App">
        {
          this.state.isSignedIn === false
            ? this.state.isRegistered
              ? <SignIn handleSignIn={this.handleSignIn} handleRegister={this.handleRegister} loadUser={this.loadUser} />
              : <Register handleRegister={this.handleRegister} />
            : <div>
                <Navigation handleAuth={this.handleSignIn} />
                <Logo />
                <p className="white f3 ">Hi {this.state.user.name}, your number of entries are</p>
                <h3 className="white f2">{this.state.user.entries}</h3>
                <p className="white f4">This App detects face in your image! Give it a try</p>
                <LinkInput 
                  linkInput={this.state.linkInput}
                  handleChange={this.handleChange} 
                  onSubmit={this.onSubmit} 
                  />
                <FaceRecognition 
                  imgUrl={this.state.imgUrl}
                  box={this.state.box}
                  />
            </div>
                                          
        }

      </div>
    )

  }
}

export default App;
