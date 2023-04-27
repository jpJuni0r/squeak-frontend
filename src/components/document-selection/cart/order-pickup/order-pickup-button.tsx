import React, {useState} from "react"
import {DocumentsQuery} from "@/model/generated/graphql";
import {Modal} from "react-bootstrap";
import OrderPickupForm from "@/components/document-selection/cart/order-pickup/order-pickup-form";

interface Props {
  docs: DocumentsQuery["documents"]["results"]
}

const OrderPickupButton = ({docs}: Props) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button className="btn btn-primary" onClick={() => setShowModal(true)} disabled={docs.length === 0}>
        Order for pickup
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Order Documents
          </Modal.Title>
        </Modal.Header>
        <OrderPickupForm docs={docs} closeModal={() => setShowModal(false)} />
      </Modal>
    </>
  )
}

export default OrderPickupButton
