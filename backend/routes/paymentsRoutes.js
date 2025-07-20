const express = require('express');
const router = express.Router();

console.log('📁 Archivo de rutas de pagos cargado');

// Configuración de MercadoPago
let mercadopago;
let isMercadoPagoAvailable = false;

try {
  mercadopago = require('mercadopago');
  
  // Configurar MercadoPago con token de acceso
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  
  if (accessToken) {
    mercadopago.configure({
      access_token: accessToken
    });
    isMercadoPagoAvailable = true;
    console.log('✅ MercadoPago configurado correctamente');
  } else {
    console.log('⚠️ Token de MercadoPago no encontrado, usando modo simulado');
  }
} catch (error) {
  console.log('⚠️ MercadoPago no disponible, usando modo simulado');
}

// Ruta de prueba
router.get('/test', (req, res) => {
  console.log('✅ Ruta /test accedida');
  res.json({ 
    message: 'Rutas de pagos funcionando correctamente',
    mercadopago_available: isMercadoPagoAvailable,
    timestamp: new Date().toISOString()
  });
});

// Ruta para crear preferencia de pago
router.post('/create-preference', async (req, res) => {
  console.log('✅ Ruta /create-preference accedida');
  
  try {
    const { items, total, customer } = req.body;

    console.log('Datos recibidos:', { 
      items_count: items?.length, 
      total, 
      customer_name: customer?.name 
    });

    // Validaciones
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío o inválido' });
    }

    if (!customer || !customer.name || !customer.email || !customer.address) {
      return res.status(400).json({ 
        error: 'Información del cliente incompleta',
        required: ['name', 'email', 'address'],
        received: customer ? Object.keys(customer) : 'none'
      });
    }

    // Si MercadoPago está disponible, usar integración real
    if (isMercadoPagoAvailable && mercadopago) {
      try {
        console.log('🔄 Creando preferencia real con MercadoPago...');
        
        // Preparar items para MercadoPago
        const preferenceItems = items.map(item => ({
          title: item.name,
          unit_price: parseFloat(item.price),
          quantity: parseInt(item.quantity || 1),
          currency_id: 'CLP'
        }));

        // Crear preferencia
        const preference = {
          items: preferenceItems,
          payer: {
            name: customer.name,
            email: customer.email
          },
          back_urls: {
            success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/confirmacion?status=success`,
            failure: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/confirmacion?status=failure`,
            pending: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/confirmacion?status=pending`
          },
          auto_return: 'approved',
          external_reference: `order_${Date.now()}`,
          notification_url: `${process.env.BACKEND_URL || 'http://localhost:5050'}/api/payments/webhook`
        };

        const response = await mercadopago.preferences.create(preference);
        
        console.log('✅ Preferencia creada exitosamente:', response.body.id);
        
        return res.json({
          success: true,
          preference_id: response.body.id,
          init_point: response.body.init_point,
          sandbox_init_point: response.body.sandbox_init_point,
          mercadopago_mode: 'real'
        });

      } catch (mpError) {
        console.error('❌ Error con MercadoPago:', mpError);
        // Fallback a modo simulado
        console.log('🔄 Fallback a modo simulado...');
      }
    }

    // Modo simulado (fallback)
    console.log('🎭 Usando modo simulado para preferencia de pago');
    
    const mockPreferenceId = `SIM_${Date.now()}`;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    
    const mockResponse = {
      success: true,
      preference_id: mockPreferenceId,
      init_point: `${frontendUrl}/confirmacion?status=success&payment_id=SIM_${Date.now()}&preference_id=${mockPreferenceId}`,
      sandbox_init_point: `${frontendUrl}/confirmacion?status=success&payment_id=SIM_${Date.now()}&preference_id=${mockPreferenceId}`,
      mercadopago_mode: 'simulated'
    };

    console.log('✅ Respuesta simulada generada:', mockResponse);
    return res.json(mockResponse);

  } catch (error) {
    console.error('❌ Error creando preferencia de pago:', error);
    res.status(500).json({ 
      error: 'Error al procesar el pago',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Webhook para MercadoPago
router.post('/webhook', async (req, res) => {
  console.log('📥 Webhook recibido:', req.body);
  
  try {
    const { type, data } = req.body;
    
    if (type === 'payment') {
      const paymentId = data.id;
      console.log(`💰 Pago procesado: ${paymentId}`);
      
      // Aquí procesarías el pago en tu base de datos
      // Por ahora solo log
      
      return res.status(200).json({ 
        message: 'Webhook procesado correctamente',
        payment_id: paymentId 
      });
    }
    
    res.status(200).json({ message: 'Webhook recibido' });
    
  } catch (error) {
    console.error('❌ Error en webhook:', error);
    res.status(500).json({ error: 'Error procesando webhook' });
  }
});

// Ruta para verificar estado de pago
router.get('/payment-status/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  
  try {
    if (isMercadoPagoAvailable && mercadopago) {
      const payment = await mercadopago.payment.get(paymentId);
      return res.json({
        payment_id: paymentId,
        status: payment.body.status,
        status_detail: payment.body.status_detail
      });
    } else {
      // Modo simulado
      return res.json({
        payment_id: paymentId,
        status: 'approved',
        status_detail: 'accredited',
        mode: 'simulated'
      });
    }
  } catch (error) {
    console.error('❌ Error verificando pago:', error);
    res.status(500).json({ error: 'Error verificando estado del pago' });
  }
});

// Ruta raíz
router.get('/', (req, res) => {
  console.log('✅ Ruta raíz de pagos accedida');
  res.json({ 
    message: 'Router de pagos funcionando',
    routes: ['/test', '/create-preference', '/webhook', '/payment-status/:id'],
    mercadopago_available: isMercadoPagoAvailable,
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 