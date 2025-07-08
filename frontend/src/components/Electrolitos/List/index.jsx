import { useEffect, useContext } from "react";
import ElectrolitosContext from "../../../contexts/Electrolitos/ElectrolitosContext";

const ElectrolitosList = () => {
  const { Electrolitos, getProducts } = useContext(ElectrolitosContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {Electrolitos.map((electrolito) => (
        <div key={electrolito._id} className="card">
          <h3>{electrolito.name}</h3>
          <p><strong>Flavor:</strong> {electrolito.flavor}</p>
          <p><strong>Price:</strong> ${electrolito.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ElectrolitosList;