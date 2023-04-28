import React, {useState} from "react"
import {Download} from "react-bootstrap-icons";
import AuthFence from "@/shared/auth-fence";
import {DocumentsQuery, OrdersQuery, Permission} from "@/model/generated/graphql";
import {Modal} from "react-bootstrap";
import OrdersListContainer from "@/components/document-selection/cart/prefil-cart/orders-list-container";

interface Props {
  setSelectedDocuments: (documents: DocumentsQuery["documents"]["results"]) => void
}

const PrefilCartButton = ({ setSelectedDocuments }: Props) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <AuthFence permissions={[Permission.QueryOrders]} quiet>
      <button className="btn btn-sm" onClick={() => setShowModal(true)}>
        <Download/>
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header>
          <Modal.Title>
            Fill cart from order
          </Modal.Title>
        </Modal.Header>
        <OrdersListContainer setSelectedDocuments={(documents) => {
          setSelectedDocuments(documents)
          setShowModal(false)
        }} />
      </Modal>
    </AuthFence>
  )
}

export default PrefilCartButton
