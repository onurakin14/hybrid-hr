"use client"

import { Provider } from "react-redux"
import { makeStore } from "@/lib/store"
import Board from "@/components/tasks/board"
import TasksHeader from "@/components/tasks/tasks-header"

export default function Page() {
  return (
    <Provider store={makeStore()}>
      <Board />
      <TasksHeader />
    </Provider>
  )
}
