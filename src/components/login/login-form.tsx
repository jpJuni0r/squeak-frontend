import React from "react";
import {useRouter} from "next/router";
import {Form} from "react-final-form";
import TextField from "@/components/form/text-field";
import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {FORM_ERROR} from "final-form";
import {useProcessAuthentication} from "@/hooks/authentication";

const loginMutation = gql(`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    __typename
    ... on Error {
      msg
    }
    ... on Credentials {
      token
      user {
        username
        displayName
      }
      permissions
    }
    ... on GeneralError {
      msg
    }
  }
}`)

interface FormValues {
  username?: string;
  password?: string;
}

const LoginForm = () => {
  const router = useRouter()

  const [login] = useMutation(loginMutation, {errorPolicy: "none"})
  const processAuthentication = useProcessAuthentication()

  const onSubmit = async (values: FormValues) => {
    const res = await login({
      variables: {
        // non-null assertion are safe, because fields have isRequired flag set
        username: values.username!,
        password: values.password!,
      }
    })

    if (res.errors) {
      return {
        [FORM_ERROR]: res.errors.map(e => e.message).join(", ")
      }
    } else if (res.data!.login.__typename === "GeneralError") {
      return {
        [FORM_ERROR]: res.data?.login!.msg,
      }
    }

    await processAuthentication(
      {
        username: res.data!.login.user.username,
        displayName: res.data!.login.user.displayName,
        token: res.data!.login.token,
      },
      res.data!.login.permissions
    )
    await router.push("/")
  }

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="vstack gap-3">
              <TextField name="username" label="Username" isRequired />
              <TextField type="password" name="password" label="Password" isRequired />
              {submitError && <p className="text-danger">{submitError}</p>}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" disabled={submitting}>Login</button>
          </div>
        </form>
      )}
    />
  )
}

export default LoginForm;
