import { QuestionType } from "../types";

type QuestionCardProps = {
    question: QuestionType;
};

export default function QuestionCard({ question }: QuestionCardProps) {
    return (
        <>
            <div style={{ border: "solid black 1px" }}>
                <h3>Question: {question.question}</h3>
                <h4>Author: {question.author}</h4>
                <p>Answer: {question.answer}</p>
            </div>
        </>
    );
}