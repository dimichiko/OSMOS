import Router from './Router.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import ElectrolitosState from './contexts/Electrolitos/ElectrolitosState'
import { AuthProvider } from './contexts/AuthContext.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ElectrolitosState>
          <Router />
        </ElectrolitosState>
      </CartProvider>
    </AuthProvider>
  )
}

export default App 