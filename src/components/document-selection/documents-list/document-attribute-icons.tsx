import React from "react"
import {DocumentsQuery} from "@/model/generated/graphql";
import { Chat, Pencil, Star } from 'react-bootstrap-icons';

interface Props {
  document: DocumentsQuery["documents"]["results"][0],
}

const DocumentAttributeIcons = ({ document }: Props) => {
  return (
    <div className="text-muted hstack gap-1">
      {document.__typename === "OralExam" && <Chat/>}
      {document.__typename === "WrittenExam" && <Pencil/>}
      {document.rating === "EXCELLENT" && <Star />}
    </div>
  )
}

export default DocumentAttributeIcons
