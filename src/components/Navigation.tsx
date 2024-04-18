import { Link } from "react-router-dom"
import { UserType } from "../types"

type NavigationProps = {
    currentUser: UserType
}

export default function Navigation({ currentUser }: NavigationProps) {
  return (
    <nav>
        <h3><Link to='/'>The Quiz</Link></h3>
        <p><Link to='/signup'>Sign Up</Link></p>
        <p><Link to='/login'>Log In</Link></p>
        <p><Link to='/questions'>All Questions</Link></p>
        {currentUser.token && <p><Link to='/question-editor'>Question Editor</Link></p>}
    </nav>
  )
}