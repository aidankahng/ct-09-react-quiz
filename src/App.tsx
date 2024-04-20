import { Route, Routes } from "react-router-dom";
import Questions from "./views/Questions";
import SignUp from "./views/SignUp";
import Navigation from "./components/Navigation";
import Login from "./views/Login";
import { useEffect, useState } from "react";
import QuestionEditor from "./views/QuestionEditor";
import { UserType } from "./types";
import Home from "./views/Home";
import Profile from "./views/Profile";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('token') ? true : false)

    const [currentUser, setCurrentUser] = useState<Partial<UserType>>({
        email: "",
        first_name: "",
        last_name: "",
        token: "",
        user_id: NaN
    });

    useEffect(() => {
        console.log('inside App use effect');
        function getLoggedInUser() {
            if (isLoggedIn) {
                setCurrentUser({
                    email: localStorage.getItem('email')!,
                    first_name: localStorage.getItem('first_name')!,
                    last_name: localStorage.getItem('last_name')!,
                    token: localStorage.getItem('token')!,
                    user_id: parseInt(localStorage.getItem('user_id')!),
                })
            }
        }
        getLoggedInUser();
    },[isLoggedIn])

    const setUser = (user: UserType) => {
        setCurrentUser(user);
        logUserIn()
    };

    const logUserIn = () => {
        setIsLoggedIn(true)
    }

    const logUserOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('first_name')
        localStorage.removeItem('last_name')
        localStorage.removeItem('user_id')
        setIsLoggedIn(false)
        setCurrentUser({
            admin: null,
            created_on: "",
            email: "",
            first_name: "",
            last_name: "",
            token: "",
            modified_on: "",
            user_id: NaN,
        })
    }

    return (
        <>
            <Navigation currentUser={currentUser} logUserOut={logUserOut} />
            <div>
                <h1>Welcome to the Quiz:</h1>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/questions" element={<Questions />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/login"
                        element={<Login setUser={setUser} />}
                    />
                    <Route
                        path="/question-editor"
                        element={<QuestionEditor currentUser={currentUser} />}
                    />
                    <Route path="/profile" element={<Profile logUserOut={logUserOut} />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
