import { useState, useEffect } from "react"
import axios from "axios"
import "./ListOfUsers.css"

const ListOfUsers = ({ users, setUsers }) => {
  const [apiUsers, setApiUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
        const enrichedUsers = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          job: user.company?.name || "Software Developer",
          country: user.address?.country || "USA",
          age: Math.floor(Math.random() * 40) + 20,
          description: user.company?.catchPhrase || "Professional user",
          email: user.email,
          phone: user.phone,
        }))
        setApiUsers(enrichedUsers)
        setError(null)
      } catch (err) {
        setError("Failed to fetch users. Please try again later.")
        console.error("Error fetching users:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const allUsers = [...apiUsers, ...users]

  const filteredUsers = allUsers.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const deleteUser = (id) => {
    setApiUsers(apiUsers.filter((user) => user.id !== id))
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h2 className="users-title">User Directory</h2>
        <p className="users-count">{filteredUsers.length} Users</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && filteredUsers.length === 0 && (
        <div className="empty-state">
          <p>📭 No users found</p>
        </div>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
              <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
                <p className="user-detail">
                  <span className="label">💼 Job:</span> {user.job}
                </p>
                <p className="user-detail">
                  <span className="label">🌍 Country:</span> {user.country}
                </p>
                <p className="user-detail">
                  <span className="label">🎂 Age:</span> {user.age} years
                </p>
                <p className="user-description">{user.description}</p>
              </div>
              <button onClick={() => deleteUser(user.id)} className="delete-btn" title="Delete user">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListOfUsers