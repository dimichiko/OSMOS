# 🥤 OSMOS - Tienda de Electrolitos

Una aplicación fullstack de comercio electrónico para la venta de electrolitos, desarrollada con React, Node.js, Express y MongoDB.

## 🚀 Demo

- **Frontend:** [https://osmos-store.netlify.app](https://osmos-store.netlify.app)
- **Backend API:** [https://osmos-api.railway.app](https://osmos-api.railway.app)

## ✨ Características

### 🛍️ E-commerce
- Catálogo de productos con filtros
- Carrito de compras persistente
- Pasarela de pagos con MercadoPago
- Gestión de pedidos en tiempo real

### 🔐 Autenticación
- Registro e inicio de sesión
- JWT para autenticación segura
- Perfil de usuario personalizable
- Protección de rutas privadas

### 📱 Responsive Design
- Diseño mobile-first
- Interfaz moderna y intuitiva
- Animaciones suaves
- Menú hamburguesa optimizado

## 🛠️ Tecnologías

### Frontend
- **React 18** con Vite
- **React Router** para navegación
- **Context API** para estado global
- **Tailwind CSS** para estilos
- **Axios** para API calls

### Backend
- **Node.js** con Express
- **MongoDB** con Mongoose
- **JWT** para autenticación
- **bcryptjs** para encriptación
- **MercadoPago** para pagos

## 📦 Instalación Local

### Prerrequisitos
- Node.js >= 14
- MongoDB
- Cuenta de MercadoPago (para pagos)

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurar variables de entorno en .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Configurar VITE_API_URL en .env
npm run dev
```

## 🌐 Deploy

### Backend (Railway/Heroku)

1. **Crear cuenta en Railway**
2. **Conectar repositorio**
3. **Configurar variables de entorno:**
   ```
   MONGODB_URI=tu_mongodb_atlas_uri
   JWT_SECRET=tu_jwt_secret
   MERCADOPAGO_ACCESS_TOKEN=tu_mercadopago_token
   ```

4. **Deploy automático**

### Frontend (Netlify/Vercel)

1. **Crear cuenta en Netlify**
2. **Conectar repositorio**
3. **Configurar variables de entorno:**
   ```
   VITE_API_URL=https://tu-backend-url.railway.app
   ```

4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🔧 Variables de Entorno

### Backend (.env)
```env
PORT=5050
MONGODB_URI=mongodb://localhost:27017/osmos
JWT_SECRET=tu_jwt_secret_super_seguro
MERCADOPAGO_ACCESS_TOKEN=tu_mercadopago_access_token
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5050
VITE_MERCADOPAGO_PUBLIC_KEY=tu_mercadopago_public_key
```

## 🧪 Testing MercadoPago

Para probar los pagos, usa estas tarjetas de prueba:

- **Visa:** 4509 9535 6623 3704
- **Mastercard:** 5031 4332 1540 6351
- **American Express:** 3711 8030 3257 522

**CVV:** Cualquier número de 3 dígitos
**Fecha:** Cualquier fecha futura

## 📁 Estructura del Proyecto

```
OSMOS/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── config/
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md
```

## 🚀 Funcionalidades Implementadas

### ✅ Completadas
- [x] Catálogo de productos
- [x] Carrito de compras
- [x] Autenticación JWT
- [x] Pasarela de pagos
- [x] Perfil de usuario
- [x] Diseño responsive
- [x] Deploy en producción

### 🔄 En Desarrollo
- [ ] Sistema de reviews
- [ ] Wishlist
- [ ] Notificaciones push
- [ ] PWA

## 👨‍💻 Autor

**Dimitris vamvoukas** - Desarrollador Fullstack

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

⭐ **¡Gracias por usar OSMOS!** ⭐ 
