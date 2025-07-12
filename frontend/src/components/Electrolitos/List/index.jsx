import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ElectrolitosContext from "../../../contexts/Electrolitos/ElectrolitosContext";

const ElectrolitosList = () => {
  const { Electrolitos, getProducts } = useContext(ElectrolitosContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Electrolitos.map((electrolito) => (
        <div key={electrolito._id} className="card bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <img src={electrolito.image} alt={electrolito.name} className="w-20 h-20 mb-4" />
          <h3 className="font-bold text-lg text-blue-900 mb-2">{electrolito.name}</h3>
          <p className="text-gray-600 mb-2">{electrolito.flavor}</p>
          <div className="font-black text-2xl text-indigo-600 mb-4">${electrolito.price}</div>
          <Link 
            to={`/producto/${electrolito.slug}`} 
            className="bg-white text-blue-700 font-bold px-4 py-2 rounded-full border-2 border-blue-700 hover:bg-blue-50 transition w-full text-center"
          >
            👁️ Ver
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ElectrolitosList;