import React, {Dispatch, SetStateAction} from "react"
import {UploadFilter, UploadsQuery} from "@/model/generated/graphql";
import {Check2, Hourglass, X} from "react-bootstrap-icons";
import EditUploadButton from "@/components/admin/document-uploads/edit-upload-button";
import PayoutRewardButton from "@/components/admin/document-uploads/payout-reward-button";
import AdvancedFilterButton from "@/components/admin/document-uploads/advanced-filter-button";
import UploadFilterTag, {UploadFilterItem} from "@/components/admin/document-uploads/upload-filter-tag";
import PayoutDepositButton from "@/components/admin/document-uploads/payout-deposit-button";

interface Props {
  uploads: UploadsQuery["uploads"]
  tag: string;
  setTag: (tag: string) => void
  filters: UploadFilterItem[]
  setFilters: Dispatch<SetStateAction<UploadFilterItem[]>>
  refetch: () => void
}

const DocumentUploadsComponent = ({uploads, tag, setTag, filters, setFilters, refetch}: Props) => {
  const addFilter = (newFilter: UploadFilter) => {
    setFilters(filters => ([
      ...filters,
      {
        ...newFilter,
        clientId: Number(new Date()),
      },
    ]))
  }

  return (
    <div className="vstack gap-3">
      <div className="vstack gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a tag..."
          onChange={e => setTag(e.target.value || "")}
          value={tag}
        />
        <div className="hstack gap-1">
          {filters.map(filter => (
            <UploadFilterTag filter={filter} setFilters={setFilters} key={filter.clientId}/>
          ))}
          <AdvancedFilterButton addFilter={addFilter}/>
        </div>
      </div>
      <table className="table">
        <thead>
        <tr>
          <th>State</th>
          <th>Tag</th>
          <th>Lectures</th>
          <th>Date</th>
          <th>Deposit available</th>
          <td/>
        </tr>
        </thead>
        <tbody>
        {uploads.results.map(upload => (
          <tr key={upload.id}>
            <td>
              {upload.state === "PENDING" && <Hourglass/>}
              {upload.state === "APPROVED" && <Check2/>}
              {upload.state === "REJECTED" && <X/>}
            </td>
            <td>{upload.tag}</td>
            <td>{upload.document.lectures.map(l => l.displayName).join(", ")}</td>
            <td>{new Date(upload.created).toLocaleDateString()}</td>
            <td>{upload.depositAvailable && <Check2/>}</td>
            <td>
              <div className="hstack gap-1 justify-content-end">
                {upload.rewardAvailable && (
                  <PayoutRewardButton upload={upload}/>
                )}
                {upload.depositAvailable && (
                  <PayoutDepositButton upload={upload} refetch={refetch} />
                )}
                <EditUploadButton upload={upload}/>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default DocumentUploadsComponent

