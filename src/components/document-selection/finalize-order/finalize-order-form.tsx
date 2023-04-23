import React from "react"
import {DocumentsQuery} from "@/model/generated/graphql";
import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {Form} from "react-final-form";
import TextField from "@/components/form/text-field";
import {FORM_ERROR} from "final-form";

interface Props {
  docs: DocumentsQuery["documents"]["results"]
  closeModal: () => void;
}

const orderMutation = gql(`
mutation createOrder(
  $tag: String,
  $documents: [DocumentId!]!,
) {
  createOrder(
    tag: $tag,
    documents: $documents
  ) {
    __typename
    ... on Order {
      id
      tag
    }
    ... on InvalidIdError {
      msg
    }
    ... on StringTooLargeError {
      msg
    }
    ... on GeneralError {
      msg
    }
  }
}
`)

interface FormValues {
  tag?: string;
}

const FinalizeOrderForm = ({docs, closeModal}: Props) => {
  const [order] = useMutation(orderMutation, {errorPolicy: "all"})

  const onSubmit = async (values: FormValues) => {
    const res = await order({
      variables: {
        documents: docs.map(d => d.id),
        tag: values.tag,
      }
    })

    if (res.errors) {
      return {
        [FORM_ERROR]: res.errors.map(e => e.message).join(", ")
      }
    } else if (
      res.data!.createOrder.__typename === "InvalidIdError"
      || res.data!.createOrder.__typename === "GeneralError"
      || res.data!.createOrder.__typename === "StringTooLargeError"
    ) {
      return {
        [FORM_ERROR]: res.data!.createOrder.msg
      }
    }
  }

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError, submitSucceeded, values }) => (
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {!submitSucceeded ? (
              <div className="vstack gap-1">
                <div className="text-muted">
                  To finalize the order, please choose a name. With this name, you&#39;ll be able to pickup
                  the documents at the Fachschafts office.
                </div>
                <TextField name="tag" label="Name" isRequired />
                {submitError && <p className="text-danger">{submitError[FORM_ERROR]}</p>}
              </div>
            ) : (
              <div>
                <p>Your order is now processed!</p>
                <p>
                  The documents are now ready for pickup. When visiting, make sure you mention the
                  name <b>{values.tag}</b>.
                </p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            {!submitSucceeded ? (
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                Submit
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={closeModal}>Close</button>
            )}
          </div>
        </form>
      )}
    />
  )
}

export default FinalizeOrderForm
