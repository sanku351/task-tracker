import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Alert, AlertDescription } from "./ui/alert"
import { API_URL } from "../lib/constants"

function SignupForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", country: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Signup failed")

      // Auto-login after signup
      const loginRes = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
      const loginData = await loginRes.json()
      if (!loginRes.ok) throw new Error("Signup succeeded but login failed")

      localStorage.setItem("token", loginData.token)
      localStorage.setItem("user", JSON.stringify(loginData.user))
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Sign Up</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {["name","email","password","country"].map((field) => (
            <div key={field} className="space-y-2">
              <label htmlFor={field} className="text-sm font-medium capitalize">
                {field}
              </label>
              <Input
                id={field}
                name={field}
                type={field === "password" ? "password" : "text"}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                required
              />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default SignupForm
