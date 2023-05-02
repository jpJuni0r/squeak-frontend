import React, {useState} from "react"
import {Plus} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import AdvancedFilterForm from "@/components/admin/deposits/advanced-filter-form";
import {DepositFilter, DepositsQuery} from "@/model/generated/graphql";

interface Props {
  lectures: DepositsQuery["lectures"]
  addFilter: (filter: DepositFilter) => void
}

const AddAdvancedFilterButton = ({lectures, addFilter}: Props) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setShowModal(true)}>
        <Plus/> Add advanced filter
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add advanced filter</Modal.Title>
        </Modal.Header>
        <AdvancedFilterForm lectures={lectures} addFilter={filter => {
          addFilter(filter)
          setShowModal(false)
        }}/>
      </Modal>
    </>
  )
}

export default AddAdvancedFilterButton
