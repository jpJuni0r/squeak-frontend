import React from "react"
import {Examiner} from "@/model/generated/graphql";
import AddExaminerButton from "@/components/admin/examiner/add-examiner-button";

interface Props {
  examiners: Examiner[]
  refresh: () => void
}

const ExaminersListComponent = ({examiners, refresh}: Props) => {
  return (
    <>
      <div>
        <AddExaminerButton refresh={refresh}/>
      </div>
      <ul className="list-group">
        {examiners.map(examiner => (
          <li className="list-group-item d-flex" key={examiner.id}>
            <div className="flex-grow-1">
              {examiner.displayName}
            </div>
          </li>
        ))}
        {!examiners.length && <li className="list-group-item disabled">
            There are no examiners.
        </li>}
      </ul>
    </>
  )
}

export default ExaminersListComponent
