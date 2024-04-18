import { useState } from "react";
import { UserFormType } from "../types";
import { register } from "../lib/apiWrapper";

type SignUpProps = {};

export default function SignUp({}: SignUpProps) {
    const [userFormData, setUserFormData] = useState<UserFormType>({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        let response = await register(userFormData);
        if (response.error) {
            console.error(response.error);
        } else {
            console.log(`Congrats! Your account has been created.`);
        }
    };

    return (
        <>
            <h1>Create a new account:</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={userFormData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="first_name">First Name: </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="Enter First Name"
                        value={userFormData.first_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name: </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Enter Last Name"
                        value={userFormData.last_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={userFormData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button type="submit">Create New User</button>
                </div>
            </form>
        </>
    );
}
