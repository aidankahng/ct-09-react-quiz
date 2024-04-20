import { BaseSyntheticEvent, useState } from "react";
import { EditQuestionType, QuestionType, UserType } from "../types";
import { editQuestion } from "../lib/apiWrapper";

type MyQuestionCardProps = {
    question: QuestionType;
    handleDeleteQuestion: (token: string, id: string) => void;
    currentUser: Partial<UserType>;
    setChangeCounter: (n: number) => void;
    changeCounter: number;
};

export default function MyQuestionCard({
    question,
    handleDeleteQuestion,
    currentUser,
    setChangeCounter,
    changeCounter,
}: MyQuestionCardProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdateQuestion = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
    
        console.log("Tried to submit changes to question");
        console.log(e)
        console.log(e.target[0].value)
        let updateQuestion: EditQuestionType = {};
        if (e.target[0].value) {
            updateQuestion["question"] = e.target[0].value;
        }
        if (e.target[1].value) {
            updateQuestion["answer"] = e.target[1].value;
        }

        let response = await editQuestion(
            currentUser.token!,
            question.id.toString(),
            updateQuestion
        );
        if (response.error) {
            console.warn(response.error);
        } else {
            // refresh the questions
            setChangeCounter(changeCounter + 1);
            console.log("You have edited the question!");
        }
        toggleEditing();
    };

    return (
        <>
            <div
                style={{
                    border: "solid black 1px",
                    padding: "10px",
                    margin: "10px",
                    width: "60vw",
                    borderRadius: "10px",
                }}
            >
                {!isEditing ? (
                    <>
                        <h4 style={{ margin: "4px" }}>
                            Author: {question.author.slice(0, -5)}
                        </h4>
                        <h3>Q: {question.question}</h3>
                        <p>Answer: {question.answer}</p>
                        <button
                            onClick={() =>
                                handleDeleteQuestion(
                                    currentUser.token!,
                                    question.id.toString()
                                )
                            }
                        >
                            Delete Question
                        </button>
                    </>
                ) : (
                    <>
                        <form onSubmit={handleUpdateQuestion}>
                            <p>Original Question: {question.question}</p>
                            <label htmlFor="answer">New Question: </label>
                            <textarea name="question" />
                            <p>Original Answer: {question.answer}</p>
                            <label htmlFor="answer">New Answer: </label>
                            <input type="text" name="answer" />
                            <br />
                            <p></p>
                            <button type="submit">Submit Changes</button>
                            <p>
                                Note: Blank submissions won't change the
                                question
                            </p>
                        </form>
                    </>
                )}
                <p></p>
                <button onClick={toggleEditing}>Toggle Question Editor</button>
            </div>
        </>
    );
}
