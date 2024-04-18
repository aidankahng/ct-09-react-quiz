import { useState } from "react";
import { LoginType, UserType } from "../types";
import { logUserIn } from "../lib/apiWrapper";

type LoginProps = {
    setUser: (user: UserType) => void;
};
export default function Login({ setUser }: LoginProps) {
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
        console.log(loginInputData);
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let response = await logUserIn(loginInputData);
        if (response.error) {
            console.error(response.error);
        } else {
            let newUser = response.data!;
            setUser(newUser);
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
