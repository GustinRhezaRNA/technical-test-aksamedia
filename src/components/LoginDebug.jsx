import { useAuth } from '../contexts/AuthContext'

const LoginDebug = () => {
    const { user, isAuthenticated, loading } = useAuth()

    return (
        <div className="fixed top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded text-xs z-50">
            <h3>Debug Info:</h3>
            <p>Loading: {loading ? 'true' : 'false'}</p>
            <p>Authenticated: {isAuthenticated ? 'true' : 'false'}</p>
            <p>User: {user ? user.username : 'null'}</p>
            <p>Current Path: {window.location.pathname}</p>
        </div>
    )
}

export default LoginDebug
