import { Link } from "react-router-dom"
import { UserType } from "../types"

type NavigationProps = {
    currentUser: Partial<UserType>,
    logUserOut: () => void
}

export default function Navigation({ currentUser, logUserOut }: NavigationProps) {
  return (
    <nav style={{display:'flex', width:'80%', justifyContent:'left', gap:'20px'}}>
        <h3><Link to='/'>The Quiz</Link></h3>
        <p><Link to='/questions'>All Questions</Link></p>
        {!currentUser?.token && <p><Link to='/signup'>Sign Up</Link></p>}
        {currentUser?.token && <p><Link to='/question-editor'>Question Editor</Link></p>}
        {!currentUser?.token ? <p><Link to='/login'>Log In</Link></p> : <p onClick={logUserOut}><Link to=''>Log Out</Link></p>}
        {currentUser?.token && <p><Link to='/profile'>Profile</Link></p>}
    </nav>
  )
}