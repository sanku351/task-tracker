import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CreateProjectModal from "@/components/CreateProjectModal";
import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";

import ProjectList from "@/components/ProjectList";
import { API_URL } from "@/lib/constants";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create project");
      }

      fetchProjects();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            disabled={projects.length >= 4}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading projects...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h2 className="text-xl font-medium text-gray-700 mb-2">No projects yet</h2>
            <p className="text-gray-500 mb-6">Create your first project to get started</p>
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Project
            </Button>
          </div>
        ) : (
          <ProjectList projects={projects} onRefresh={fetchProjects} />
        )}

        {projects.length >= 4 && (
          <div className="mt-4 text-amber-600 text-sm">
            You've reached the maximum limit of 4 projects.
          </div>
        )}

        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateProject}
        />
      </main>
    </div>
  );
};

export default Dashboard;
