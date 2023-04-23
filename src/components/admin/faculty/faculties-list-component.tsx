import React from "react"
import {Faculty} from "@/model/generated/graphql";

interface Props {
  faculties: Faculty[]
}

const FacultiesListComponent = ({faculties}: Props) => {
  return (
    <ul className="list-group">
      {faculties.map(faculty => (
        <li className="list-group-item" key={faculty.id}>
          {faculty.displayName}
        </li>
      ))}
      {!faculties.length && <li className="list-group-item disabled">
          There are no faculties.
      </li>}
    </ul>
  )
}

export default FacultiesListComponent
