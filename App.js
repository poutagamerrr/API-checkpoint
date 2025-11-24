import { useState } from "react"
import AddUser from "./components/AddUser"
import ListOfUsers from "./components/ListOfUsers"
import "./App.css"

export default function Home() {
  const [users, setUsers] = useState([])

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: Date.now() }])
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="header-content">
          <h1 className="app-title">👥 User Management</h1>
          <p className="app-subtitle">Manage and organize your users efficiently</p>
        </div>
      </div>

      <div className="app-main">
        <div className="app-layout">
          <div className="add-user-section">
            <AddUser onAddUser={handleAddUser} />
          </div>
          <div className="users-section">
            <ListOfUsers users={users} setUsers={setUsers} />
          </div>
        </div>
      </div>
    </div>
  )
}
