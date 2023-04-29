import React, {useState} from "react"
import {Modal} from "react-bootstrap";
import {Form} from "react-final-form";
import {useMutation} from "@apollo/client";
import {Paperclip} from "react-bootstrap-icons";
import {FORM_ERROR} from "final-form";
import {gql} from "@/model/generated";
import {AdminDocumentsQuery} from "@/model/generated/graphql";
import FileField from "@/components/form/file-field";

interface Props {
  doc: AdminDocumentsQuery["documents"]["results"][0]
  refetch: () => void;
}

const updateDocumentFileMutation = gql(`
mutation updateDocumentFile(
  $documentId: DocumentId!
  $file: Upload
){
  updateDocumentFile(
    documentId: $documentId
    file: $file
  ) {
    ... on Document {
      id
      file
      downloadable
    }
    ... on InvalidIdError {
      msg
    }
    ... on FileTooLargeError {
      msg
    }
    ... on GeneralError {
      msg
    }
    ... on Error {
      msg
    }
  }
}
`)

interface FormValues {
  file?: FileList
}


const DocumentEditAttachmentButton = ({doc, refetch}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [updateDocumentFile] = useMutation(updateDocumentFileMutation, {errorPolicy: "all"})

  const onSubmit = async (values: FormValues) => {
    const response = await updateDocumentFile({
      variables: {
        documentId: doc.id,
        // TODO: The server implementation is currently fishy and throws errors.
        // The errors are different when the document is published vs. unpublished.
        file: values.file?[0] : null,
      }
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", "),
      }
    } else if (
      response.data!.updateDocumentFile.__typename === "InvalidIdError"
      || response.data!.updateDocumentFile.__typename === "FileTooLargeError"
      || response.data!.updateDocumentFile.__typename === "GeneralError"
    ) {
      return {
        [FORM_ERROR]: response.data!.updateDocumentFile.msg,
      }
    } else if (
      response.data!.updateDocumentFile.__typename !== "OralExam"
      && response.data!.updateDocumentFile.__typename !== "WrittenExam"
    ) {
      return {
        [FORM_ERROR]: "Received an unknown response type",
      }
    }

    setShowModal(false)
    refetch()
  }

  return (
    <>
      <button className="btn btn-sm" onClick={() => setShowModal(true)}>
        <Paperclip/>
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>File</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={onSubmit}
          render={({handleSubmit, submitting, submitError}) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className="vstack gap-3">
                {doc.file ? (
                  <div className="text-muted">
                    You can view the existing document <a href={doc.file} target="_blank">here</a>.
                  </div>
                ) : (
                  <div className="text-muted">
                    Currently there&apos;s no file for the document available.
                  </div>
                )}
                <FileField name="file" label="Document" />
                {submitError && <div className="text-danger">{submitError}</div>}
              </Modal.Body>
              <Modal.Footer>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  Update document
                </button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    </>
  )
}

export default DocumentEditAttachmentButton
