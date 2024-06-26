import { CreateQuestionType, QuestionType, UserType } from "../types";
import {
    createQuestion,
    deleteQuestion,
    viewMyQuestions,
} from "../lib/apiWrapper";
import { useEffect, useState } from "react";
import MyQuestionCard from "../components/MyQuestionCard";

type QuestionEditorProps = {
    currentUser: Partial<UserType>;
};


export default function QuestionEditor({ currentUser }: QuestionEditorProps) {
    const [changeCounter, setChangeCounter] = useState<number>(0);

    const [newQuestionData, setNewQuestionData] = useState<CreateQuestionType>({
        question: "",
        answer: "",
    });

    const [userQuestions, setUserQuestions] = useState<QuestionType[]>([]);

    useEffect(() => {
        // Code here will run ater EVERY render
        // console.log("The use effect function is running")
        async function fetchData() {
            const response = await viewMyQuestions(currentUser.token!);
            if (response.data) {
                let recievedquestions = response.data["questions"];
                setUserQuestions(recievedquestions);
            }
        }
        fetchData();
    }, [changeCounter]);

    const handleQuestionInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        setNewQuestionData({
            ...newQuestionData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitCreateQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        let response = await createQuestion(newQuestionData, currentUser.token!);
        if (response.error) {
            console.error(response.error);
        } else {
            console.log(
                `Your question has been created with ID: ${response.data!.id}!`
            );
        }
        setUserQuestions([]);
        setNewQuestionData({ question: "", answer: "" });
        setChangeCounter(changeCounter + 1); // used to refresh question list
    };

    const handleDeleteQuestion = async (token: string, id: string) => {
        let response = await deleteQuestion(token, id);
        if (response.error) {
            console.error(response.error);
        } else {
            console.log(`Your question with id: ${id} has been deleted!`);
        }
        setChangeCounter(changeCounter + 1); // used to refresh question list
    };


    if (currentUser.token) {
        return (
            <>
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-around",
                    }}
                >
                    <div style={{ width: "30%" }}>
                        <h2>Create New Question:</h2>
                        <form onSubmit={handleSubmitCreateQuestion}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Question Here"
                                    name="question"
                                    onChange={handleQuestionInputChange}
                                    value={newQuestionData.question}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Answer Here"
                                    name="answer"
                                    onChange={handleQuestionInputChange}
                                    value={newQuestionData.answer}
                                />
                            </div>
                            <div>
                                <button type="submit">
                                    Create New Question
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h2 style={{textAlign:'center'}}>Your Questions:</h2>
                        <div>
                            {userQuestions.map((q) => (
                                <>
                                    <MyQuestionCard key={q.id} question={q} handleDeleteQuestion={handleDeleteQuestion} currentUser={currentUser} setChangeCounter={setChangeCounter} changeCounter={changeCounter} />
                                    
                                </>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <h2>You cannot create questions without being logged in</h2>
            </>
        );
    }
}
