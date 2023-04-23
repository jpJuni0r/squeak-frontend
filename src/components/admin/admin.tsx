import React from "react"
import {useRouter} from "next/router";
import AdminTabs, {SettingsTabOption} from "@/components/admin/option-tabs";
import LecturesListContainer from "@/components/admin/lecture/lectures-list-container";
import ExaminersListContainer from "@/components/admin/examiner/examiners-list-container";

const Admin = () => {
  const router = useRouter()

  const { tab } = router.query

  if (!tab) {
    router.replace(router.asPath, { query: { tab: "lectures" }})
  }

  return (
    <div className="container mt-1 vstack gap-2">
      <AdminTabs />
      {tab === SettingsTabOption.LECTURES && <LecturesListContainer />}
      {tab === SettingsTabOption.EXAMINERS && <ExaminersListContainer />}
      {tab === SettingsTabOption.FACULTIES && <LecturesListContainer />}
    </div>
  )
}

export default Admin