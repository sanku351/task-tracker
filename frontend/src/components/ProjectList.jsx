import React from "react"
import { useNavigate } from "react-router-dom"
import { Trash2 } from "lucide-react"

// Replace these imports with your own components or use basic HTML if needed
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
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

const API_URL = "http://localhost:5000" // Replace with your actual API URL

function ProjectList({ projects, onRefresh }) {
  const navigate = useNavigate()

  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`)
  }

  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      onRefresh()
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Card key={project._id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex justify-between items-start">
              <span className="truncate">{project.name}</span>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-red-500 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the project and all its tasks. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteProject(project._id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardTitle>
            <CardDescription>{new Date(project.createdAt).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 line-clamp-2">
              {project.description || "No description provided"}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleViewProject(project._id)}>
              View Tasks
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default ProjectList
