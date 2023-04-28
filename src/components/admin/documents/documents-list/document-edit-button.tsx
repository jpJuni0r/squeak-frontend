import React, {useState} from "react"
import {AdminDocumentsQuery} from "@/model/generated/graphql";
import {Pencil} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import DocumentEditFormContainer from "@/components/admin/documents/documents-list/document-edit-form-container";

interface Props {
  doc: AdminDocumentsQuery["documents"]["results"][0],
  refetch: () => void
}

const DocumentEditButton = ({doc, refetch}: Props) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button className="btn btn-sm" onClick={() => setShowModal(true)}>
        <Pencil/>
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit document</Modal.Title>
        </Modal.Header>
        <DocumentEditFormContainer doc={doc} refetchAndCloseModal={() => {
          setShowModal(false)
          refetch()
        }}
        />
      </Modal>
    </>
  )
}

export default DocumentEditButton
