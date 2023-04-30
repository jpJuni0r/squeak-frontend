import React from "react"
import {Faculty, Lecture, LecturesQuery} from "@/model/generated/graphql";
import AddLectureButton from "@/components/admin/lecture/add-lecture-button";
import EditLectureButton from "@/components/admin/lecture/edit-lecture-button";
import LectureValidateButton from "@/components/admin/lecture/lecture-validate-button";
import {Hourglass} from "react-bootstrap-icons";
import DeleteLectureButton from "@/components/admin/lecture/delete-lecture-button";

interface Props {
  lectures: LecturesQuery["lectures"]
  faculties: Faculty[]
  refresh: () => void;
}

const LecturesListComponent = ({lectures, faculties, refresh}: Props) => {
  return (
    <>
      <div>
        <AddLectureButton faculties={faculties} refresh={refresh} />
      </div>
      <ul className="list-group">
        {lectures.map(lecture => (
          <li className="list-group-item d-flex" key={lecture.id}>
            <div className="flex-grow-1">
              {lecture.displayName}
              {Boolean(lecture.aliases.length) && (
                <span> ({lecture.aliases.join(", ")})</span>
              )}
              {lecture.comment && (
                <small>
                  <b className="mx-1">&middot;</b>
                  <span>{lecture.comment}</span>
                </small>
              )}
            </div>
            <div className="hstack gap-1">
              {!lecture.validated && (
                <LectureValidateButton lecture={lecture} refresh={refresh}/>
              )}
              <DeleteLectureButton lecture={lecture} refresh={refresh} />
              <EditLectureButton lecture={lecture} faculties={faculties} refresh={refresh} />
            </div>
          </li>
        ))}
        {!lectures.length && <li className="list-group-item disabled">
            There are no lectures.
        </li>}
      </ul>
    </>
  )
}

export default LecturesListComponent
