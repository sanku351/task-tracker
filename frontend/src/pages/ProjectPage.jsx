import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import TaskList from "../components/TaskList"
import CreateTaskModal from "../components/CreateTaskModal"
import { Button } from "../components/ui/Button"
import { PlusCircle, ArrowLeft } from "lucide-react"
import { API_URL } from "../lib/constants"

export default function ProjectPage() {
  const { id: projectId } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
      return
    }

    fetchProjectAndTasks()
  }, [projectId])

  const fetchProjectAndTasks = async () => {
    try {
      const token = localStorage.getItem("token")

      const projectResponse = await fetch(`${API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!projectResponse.ok) {
        throw new Error("Failed to fetch project")
      }

      const projectData = await projectResponse.json()
      setProject(projectData)

      const tasksResponse = await fetch(`${API_URL}/api/projects/${projectId}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!tasksResponse.ok) {
        throw new Error("Failed to fetch tasks")
      }

      const tasksData = await tasksResponse.json()
      setTasks(tasksData)
    } catch (err) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/projects/${projectId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to create task")
      }

      fetchProjectAndTasks()
      setIsModalOpen(false)
    } catch (err) {
      setError(err.message || "An error occurred")
    }
  }

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        throw new Error("Failed to update task")
      }

      fetchProjectAndTasks()
    } catch (err) {
      console.error("Error updating task:", err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete task")
      }

      fetchProjectAndTasks()
    } catch (err) {
      console.error("Error deleting task:", err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-8">Loading project...</div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-8 text-red-500">{error}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-4 flex items-center gap-2" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{project?.name}</h1>
            {project?.description && <p className="text-gray-600 mt-1">{project.description}</p>}
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            New Task
          </Button>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h2 className="text-xl font-medium text-gray-700 mb-2">No tasks yet</h2>
            <p className="text-gray-500 mb-6">Create your first task to get started</p>
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Task
            </Button>
          </div>
        ) : (
          <TaskList tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
        )}

        <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateTask} />
      </main>
    </div>
  )
}
