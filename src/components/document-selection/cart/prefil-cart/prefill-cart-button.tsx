import React, {Dispatch, ReducerAction, useState} from "react"
import {Download} from "react-bootstrap-icons";
import AuthFence from "@/shared/auth-fence";
import {Permission} from "@/model/generated/graphql";
import {Modal} from "react-bootstrap";
import OrdersListContainer from "@/components/document-selection/cart/prefil-cart/orders-list-container";
import {documentsSelectionReducer} from "@/hooks/documents-selection";

interface Props {
  documentSelectionDispatcher: Dispatch<ReducerAction<typeof documentsSelectionReducer>>
}

const PrefillCartButton = ({ documentSelectionDispatcher }: Props) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <AuthFence permissions={[Permission.QueryOrders]} quiet>
      <button className="btn btn-sm" onClick={() => setShowModal(true)}>
        <Download/>
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Fill cart from order
          </Modal.Title>
        </Modal.Header>
        <OrdersListContainer setSelectedDocuments={(documents) => {
          documentSelectionDispatcher({ type: "set_documents", documents })
          setShowModal(false)
        }} />
      </Modal>
    </AuthFence>
  )
}

export default PrefillCartButton
