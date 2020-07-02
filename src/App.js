import React, { Component, useEffect, useState } from "react"
import Board from "./Board/Board.js"
import { BrowserRouter as Router, Link, Switch } from "react-router-dom"


// import Amplify, { Auth } from 'aws-amplify';

// import React, { Component } from "react";
// import Amplify from "aws-amplify";
// import { withOAuth } from "aws-amplify-react";
// import aws_exports from "./aws-exports";

// Amplify.configure(aws_exports);


import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

class Landing extends Component {
    state = { user: null, customState: null };

    componentDidMount() {
        Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                    this.setState({ user: data });
                    break;
                case "signOut":
                    this.setState({ user: null });
                    break;
                case "customOAuthState":
                    this.setState({ customState: data });
            }
        });

        Auth.currentAuthenticatedUser()
            .then(user => this.setState({ user }))
            .catch(() => console.log("Not signed in"));
    }

    render() {
        const { user } = this.state;

        return (
            <div className="App">
                <button onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>Open Facebook</button>
                <button onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>Open Google</button>
                <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
                <button onClick={() => Auth.signOut()}>Sign Out {"a"}</button>
            </div>
        );
    }
}
// class Landing extends Component {
//     render() {
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     <img src={logo} className="App-logo" alt="logo" />
//                     <p>
//                         Edit <code>src/App.js</code> and save to reload.
//           </p>
//                     <a
//                         className="App-link"
//                         href="https://reactjs.org"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         Learn React
//           </a>
//                     <button onClick={this.props.OAuthSignIn}>
//                         Sign in with Facebook
//           </button>
//                 </header>
//             </div>
//         );
//     }
// }

// export default withOAuth(App);
// Amplify.configure({
//     Auth: {

//         // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//         identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

//         // REQUIRED - Amazon Cognito Region
//         region: 'XX-XXXX-X',

//         // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
//         // Required only if it's different from Amazon Cognito Region
//         identityPoolRegion: 'XX-XXXX-X',

//         // OPTIONAL - Amazon Cognito User Pool ID
//         userPoolId: 'XX-XXXX-X_abcd1234',

//         // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//         userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',

//         // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//         mandatorySignIn: false,

//         // OPTIONAL - Configuration for cookie storage
//         // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
//         cookieStorage: {
//             // REQUIRED - Cookie domain (only required if cookieStorage is provided)
//             domain: '.yourdomain.com',
//             // OPTIONAL - Cookie path
//             path: '/',
//             // OPTIONAL - Cookie expiration in days
//             expires: 365,
//             // OPTIONAL - Cookie secure flag
//             // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//             secure: true
//         },

//         // OPTIONAL - customized storage object
//         storage: MyStorage,

//         // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//         authenticationFlowType: 'USER_PASSWORD_AUTH',

//         // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
//         clientMetadata: { myCustomKey: 'myCustomValue' },

//         // OPTIONAL - Hosted UI configuration
//         oauth: {
//             domain: 'your_cognito_domain',
//             scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
//             redirectSignIn: 'http://localhost:3000/',
//             redirectSignOut: 'http://localhost:3000/',
//             responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
//         }
//     }
// });

// // You can get the current config object
// const currentConfig = Auth.configure();
// // import awsconfig from './aws-exports';
// // Amplify.configure(awsconfig);


// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


const Signin = () => {
    const [formState, setFormstate] = useState("signUp")
    const [formInputState, setFormInputState] = useState({ username: '', password: '', email: '', verificationCode: '' })
    /* Import the Amplify Auth API */

    /* Create the form state and form input state */
    // let formState = "signUp";
    // let formInputState = { username: '', password: '', email: '', verificationCode: '' };



    /* Sign up function */
    async function signUp() {
        console.log(formInputState, "hgi")
        try {
            await Auth.signUp({
                username: formInputState.username,
                password: formInputState.password,
                attributes: {
                    email: formInputState.email
                }
            });
            /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
            setFormstate("confirmSignUp");
        } catch (err) { console.log(err) }
    }


    /* onChange handler for form inputs */
    function onChange(e) {
        setFormInputState({ ...formInputState, [e.target.name]: e.target.value })
    }




    /* Confirm sign up function for MFA */
    async function confirmSignUp() {
        try {
            await Auth.confirmSignUp(formInputState.usernamne, formInputState.verificationCode);
            /* Once the user successfully confirms their account, update form state to show the sign in form*/
            setFormstate("signIn")
        } catch (err) { console.log({ err }); }
    }

    /* Sign in function */
    async function signIn() {
        try {
            await Auth.signIn(formInputState.username, formInputState.password);
            /* Once the user successfully signs in, update the form state to show the signed in state */
            setFormstate("signedIn");
        } catch (err) { console.log({ err }); }
    }


    /* In the UI of the app, render forms based on form state */
    /* If the form state is "signUp", show the sign up form */
    if (formState === "signUp") {
        return (
            <div>
                <input
                    name="username"
                    placeholder="username"
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={onChange}
                />
                <input
                    name="email"
                    placeholder="email"
                    onChange={onChange}
                />
                <button onClick={signUp}>Sign Up</button>
            </div>
        )
    }

    /* If the form state is "confirmSignUp", show the sign up form */
    if (formState === "confirmSignUp") {
        return (
            <div>
                <input
                    name="username"
                    onChange={onChange}
                />
                <input
                    name="verificationCode"
                    onChange={onChange}
                />
                <button onClick={confirmSignUp}>Confirm Sign Up</button>
            </div>
        )
    }

    /* If the form state is "signIn", show the sign in form */
    if (formState === "signIn") {
        return (
            <div>
                <input
                    name="username"
                    onChange={onChange}
                />
                <input
                    name="password"
                    onChange={onChange}
                />
                <button onClick={signIn}>Sign In</button>
            </div>
        )
    }

    /* If the form state is "signedIn", show the app */
    if (formState === "signedIn") {
        return (
            <div>
                <h1>Welcome to my app!</h1>
            </div>
        )
    }
}



const Signup = () => {
    return (<div>signup</div>)
}




function App() {
    return (
        <main>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/sign-in">Sign in</Link>
                        </li>
                        <li>
                            <Link to="/sign-up">Sign up</Link>
                        </li>
                        <li>
                            <Link to="/board">Board</Link>
                        </li>
                        <button onClick={() => Auth.signOut()}>Sign Out {"a"}</button>
                    </ul>
                </nav>
                <Switch>
                    <Router path="/sign-in">
                        <Signin />
                    </Router>
                    <Router path="/sign-up">
                        <Signup />
                    </Router>
                    <Router path="/board">
                        <Board />
                    </ Router >
                    <Router path="/">
                        {/* <Board /> */}
                        <Landing />
                    </Router>
                </Switch>
            </Router>
        </main>
    )
}




export default App;