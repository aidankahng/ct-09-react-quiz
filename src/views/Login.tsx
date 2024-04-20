import { useState } from "react";
import { LoginType, UserType } from "../types";
import { logUserIn } from "../lib/apiWrapper";
import { useNavigate } from "react-router-dom";


type LoginProps = {
    setUser: (user: UserType) => void;
};
export default function Login({ setUser }: LoginProps) {
    const navigate = useNavigate();

    const [loginInputData, setLoginInputData] = useState<LoginType>({
        email: "",
        password: "",
    });

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setLoginInputData({
            ...loginInputData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let response = await logUserIn(loginInputData);
        if (response.error) {
            console.warn(response.error);
        } else {
            let newUser = response.data!;
            setUser(newUser);
            localStorage.setItem('token', newUser.token);
            localStorage.setItem('email', newUser.email);
            localStorage.setItem('first_name', newUser.first_name);
            localStorage.setItem('last_name', newUser.last_name);
            localStorage.setItem('user_id', newUser.user_id.toString());
            navigate('/');
        }
    };

    return (
        <>
            <h3>Login:</h3>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="email">Enter Email:</label>
                    <input
                        type="text"
                        onChange={handleLoginInputChange}
                        name="email"
                        placeholder="Enter email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Enter Password: </label>
                    <input
                        type="text"
                        onChange={handleLoginInputChange}
                        name="password"
                        placeholder="Enter password"
                    />
                </div>
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </>
    );
}
