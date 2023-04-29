import React, {useMemo, useState} from "react"
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import DocumentUploadsComponent from "@/components/admin/document-uploads/document-uploads-component";
import {UploadFilter} from "@/model/generated/graphql";
import {UploadFilterItem} from "@/components/admin/document-uploads/upload-filter-tag";

const uploadsQuery = gql(`
query uploads(
  $filters: [UploadFilter!]!
) {
  uploads(
    filters: $filters
  ) {
    results {
      id
      tag
      state
      created
      deposit {
        id
        tag
        value
        comment
      }
      depositAvailable
      rewardAvailable
      document {
        id
        lectures {
          id
          displayName
        }
      }
    }
  }
}
`)

const DocumentUploadsContainer = () => {
  const [tag, setTag] = useState("")
  const [filters, setFilters] = useState<UploadFilterItem[]>([])
  const allFilters = useMemo(() => {
    const allFilters: UploadFilter[] = filters
      .map(filter => ({
        ...filter,
        // We need to remove this property because it's only useful for the client
        // and the server doesn't accept it.
        clientId: undefined,
      }))
    if (tag) {
      allFilters.push({
        tag,
      })
    }
    return allFilters
  }, [tag, filters])
  const {data, loading, error, previousData, refetch} = useQuery(uploadsQuery, {
    variables: {
      filters: allFilters,
    }
  })

  if (loading && !previousData) {
    return <Spinner/>
  } else if (error) {
    return <div className="text-danger">{error.message}</div>
  }

  return (
    <DocumentUploadsComponent
      uploads={data?.uploads || previousData!.uploads!}
      tag={tag}
      setTag={setTag}
      filters={filters}
      setFilters={setFilters}
      refetch={refetch}
    />
  )
}

export default DocumentUploadsContainer