import React from "react"
import {DocumentsQuery} from "@/model/generated/graphql";
import {Chat, FileEarmarkFont, Hourglass, Pencil, Star, X} from 'react-bootstrap-icons';

interface Props {
  document: DocumentsQuery["documents"]["results"][0],
  unvalidated?: boolean;
}

const DocumentAttributeIcons = ({ document, unvalidated }: Props) => {
  return (
    <div className="text-muted hstack gap-1">
      {document.__typename === "OralExam" && <Chat/>}
      {document.__typename === "WrittenExam" && <FileEarmarkFont/>}
      {document.rating === "EXCELLENT" && <Star />}
      {document.rating === "NEEDS_IMPROVEMENT" && <div>&#128169;</div>}
      {unvalidated && <Hourglass/>}
    </div>
  )
}

export default DocumentAttributeIcons
