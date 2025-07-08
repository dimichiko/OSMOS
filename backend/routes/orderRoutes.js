const express = require('express');
const Order = require('../models/Order');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// POST /api/orders - Crear una nueva orden
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, total, status, paymentId, shippingAddress } = req.body;
    const userId = req.user.id;

    // Validar datos requeridos
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items son requeridos y deben ser un array no vacío' });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Total debe ser un número mayor a 0' });
    }

    if (!paymentId) {
      return res.status(400).json({ error: 'PaymentId es requerido' });
    }

    // Crear la orden
    const order = new Order({
      user: userId,
      items: items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price
      })),
      total,
      paymentId,
      status: status || 'pending',
      shippingAddress
    });

    await order.save();

    // Populate los datos del producto para la respuesta
    await order.populate('items.product');

    res.status(201).json({
      success: true,
      message: 'Orden creada exitosamente',
      order
    });

  } catch (error) {
    console.error('Error creando orden:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/orders/:id - Obtener una orden específica
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Buscar la orden
    const order = await Order.findById(id).populate('items.product');

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    // Verificar que el usuario sea dueño de la orden
    if (order.user.toString() !== userId) {
      return res.status(403).json({ error: 'No tienes permisos para ver esta orden' });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Error obteniendo orden:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/orders - Obtener todas las órdenes del usuario
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .populate('items.product')
      .sort({ createdAt: -1 }); // Más recientes primero

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Error obteniendo órdenes:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;