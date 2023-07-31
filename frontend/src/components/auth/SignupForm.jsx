import { React, useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import { useLocation, useNavigate } from 'react-router-dom'
import './SignupForm.css'

// see api/lib/auth/password.js
const SUPPORTED_EMAIL_DOMAINS = [
    '@gmail.com',
    '@icloud.com',
    '@outlook.com',
    '@hotmail.com',
    '@yahoo.com',
    '@live.com',
    '@proton.me',
    '@protonmail.com',
    '.edu'
]

const SignupForm = () => {
    const { signup } = useContext(UserProfileContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    
    /**
        * need this so that we can redirect after login.
        * if you know a better way to do this let me know
    */
    const signupSuccessCallback = () => {
        console.log('login success custom callback')
        const origin = location.state?.from?.pathname || '/ingredients';
        console.log('navigating to origin for niceness', origin)
        navigate(origin);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const arrayRestrictions = Array.of(dietaryRestrictions.replaceAll(/\w/, '').split(','))
        signup({ email, password, name, dietaryRestrictions: arrayRestrictions }, signupSuccessCallback)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="box">
                    <label>Name:</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="box">
                    <label>Email:
                        <span>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <small className="email-domain-list">
                                Supported domains: {SUPPORTED_EMAIL_DOMAINS.join(', ')}
                            </small>
                        </span>

                    </label>
                </div>
                <div className="box">
                    <label>Password:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="box">
                    <span>
                        <label>List Dietary Restrictions:
                            <input
                                type="text"
                                value={dietaryRestrictions}
                                onChange={(e) => setDietaryRestrictions(e.target.value)}
                            />
                            <small className="email-domain-list">
                                Comma separated list of food allergies, for example: peanuts, shellfish
                            </small>
                        </label>
                    </span>
                </div>
                <button className="b">Sign Up</button>
            </form>
        </>
    )
}

export default SignupForm
