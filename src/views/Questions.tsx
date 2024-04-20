import { useEffect, useState } from "react";
import { QuestionType } from "../types";
import { getAllQuestions } from "../lib/apiWrapper";
import QuestionCard from "../components/QuestionCard";

type QuestionsProps = {};

export default function Questions({}: QuestionsProps) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    useEffect(() => {
        // Code here will run ater EVERY render
        // console.log("The use effect function is running")
        async function fetchData() {
            const response = await getAllQuestions();
            if (response.data) {
                let recievedquestions = response.data["questions"];
                setQuestions(recievedquestions);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div>
                <h2>Questions:</h2>
            </div>
            <div>
                <p>{questions.length}</p>
                {questions.map((q) => (
                    <QuestionCard key={q.id} question={q} />
                ))}
            </div>
        </>
    );
}
