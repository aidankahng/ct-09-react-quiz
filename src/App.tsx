import { Route, Routes } from "react-router-dom";
import Questions from "./views/Questions";
import SignUp from "./views/SignUp";
import Navigation from "./components/Navigation";
import Login from "./views/Login";
import { useState } from "react";
import QuestionEditor from "./views/QuestionEditor";
import { UserType } from "./types";
import Home from "./views/Home";

function App() {
    const showToken = () => {
        console.log(currentUser.token);
    };

    const [currentUser, setCurrentUser] = useState<UserType>({
        admin: null,
        created_on: "",
        email: "",
        first_name: "",
        last_name: "",
        token: "",
        modified_on: "",
        user_id: NaN,
    });

    const assignUser = (user: UserType) => {
        setCurrentUser(user);
    };

    const showUser = () => {
        console.log(currentUser);
    };

    return (
        <>
            <div>
                <button onClick={showToken}>Log Current Token</button>
                <button onClick={showUser}>Log Current User</button>
            </div>
            <Navigation currentUser={currentUser} />
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
                        element={<Login setUser={assignUser} />}
                    />
                    <Route
                        path="/question-editor"
                        element={<QuestionEditor currentUser={currentUser} />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
