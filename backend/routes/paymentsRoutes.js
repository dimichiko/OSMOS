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
    const { items, total, customer } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío o inválido' });
    }

    if (!customer || !customer.name || !customer.email || !customer.address) {
      return res.status(400).json({ error: 'Información del cliente incompleta' });
    }

    // Preparar items para Mercado Pago
    const preference = {
      items: items.map(item => ({
        title: item.name,
        unit_price: Number(item.price),
        quantity: Number(item.quantity || 1),
        picture_url: item.image || undefined
      })),
      payer: {
        name: customer.name,
        email: customer.email
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/confirmacion?status=success`,
        failure: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/confirmacion?status=failure`,
        pending: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/confirmacion?status=pending`
      },
      expires: true,
      expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
      external_reference: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      statement_descriptor: "OSMOS Electrolitos",
      notification_url: `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/payments/webhook`,
      auto_return: "approved"
    };

    // Crear preferencia
    const preferenceClient = new Preference(client);
    const response = await preferenceClient.create({ body: preference });
    
    console.log('Preferencia creada:', response.id);
    
    res.json({
      success: true,
      init_point: response.init_point,
      preference_id: response.id,
      sandbox_init_point: response.sandbox_init_point
    });

  } catch (error) {
    console.error('Error creando preferencia de pago:', error);
    res.status(500).json({ 
      error: 'Error al procesar el pago',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Webhook para recibir notificaciones de MercadoPago
router.post('/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    console.log('Webhook recibido:', { type, data });
    
    if (type === 'payment') {
      const paymentId = data.id;
      
      // Aquí puedes procesar el pago
      // Por ejemplo, actualizar el estado de la orden en tu base de datos
      console.log(`Pago procesado: ${paymentId}`);
      
      // TODO: Implementar lógica para actualizar orden en base de datos
      // const order = await Order.findOneAndUpdate(
      //   { paymentId: paymentId },
      //   { status: 'paid' },
      //   { new: true }
      // );
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error en webhook:', error);
    res.status(500).json({ error: 'Error procesando webhook' });
  }
});

// Ruta para obtener información de un pago
router.get('/payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    // Aquí podrías consultar el estado del pago en MercadoPago
    // Por ahora retornamos información básica
    res.json({
      paymentId,
      status: 'approved', // Esto debería venir de MercadoPago
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error obteniendo información del pago:', error);
    res.status(500).json({ error: 'Error obteniendo información del pago' });
  }
});

module.exports = router; 