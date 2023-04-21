import React from "react"
import {gql} from "@/model/generated"
import LoginForm from "@/components/login/login-form";


const Login = () => {
  return (
    <div className="container">
      <div className="modal position-static d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
