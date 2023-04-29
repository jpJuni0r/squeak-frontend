import React, {useState} from "react"
import {Field} from "react-final-form";
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import DepositFieldInner from "@/components/admin/document-uploads/deposit-field-inner";

interface Props {
  name: string
}

const depositSelectionQuery = gql(`
query depositSelection(
  $filters: [DepositFilter!]!
) {
  deposits(
    filters: $filters
  ) {
    results {
      id
      tag
      created
      value
      created
    }
  }
}
`)

const DepositField = ({name}: Props) => {
  const [tag, setTag] = useState("")
  const {data, loading, error, previousData} = useQuery(depositSelectionQuery, {
    variables: {
      filters: tag ? {
        tag,
      } : [],
    },
  })
  return (
    <div className="vstack gap-1">
      <label htmlFor="tag-search">Tag</label>
      <input
        type="text"
        value={tag}
        id="tag-search"
        className="form-control"
        onChange={e => setTag(e.target.value)}
        placeholder="Search for a tag..."
      />
      <div className="list-wrapper">
        {(loading && !previousData?.deposits)
          ? <Spinner />
          : error
          ? <div className="text-danger">{error.message}</div>
          : <DepositFieldInner name={name} deposits={data?.deposits || previousData!.deposits} />
        }
      </div>
      <style jsx>{`
      .list-wrapper {
        max-height: 250px;
        overflow-y: auto;
      }
      `}</style>
    </div>
  )
}

export default DepositField
