const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

// CORS primero
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Middleware de seguridad
app.use(helmet());

// Rate limiting solo en producción
if (process.env.NODE_ENV !== 'development') {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por ventana
    message: 'Demasiadas requests desde esta IP'
  });
  app.use('/api/', limiter);
}

// Logging
app.use(morgan('combined'));

// Compresión
app.use(compression());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor' 
  });
});

// Rutas
app.use('/api', userRoutes);
app.use('/api/product', require('./routes/productRoutes')); //http://localhost:5050/api/product
app.use('/api/order', require('./routes/orderRoutes')); //http://localhost:5050/api/order
app.use('/api/payments', require('./routes/paymentsRoutes')); //http://localhost:5050/api/payments

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Conexión Mongo + levantar servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`)
    );
  })
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err);
    process.exit(1);
  });