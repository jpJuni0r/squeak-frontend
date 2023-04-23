import React from "react"
import {Examiner} from "@/model/generated/graphql";

interface Props {
  examiners: Examiner[],
}

const ExaminersListComponent = ({examiners}: Props) => {
  return (
    <ul className="list-group">
      {examiners.map(examiner => (
        <li className="list-group-item" key={examiner.id}>
          {examiner.displayName}
        </li>
      ))}
      {!examiners.length && <li className="list-group-item disabled">
          There are no examiners.
      </li>}
    </ul>
  )
}

export default ExaminersListComponent
