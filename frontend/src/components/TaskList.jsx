import React, { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Pencil, Trash2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import EditTaskModal from "./EditTaskModal"

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editingTask, setEditingTask] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "todo":
        return "bg-gray-200 text-gray-800"
      case "in progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const handleEditClick = (task) => {
    setEditingTask(task)
    setIsEditModalOpen(true)
  }

  const handleStatusChange = (taskId, newStatus) => {
    onUpdateTask(taskId, { status: newStatus })
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task._id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(task)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-red-500 h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>This will permanently delete this task.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeleteTask(task._id)} className="bg-red-500 hover:bg-red-600">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
              <span className="text-xs text-gray-500">Created: {new Date(task.createdAt).toLocaleDateString()}</span>
              {task.completedAt && (
                <span className="text-xs text-gray-500">
                  Completed: {new Date(task.completedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{task.description}</p>
          </CardContent>
          <CardFooter className="flex gap-2 pt-2">
            {["todo", "in progress", "completed"].map((status) => (
              <Button
                key={status}
                variant="outline"
                size="sm"
                className={task.status === status ? getStatusColor(status) : ""}
                onClick={() => handleStatusChange(task._id, status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </CardFooter>
        </Card>
      ))}

      {editingTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={editingTask}
          onSubmit={(updatedData) => {
            onUpdateTask(editingTask._id, updatedData)
            setIsEditModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default TaskList
