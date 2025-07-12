const Product = require('../models/productModel');

// Productos de ejemplo para inicializar la base de datos
const sampleProducts = [
  {
    name: "OSMOS Sport Pro",
    flavor: "Lima Limón",
    description: "Electrolitos avanzados para deportistas profesionales",
    price: 14990,
    stock: 50,
    image: "/images/2FFAA248-B97B-48F8-93FF-95CBC7D4411D.png"
  },
  {
    name: "OSMOS Natural",
    flavor: "Fresa Silvestre",
    description: "Hidratación natural con ingredientes orgánicos",
    price: 9990,
    stock: 30,
    image: "/images/538B15D0-6894-4BC0-971D-829E2ABC69C4.png"
  },
  {
    name: "OSMOS Energy",
    flavor: "Naranja Mango",
    description: "Energía sostenible con vitaminas B y electrolitos",
    price: 17490,
    stock: 40,
    image: "/images/5E392DC5-2FD3-4519-9F1E-F505564C144A.png"
  }
];

const createProduct = async (req, res) => {
  try {
    const { name, flavor, description, price, stock, image } = req.body;
    const product = new Product({ name, flavor, description, price, stock, image });
    await product.save();
    res.status(201).json({ msg: 'Producto creado', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const readAllProducts = async (req, res) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 });
    
    // Si no hay productos, crear los de ejemplo
    if (products.length === 0) {
      await Product.insertMany(sampleProducts);
      products = await Product.find().sort({ createdAt: -1 });
    }
    
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const readOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json({ msg: 'Producto actualizado', updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json({ msg: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  readAllProducts,
  readOneProduct,
  updateProduct,
  deleteProduct
};