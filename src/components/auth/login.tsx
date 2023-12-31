import React, { useState, ChangeEvent, FormEvent } from 'react';
import { checkInput } from '../utils/validator';
import { handleLogin } from './helper';
import { Link } from "react-router-dom";

type Props = {
    setToken: Function
}

const Login: React.FC<Props> = ({ setToken }) => {
    const [formData, setFormData] = useState<IUser>({ username: '', password: '' });
    const [complete, setComplete] = useState<string>();

    const handleForm = (e: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = e.currentTarget;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        handleLogin(formData)
            .then((result: LoginDataType | undefined) => {
                if (result) {
                    setToken(result.token);
                    setFormData({
                        ...formData,
                        "username": "",
                        "password": "",
                    });
                }
            })
            .catch((error) => {
                if (error.response) {
                    setComplete(error.response.data.message);
                } else {
                    setComplete("An error occurred during login.");
                }
                setTimeout(() => {
                    setComplete("");
                }, 3000);
                console.error("Error while login:", error);
            });
    };


    return (
        <div>
            <h2 className='ml-15'>Login</h2>
            <div className='text-center'>{complete}</div>
            <form className='Form Login' onSubmit={handleSubmit}>

                <div>
                    <div>
                        <label htmlFor='name'>Username</label>
                        <input onChange={handleForm} type='text' id='username' value={formData.username} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleForm}
                            type='password'
                            id='password'
                            value={formData.password}
                        />
                    </div>
                </div>
                <div>

                    <button disabled={!!checkInput(formData.username, formData.password)}
                        className={!!checkInput(formData.username, formData.password) ? "disabled" : ""}>Login</button>
                </div>

            </form>
            <div className='text-center'>
                <Link className='text-decoration-none' to='/auth/register'>Sign Up</Link>
            </div>

        </div>

    );
};

export default Login;
