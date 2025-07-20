import Router from './Router.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </AuthProvider>
  )
}

export default App 