import { useState } from "react";
import { deleteUser, editUser } from "../lib/apiWrapper";
import { EditUserType } from "../types";
import { useNavigate } from "react-router-dom";

type ProfileProps = {
    logUserOut: () => void;
};

export default function Profile({ logUserOut }: ProfileProps) {
    const navigate = useNavigate();

    const [editUserFormData, setEditUserFormData] = useState<EditUserType>({
        email: localStorage.getItem("email") || "",
        first_name: localStorage.getItem("first_name") || "",
        last_name: localStorage.getItem("last_name") || "",
        password: "",
        confirm: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEditUserFormData({
            ...editUserFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editUserFormData.confirm == "confirm") {
            console.log(e.target);
            console.log(editUserFormData);
            let submitUserFormData: EditUserType = { ...editUserFormData };
            if (submitUserFormData.password == "") {
                delete submitUserFormData.password;
            }
            let response = await editUser(
                localStorage.getItem("token")!,
                submitUserFormData
            );
            if (response.error) {
                console.warn(response.error);
            } else {
                navigate("/");
                logUserOut();
            }
        } else {
            console.log("PLEASE CONFIRM CHANGES");
        }
    };

    const handleDeleteUser = async () => {
        let response = await deleteUser(localStorage.getItem("token")!);
        if (response.error) {
            console.warn(response.error);
        } else {
            navigate("/");
            logUserOut();
            console.log("deleted successfully");
        }
    };

    if (localStorage.getItem("token")) {
        return (
            <>
                <div style={{ margin: "auto", width: "80%" }}>
                    <h2>Account Information:</h2>
                    <p>
                        <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                        {localStorage.getItem("email")}
                    </p>
                    <p>
                        <span style={{ fontWeight: "bold" }}>first_name:</span>{" "}
                        {localStorage.getItem("first_name")}
                    </p>
                    <p>
                        <span style={{ fontWeight: "bold" }}>last_name:</span>{" "}
                        {localStorage.getItem("last_name")}
                    </p>
                </div>
                <div style={{ margin: "auto", width: "80%" }}>
                    <form onSubmit={handleUpdateUser}>
                        <p>Email:</p>
                        <input
                            type="email"
                            name="email"
                            value={editUserFormData.email!}
                            onChange={handleInputChange}
                        />
                        <p>First Name:</p>
                        <input
                            type="text"
                            name="first_name"
                            value={editUserFormData.first_name!}
                            onChange={handleInputChange}
                        />
                        <p>Last Name:</p>
                        <input
                            type="text"
                            name="last_name"
                            value={editUserFormData.last_name!}
                            onChange={handleInputChange}
                        />
                        <p>New Password:</p>
                        <input
                            type="password"
                            name="password"
                            value={editUserFormData.password!}
                            onChange={handleInputChange}
                        />
                        <p>Editing your account will require you to log back in</p>
                        <p>Enter "confirm" below to confirm changes:</p>
                        <input
                            type="text"
                            name="confirm"
                            value={editUserFormData.confirm!}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Submit Changes</button>
                    </form>
                </div>
                <div style={{ margin: "auto", width: "50%" }}>
                    <p><br /><br /></p>
                    <p style={{textAlign:'center'}}>Deleting the user cannot be reversed:</p>
                    <button
                        style={{
                            height: "100px",
                            width: "100%",
                            backgroundColor: "#c42222",
                            fontSize:'2rem'
                        }}
                        onClick={handleDeleteUser}
                    >
                        DELETE USER
                    </button>
                </div>
            </>
        );
    } else {
        return (
            <>
                <h1>
                    UNAUTHORIZED: Please log in first before accessing this page
                </h1>
            </>
        );
    }
}
