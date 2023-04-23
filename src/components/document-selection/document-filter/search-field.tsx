import React, {useCallback, useMemo, useState} from "react"
import {Examiner, Lecture} from "@/model/generated/graphql";
import Select, {components, MultiValue, OptionProps} from "react-select"

interface Props {
  allExaminers: Examiner[];
  allLectures: Lecture[];
  onChange: (value: (Lecture | Examiner)[]) => void;
}

const SelectOption = ({ data, ...rest}: OptionProps<Examiner | Lecture>) => {
  let title = data.displayName
  let subtitle: string | null = null

  if (data.__typename === "Examiner") {
    //
  } else if (data.__typename === "Lecture") {
    subtitle = data.aliases.join(", ") || null
  } else {
    throw new Error(`Unknown option typename: ${JSON.stringify(data.__typename)}`)
  }

  return (
    <components.Option data={data} {...rest}>
      {title}
      {subtitle && (
        <div className="text-muted">{subtitle}</div>
      )}
    </components.Option>
  );
}


const SearchField = ({ allExaminers, allLectures, onChange}: Props) => {
  const options = useMemo(() => {
    // This does two things:
    // 1. Compute label field, because is it's the basis for the search functionality
    // 2. Compute value field, because it's used to different between multiple items. This
    //    Way you can't select an option twice.
    return [
      ...allExaminers.map(e => ({ ...e, label: e.displayName, value: `${e.__typename}-${e.id}` })),
      ...allLectures.map(l => {
        let label = l.displayName
        if (l.aliases.length > 0) {
          label += ` (${l.aliases.join(", ")})`
        }
        return {
          ...l,
          label,
          value: `${l.__typename}-${l.id}`,
        }
      }),
    ]
  }, [allLectures, allExaminers])
  const components = useMemo(() => ({ Option: SelectOption }), [])
  const change = useCallback((value: MultiValue<Examiner | Lecture>) => {
    const arrayValue = [...value]
    onChange(arrayValue)
  }, [onChange])

  return (
    <Select<Lecture | Examiner, true>
      options={options}
      components={components}
      placeholder="Type lecture or examiner name"
      onChange={change}
      isMulti
    />
  )
}

export default SearchField
