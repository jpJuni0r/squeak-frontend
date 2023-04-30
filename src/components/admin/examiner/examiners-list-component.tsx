import React from "react"
import {Examiner} from "@/model/generated/graphql";
import AddExaminerButton from "@/components/admin/examiner/add-examiner-button";
import DeleteExaminerButton from "@/components/admin/examiner/delete-examiner-button";
import ValidateExaminerButton from "@/components/admin/examiner/validate-examiner-button";
import EditExaminerButton from "@/components/admin/examiner/edit-examiner-button";

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
            <div className="stack gap-1">
              {!examiner.validated && (
                <ValidateExaminerButton examiner={examiner} refresh={refresh}/>
              )}
              <DeleteExaminerButton examiner={examiner} refresh={refresh}/>
              <EditExaminerButton examiner={examiner} refresh={refresh}/>
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
