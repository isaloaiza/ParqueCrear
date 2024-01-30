import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Autenticacion/AutProvider";
import DefaultLayout from "../layout/DefaultLayout"
import { useState } from "react"
import { API_URL } from "../Autenticacion/constanst";
import type { AuthResponse, AuthResponseError } from "../types/types";
import React from "react";


export default function Login() {

  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("")
  const auth = useAuth();
  const goto = useNavigate();


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gmail,
          password
        })
      })

      if (
        response.ok) {
        console.log("Inicio de sesión exitoso.")
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);

          goto("/dashboard")

        }

      } else {
        console.log("algo malo acurrió :o");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;

      }
    } catch (error) {
      console.log(error)
    }
  }

  if (auth.esAutentico) {
    return <Navigate to="/dashboard" />
  };

  return (
    <DefaultLayout>
      <div className="form-box">
        <div className="wrapper">
          <div className="img-area">
            <img src="https://th.bing.com/th/id/OIG.ey3LOpHlbcuM8e4rTiye?pid=ImgGn" alt="imagen" /> {/* Here's the corrected line */}
          </div>
          <div className="form-area">
            <form className="form" onSubmit={handleSubmit}>
              <h1>Login</h1>
              {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
              <label>Email</label>
              <input
                type="email"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}></input>
              <label>password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}></input>
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>

  )

}
