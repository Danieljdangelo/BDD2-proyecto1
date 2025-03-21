import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    fechaNacimiento: '',
    marcaInteres: '',
    modeloInteres: '',
    comentario: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Datos simulados para las marcas y modelos. En una aplicación real estos datos vendrían de la base de datos.
  const brands = ["Toyota", "Honda", "Ford", "BMW", "Audi"];
  const brandModels: { [key: string]: string[] } = {
    Toyota: ["Corolla", "Camry", "Yaris"],
    Honda: ["Civic", "Accord", "Fit"],
    Ford: ["Fiesta", "Focus", "Mustang"],
    BMW: ["3 Series", "5 Series", "X5"],
    Audi: ["A3", "A4", "A6"]
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Si se cambia la marca, reiniciamos el modelo seleccionado.
    if (name === "marcaInteres") {
      setFormData(prev => ({ ...prev, [name]: value, modeloInteres: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se enviaría la información a la API
    setSubmitted(true);

    // Mostrar notificación en el navegador
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("¡Gracias por confiar en nosotros! Te contactaremos en breve.");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("¡Gracias por confiar en nosotros! Te contactaremos en breve.");
          }
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <h2 className="text-3xl font-bold mb-4">Contáctanos</h2>
      {submitted ? (
        <div className="bg-green-100 p-6 rounded-lg text-green-800 text-lg">
          ¡Gracias por confiar en nosotros! Te contactaremos en breve.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1" htmlFor="nombre">Nombre</label>
              <input 
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="apellido">Apellido</label>
              <input 
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="cedula">Cédula</label>
              <input 
                type="text"
                id="cedula"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="fechaNacimiento">Fecha de nacimiento</label>
              <input 
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="marcaInteres">
                Marca del carro en el que estás interesado
              </label>
              <select
                id="marcaInteres"
                name="marcaInteres"
                value={formData.marcaInteres}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Selecciona una marca</option>
                {brands.map((brand, idx) => (
                  <option key={idx} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="modeloInteres">
                Modelo del carro en el que estás interesado
              </label>
              <select
                id="modeloInteres"
                name="modeloInteres"
                value={formData.modeloInteres}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
                disabled={!formData.marcaInteres}
              >
                <option value="">Selecciona un modelo</option>
                {formData.marcaInteres &&
                  brandModels[formData.marcaInteres]?.map((model, idx) => (
                    <option key={idx} value={model}>{model}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="comentario">Comentario o nota</label>
            <textarea 
              id="comentario"
              name="comentario"
              value={formData.comentario}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={4}
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
