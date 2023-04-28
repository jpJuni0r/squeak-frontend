import React, {useState} from "react"
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import OrdersListComponent from "@/components/document-selection/cart/prefil-cart/orders-list-component";
import {DocumentsQuery, OrderFilter} from "@/model/generated/graphql";

interface Props {
  setSelectedDocuments: (documents: DocumentsQuery["documents"]["results"]) => void
}

const ordersQuery = gql(`
query orders(
  $filters: [OrderFilter!]!
) {
  orders (
    filters: $filters,
  ) {
    results {
      id
      tag
      state
      created
      numPages
      price
      documents {
        id
      }
      lectures {
        id
        displayName
      }
      examiners {
        id
        displayName
      }
    }
  }
}
`)

const OrdersListContainer = ({ setSelectedDocuments }: Props) => {
  const [filters, setFilters] = useState<OrderFilter[]>([])
  const {data, loading, error, previousData} = useQuery(ordersQuery, {
    variables: {
      filters,
    },
  })

  if (loading && !previousData) {
    return <Spinner/>
  } else if (error) {
    return (
      <div className="text-danger">{error.message}</div>
    )
  }

  return (
    <OrdersListComponent
      orders={data?.orders || previousData!.orders}
      setSelectedDocuments={setSelectedDocuments}
      setFilters={setFilters}
    />
  )
}

export default OrdersListContainer
