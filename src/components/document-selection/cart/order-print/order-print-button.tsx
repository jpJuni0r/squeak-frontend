import React, {useState} from "react"
import {Modal} from "react-bootstrap";
import {DocumentsQuery} from "@/model/generated/graphql";
import OrderPrintForm from "@/components/document-selection/cart/order-print/order-print-form";

interface Props {
  docs: DocumentsQuery["documents"]["results"]
}

const OrderPrintButton = ({ docs }: Props) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
        Print
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Print order</Modal.Title>
        </Modal.Header>
        <OrderPrintForm docs={docs} closeModal={() => setShowModal(false)}/>
      </Modal>
    </>
  )
}

export default OrderPrintButton
