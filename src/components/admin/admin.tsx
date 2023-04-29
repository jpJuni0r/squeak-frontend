import React from "react"
import {useRouter} from "next/router";
import AdminTabs, {SettingsTabOption} from "@/components/admin/option-tabs";
import LecturesListContainer from "@/components/admin/lecture/lectures-list-container";
import ExaminersListContainer from "@/components/admin/examiner/examiners-list-container";
import DocumentsAdminContainer from "@/components/admin/documents/documents-admin-container";
import FacultiesListContainer from "@/components/admin/faculty/faculties-list-container";
import DocumentUploadsContainer from "@/components/admin/document-uploads/document-uploads-container";

const Admin = () => {
  const router = useRouter()

  const { tab } = router.query

  if (!tab) {
    router.replace(router.asPath, { query: { tab: SettingsTabOption.DOCUMENTS }})
  }

  return (
    <div className="container mt-1 vstack gap-2">
      <AdminTabs />
      {tab === SettingsTabOption.DOCUMENTS && <DocumentsAdminContainer />}
      {tab === SettingsTabOption.DOCUMENT_UPLOADS && <DocumentUploadsContainer />}
      {tab === SettingsTabOption.LECTURES && <LecturesListContainer />}
      {tab === SettingsTabOption.EXAMINERS && <ExaminersListContainer />}
      {tab === SettingsTabOption.FACULTIES && <FacultiesListContainer />}
    </div>
  )
}

export default Admin
