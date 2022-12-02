
export const refactorNameDataDisciplines= (name:string) =>{
  if (name === "Дифференцированный зачет")
    return "Дифф.зачет"
  if (name === "Курсовая работа")
    return "Курсовая"
  return name
}
