import { useState } from "react";
import { QuestionType } from "../types";

type QuestionCardProps = {
    question: QuestionType;
};

export default function QuestionCard({ question }: QuestionCardProps) {
    const [displayAnswer, setDisplayAnswer] = useState<boolean>(false);
    const toggleDisplayAnswer = () => {
        setDisplayAnswer(!displayAnswer);
    };

    const [isCorrect, setIsCorrect] = useState<boolean>();

    const checkIsCorrect = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.value!.toLowerCase() == question.answer.toLowerCase()) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <>
            <div style={{ border: "solid black 1px" }}>
                <h3>Question: {question.question}</h3>
                <h4>Author: {question.author.slice(0, -5)}</h4>
                <p>
                    <button onClick={toggleDisplayAnswer}>
                        {displayAnswer ? "Hide Answer" : "Show Answer"}
                    </button>
                    : {displayAnswer ? question.answer : "----------"}
                </p>
                <input
                    type="text"
                    placeholder="Your Answer"
                    style={{ backgroundColor: `${isCorrect ? "#c8ffc8" : ""}` }}
                    onChange={checkIsCorrect}
                />
                <p></p>
            </div>
        </>
    );
}
