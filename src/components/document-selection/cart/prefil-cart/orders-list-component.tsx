import React, {useMemo, useState} from "react"
import {Field, Form} from "react-final-form";
import {useQuery} from "@apollo/client";
import {FORM_ERROR} from "final-form";
import {gql} from "@/model/generated";
import {DocumentFilter, DocumentsQuery, OrderFilter, OrdersQuery} from "@/model/generated/graphql";

interface Props {
  orders: OrdersQuery["orders"]
  setFilters: (filter: OrderFilter[]) => void;
  setSelectedDocuments: (documents: DocumentsQuery["documents"]["results"]) => void;
}

// This documents semantic must that of the documentsQuery
const documentsByIdQuery = gql(`
query documentsById($ids: [DocumentId!]!) {
  documentsById(ids: $ids) {
    __typename
    id
    date
    semester
    public
    publicComment
    publishedOn
    downloadable
    rating
    numPages
    examiners {
      id
      name
      displayName
    }
    lectures {
      id
      displayName
    }
    ... on WrittenExam {
      solution
    }
  }
}
`)


interface FormValues {
  order?: string
}

const OrdersListComponent = ({orders, setFilters, setSelectedDocuments}: Props) => {
  const [searchValue, setSearchValue] = useState("")
  const {refetch} = useQuery(documentsByIdQuery, {initialFetchPolicy: "standby"})
  const onSubmit = async (values: FormValues) => {
    const order = orders.results.find(o => o.id === values.order)!
    const response = await refetch({
      ids: order.documents.map(d => d.id),
    })

    if (response.error) {
      return {
        [FORM_ERROR]: response.error.message
      }
    }

    setSelectedDocuments(response.data!.documentsById as any)
  }

  const initialValues = useMemo<Partial<FormValues>>(() => {
    return {
      order: orders.results.length ? orders.results[0].id : undefined,
    }
    // We only want to set the initial value once, because the orders change when searching
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({handleSubmit, submitting, invalid}) => (
        <form onSubmit={handleSubmit}>
          <div className="modal-body vstack gap-3">
            <div>
              <input
                type="text"
                onChange={(e) => {
                  const { value } = e.target
                  if (e.target.value) {
                    const filter: OrderFilter = {
                      tag: e.target.value
                    }
                    setFilters([filter])
                  } else {
                    setFilters([])
                  }
                  setSearchValue(value)
                }}
                placeholder="Type to search for a tag..."
                className="form-control"
                value={searchValue}
              />
            </div>
            <table className="table table-striped">
              <tbody>
                {orders.results.map(order => (
                  <Field<string>
                    name="order"
                    type="radio"
                    value={order.id}
                    key={order.id}
                    validate={f => {
                      if (!f) {
                        return "Order is required"
                      }
                    }}
                    render={({ input }) => (
                      <tr key={order.id}>
                        <td>
                          <input {...input} className="form-check-input me-1" id={order.id}/>
                        </td>
                        <td>
                          {order.tag}
                        </td>
                        <td>
                          {order.lectures.map(l => l.displayName).join(", ")}
                        </td>
                        <td>
                          {order.numPages} {order.numPages === 1 ? "page" : "Pages"}
                        </td>
                      </tr>
                    )}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" disabled={submitting || invalid}>Select</button>
          </div>
        </form>
      )}
    />
  )
}

export default OrdersListComponent
