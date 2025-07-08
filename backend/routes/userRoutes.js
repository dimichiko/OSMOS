const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/verifytoken', verifyToken);

// Endpoint de contacto
router.post('/contacto', (req, res) => {
  const { nombre, email, telefono, asunto, mensaje } = req.body;
  const errors = {};
  if (!nombre) errors.nombre = 'El nombre es obligatorio';
  if (!email) errors.email = 'El email es obligatorio';
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Email inválido';
  if (!asunto) errors.asunto = 'Selecciona un asunto';
  if (!mensaje) errors.mensaje = 'El mensaje es obligatorio';
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }
  // Aquí podrías guardar en DB o enviar email
  return res.json({ ok: true, message: 'Mensaje recibido. Te contactaremos pronto.' });
});

module.exports = router;