import React from "react";
import {useRouter} from "next/router";
import Link from "next/link";

interface Tab {
  label: SettingsTabOption,
  displayName: string;
}

export enum SettingsTabOption {
  DOCUMENTS = "documents",
  LECTURES = "lectures",
  EXAMINERS = "examiners",
  FACULTIES = "faculties",
}

const tabs: Tab[] = [{
  displayName: "Documents",
  label: SettingsTabOption.DOCUMENTS,
}, {
  displayName: "Lectures",
  label: SettingsTabOption.LECTURES,
}, {
  displayName: "Examiners",
  label: SettingsTabOption.EXAMINERS,
}, {
  displayName: "Faculties",
  label: SettingsTabOption.FACULTIES
}]

const AdminTabs = () => {
  const router = useRouter()
  const selectedTab = router.query.tab

  return (
    <div className="list-group list-group-horizontal">
      {tabs.map(tab => (
        <Link
          href={`/admin?tab=${encodeURIComponent(tab.label)}`}
          className={`list-group-item${selectedTab === tab.label ? " active" : ""}`}
          key={tab.label}
        >
          {tab.displayName}
        </Link>
      ))}
    </div>
  )
}

export default AdminTabs
