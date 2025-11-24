import { useState } from "react"
import "./AddUser.css"

const AddUser = ({ onAddUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    job: "",
    country: "",
    age: "",
    description: "",
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!formData.job.trim()) {
      newErrors.job = "Job title is required"
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required"
    }
    if (!formData.age || formData.age < 18 || formData.age > 100) {
      newErrors.age = "Age must be between 18 and 100"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onAddUser(formData)

    setFormData({
      name: "",
      job: "",
      country: "",
      age: "",
      description: "",
    })

    setErrors({})
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="add-user-container">
      <div className="form-header">
        <h2 className="form-title">Add New User</h2>
        <p className="form-subtitle">Fill in the details below to add a new user</p>
      </div>

      {submitted && (
        <div className="success-message">
          <span>✓</span> User added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`form-input ${errors.name ? "input-error" : ""}`}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="job" className="form-label">
            Job Title *
          </label>
          <input
            type="text"
            id="job"
            name="job"
            value={formData.job}
            onChange={handleChange}
            placeholder="Software Engineer"
            className={`form-input ${errors.job ? "input-error" : ""}`}
          />
          {errors.job && <span className="error-text">{errors.job}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="country" className="form-label">
            Country *
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="United States"
            className={`form-input ${errors.country ? "input-error" : ""}`}
          />
          {errors.country && <span className="error-text">{errors.country}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age" className="form-label">
            Age *
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="30"
            className={`form-input ${errors.age ? "input-error" : ""}`}
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about this user..."
            rows="3"
            className={`form-input ${errors.description ? "input-error" : ""}`}
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Add User
        </button>
      </form>
    </div>
  )
}

export default AddUser