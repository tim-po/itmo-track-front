export type Profession = {
  svg: string
  description: string
  id: string
  category: string
  related_keywords: KeywordType[]
  visible_keywords: KeywordType[]
  name: string
}

export type KeywordType = { text: string, id: string }

export type PresetType = {
  id: string
  category: string
  tag: string
  title: string
  keywords: KeywordType[]
}

export type TrajectoryType = {
  id: string
  code: string
  educational_plan: string
  coverage: number
  student: number
  courses: CourseType[]
  abit?: string
}

export type CourseType = {
  course: number
  coverage: number
  main_keywords: string[]
  control_type_count: CountType[]
  control_types_count: CountType[]
  classes_count: (CountType & { disciplines: CountType[] })[]
  necessity_count: CountType[]
  classes: ClassType[]
}

export type ClassType = {
  name: string
  first_semesters_disciplines: DisciplineType[]
  second_semesters_disciplines: DisciplineType[]
}

export type DisciplineType = {
  id: number,
  name: string,
  class: string,
  control_type: string,
  necessity: string,
  next_disciplines: number[]
}

export type CountType = {
  count: number
  name: string
}

export type DiplomaDataType = {
  total_disciplines: number
  main_keywords: string[]
  id: number
  educational_plan: string
  classes_count: (CountType & { disciplines: CountType[] })[]
  control_types_count: (CountType & { disciplines: CountType[] })[]
}

type DisciplineClassItemType = {
  disciplines_count: number
  name: string
  disciplines: {name: string, control_types: { [key: string]: CountType[] }}[]
}

export type DiplomaShareCardType = {
  course: number
  disciplines_count: number
  classes: DisciplineClassItemType
}

export type DiplomaShareDataType = {
  educational_plan: string
  id: number
  main_keywords: string[]
  courses: DiplomaShareCardType[]
  total_disciplines: number
}

export type NextOrPrevDisciplinesType = {
  id: number
  name: string
  semester: number
}

export type TrajectoryDisciplineType = {
  class: string
  semester: number
  control: string
  id: number
  keywords: string[]
  keywords_aligned_with_user: string[]
  keywords_coverage: number
  name: string
  necessity: boolean
  next_disciplines: NextOrPrevDisciplinesType[]
  prev_disciplines: NextOrPrevDisciplinesType[]
  replacement_options: NextOrPrevDisciplinesType[]
}