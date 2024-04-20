import axios from "axios";
import {
    CreateQuestionType,
    EditQuestionType,
    EditUserType,
    LoginType,
    QuestionId,
    QuestionType,
    UserFormType,
    UserType,
} from "../types";

// Quiz Up API:
const baseURL: string = "https://cae-bookstore.herokuapp.com";
// All http endpoints:

// POST: no auth | register user, PUT: token | edit user, DELETE: token | delete user
const userEndpoint: string = "/user";
// GET: basic auth | user info and token
const loginEndpoint: string = "/login";

// GET: token | current user's questions, POST: token | create question
const questionEndpoint: string = "/question";

// PUT: token | edit specific question, DELETE: token | delete question
// '/question/<Question ID>'

// GET: no auth | all questions as json
const allQuestionEndpoint: string = "/question/all";

const apiClientNoAuth = () =>
    axios.create({
        baseURL: baseURL,
    });

const apiClientBasicAuth = (email: string, password: string) => {
    let auth = btoa(`${email}:${password}`);
    return axios.create({
        baseURL: baseURL,
        headers: { Authorization: `Basic ${auth}` },
    });
};

const apiClientTokenAuth = (token: string) => {
    return axios.create({
        baseURL: baseURL,
        headers: { Authorization: `Bearer ${token}` },
    });
};

type APIResponse<T> = {
    data?: T;
    error?: string;
};

// Each of the following will return an API response's data using an async function
// It will either end up returning the data or an error

// Use GET at the allQuestionEndpoint to process question data and return promise with that data
async function getAllQuestions(): Promise<
    APIResponse<{ questions: QuestionType[] }>
> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(allQuestionEndpoint);
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = `Something ain't right here`;
        }
    }
    return { data, error };
}

// Use POST to create a new user
async function register(
    newUserData: UserFormType
): Promise<APIResponse<UserFormType>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().post(
            userEndpoint,
            newUserData
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong";
        }
    }
    return { data, error };
}


// Edit User endpoint: PUT
async function editUser(token: string,
    sendData: EditUserType
): Promise<APIResponse<string>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).put(
            userEndpoint,
            sendData
        );
        data = response.data;
        console.log('data', data)
    } catch (err: any) {
        //console.log(err) // TYPE: instance of AxiosError class??
        if (err.response) {
            console.log('axioserr', err)
            console.log('status', err.response.status)
            error = err?.message
        } else {
            error = 'Normal Error!'
        }
        console.log('WHEREREsDSADSADSA', error)
        
        // error = err?.message
    }
    return { data, error };
}


// Delete User endpoint: DELETE
async function deleteUser(token: string): Promise<APIResponse<string>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).delete(userEndpoint);
        data = response.data;
        console.log('data', data)
    } catch (err: any) {
        //console.log(err) // TYPE: instance of AxiosError class??
        if (err.response) {
            error = err?.message
        } else {
            error = 'Normal Error!'
        }
    }
    return { data, error };
}



// Use GET along with basic auth: email:password encoded
async function logUserIn(loginData: LoginType): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try {
        const response = await apiClientBasicAuth(
            loginData.email,
            loginData.password
        ).get(loginEndpoint);
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "This login ain't right y'all";
        }
    }
    return { data, error };
}

// POST along with token auth to create a question
async function createQuestion(
    questionData: CreateQuestionType,
    token: string
): Promise<APIResponse<QuestionId>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).post(
            questionEndpoint,
            questionData
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong with question creation";
        }
    }
    return { data, error };
}

// GET along with token to see all questions related to currentUser
async function viewMyQuestions(
    token: string
): Promise<APIResponse<{ questions: QuestionType[] }>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(questionEndpoint);
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong with retrieving questions";
        }
    }
    return { data, error };
}

// Delete question endpoint DELETE
async function deleteQuestion(
    token: string,
    question_id: string
): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).delete(
            questionEndpoint + "/" + question_id
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong with retrieving questions";
        }
    }
    return { data, error };
}

// Edit question endpoint PUT
async function editQuestion(
    token: string,
    question_id: string,
    sendData: EditQuestionType
): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).put(
            questionEndpoint + "/" + question_id,
            sendData
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong with retrieving questions";
        }
    }
    return { data, error };
}


export {
    getAllQuestions,
    register,
    logUserIn,
    editUser,
    createQuestion,
    viewMyQuestions,
    deleteQuestion,
    editQuestion,
    deleteUser
};
