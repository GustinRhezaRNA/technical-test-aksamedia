import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.fullName.trim()) {
      setMessage('Full name is required')
      return
    }

    updateProfile({ fullName: formData.fullName.trim() })
    setIsEditing(false)
    setMessage('Profile updated successfully!')

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000)
  }

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || '',
      username: user?.username || ''
    })
    setIsEditing(false)
    setMessage('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 dark:bg-blue-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          <p className="text-blue-100 text-sm">Manage your personal information</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success/Error Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-md ${message.includes('successfully')
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
              }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Avatar Section */}
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">
                  {user?.fullName?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {user?.fullName || 'Admin User'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{user?.username || 'admin'}
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Username (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Username cannot be changed
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md transition-colors ${isEditing
                      ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile