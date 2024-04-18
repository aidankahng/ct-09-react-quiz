// import { useEffect, useState } from "react";
// import { QuestionType, UserType } from "../types";
// import { viewMyQuestions } from "../lib/apiWrapper";
// import QuestionCard from "./QuestionCard";

// // This component displays a list of a user's questions along with tools to modify them

// type UserQuestionsProps = {
//     currentUser: UserType
//     refresher: number
// };
// export default function UserQuestions({ currentUser, refresher }: UserQuestionsProps) {
//     const [userQuestions, setUserQuestions] = useState<QuestionType[]>([]);
//     useEffect(() => {
//         // Code here will run ater EVERY render
//         // console.log("The use effect function is running")
//         async function fetchData() {
//             const response = await viewMyQuestions(currentUser.token);
//             if (response.data) {
//                 let recievedquestions = response.data["questions"];
//                 console.log(recievedquestions);
//                 setUserQuestions(recievedquestions);
//             }
//         }
//         fetchData();
//     },[]);
//     return (
//     <>
//         <p># Questions created this session: {refresher}</p>
//         {userQuestions.map((q) => (
//                     <QuestionCard key={q.id} question={q} />
//                 ))}
//     </>
//     );
// }
