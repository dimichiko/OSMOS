const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración para deploy
const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/osmos';

// Conexión a MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas
console.log('Cargando rutas...');
app.use('/api', userRoutes);
console.log('✅ Rutas de usuarios cargadas');
app.use('/api', productRoutes);
console.log('✅ Rutas de productos cargadas');
app.use('/api', orderRoutes);
console.log('✅ Rutas de órdenes cargadas');
app.use('/api', paymentsRoutes);
console.log('✅ Rutas de pagos cargadas');

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 OSMOS API funcionando correctamente',
    version: '1.0.0',
    status: 'online'
  });
});

// Rutas de pagos directas (solución temporal)
app.get('/api/payments/test', (req, res) => {
  console.log('✅ Ruta /api/payments/test accedida');
  res.json({ 
    message: 'Rutas de pagos funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/payments/create-preference', async (req, res) => {
  console.log('✅ Ruta /api/payments/create-preference accedida');
  
  try {
    const { items, total, customer } = req.body;
    console.log('Datos recibidos:', { items, total, customer });

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío o inválido' });
    }

    // Validar datos del cliente (aceptar tanto inglés como español)
    const customerName = customer.name || customer.nombre;
    const customerEmail = customer.email;
    const customerAddress = customer.address || customer.direccion;
    
    if (!customerName || !customerEmail || !customerAddress) {
      return res.status(400).json({ 
        error: 'Información del cliente incompleta',
        required: ['name/nombre', 'email', 'address/direccion'],
        received: { name: customerName, email: customerEmail, address: customerAddress }
      });
    }

    console.log('Modo de prueba: Simulando preferencia de pago');
    
    // Simular respuesta de MercadoPago
    const mockResponse = {
      success: true,
      init_point: 'http://localhost:5173/confirmacion?status=success&payment_id=TEST123&preference_id=TEST456',
      preference_id: 'TEST456',
      sandbox_init_point: 'http://localhost:5173/confirmacion?status=success&payment_id=TEST123&preference_id=TEST456'
    };

    console.log('Respuesta simulada:', mockResponse);
    return res.json(mockResponse);

  } catch (error) {
    console.error('Error creando preferencia de pago:', error);
    res.status(500).json({ 
      error: 'Error al procesar el pago',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: '❌ Error interno del servidor',
    message: err.message 
  });
});

// Ruta para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: '❌ Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe` 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
});