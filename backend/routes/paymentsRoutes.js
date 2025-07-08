const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const router = express.Router();

// Configurar Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

// Ruta para crear preferencia de pago
router.post('/create-preference', async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío o inválido' });
    }

    // Preparar items para Mercado Pago
    const preference = {
      items: items.map(item => ({
        title: item.name,
        unit_price: Number(item.price),
        quantity: Number(item.quantity || 1)
      })),
      back_urls: {
        success: "http://localhost:5174/confirmacion?status=success",
        failure: "http://localhost:5174/confirmacion?status=failure",
        pending: "http://localhost:5174/confirmacion?status=pending"
      },
      expires: true,
      expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
      external_reference: `order_${Date.now()}`,
      statement_descriptor: "OSMOS Electrolitos"
    };

    // Crear preferencia
    const preferenceClient = new Preference(client);
    const response = await preferenceClient.create({ body: preference });
    
    res.json({
      success: true,
      init_point: response.init_point,
      preference_id: response.id
    });

  } catch (error) {
    console.error('Error creando preferencia de pago:', error);
    res.status(500).json({ 
      error: 'Error al procesar el pago',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 