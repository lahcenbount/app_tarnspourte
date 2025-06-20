// src/components/TripForm.jsx
import React, { useState } from 'react';

const TripForm = () => {
  const [formData, setFormData] = useState({
    departure: '',
    steps: '',
    destination: '',
    maxDimensions: '',
    cargoType: 'general',
    capacity: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données soumises :', formData);
    // 👉 Ici tu peux envoyer `formData` via axios à ton backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Publier un trajet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Lieu de départ</label>
            <input
              type="text"
              value={formData.departure}
              onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Étapes intermédiaires</label>
            <input
              type="text"
              value={formData.steps}
              onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
              placeholder="Ex : Rabat, Fès"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Destination finale</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Dimensions max (cm)</label>
            <input
              type="text"
              value={formData.maxDimensions}
              onChange={(e) => setFormData({ ...formData, maxDimensions: e.target.value })}
              placeholder="Ex : 120x80x60"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Type de marchandise</label>
            <select
              value={formData.cargoType}
              onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="general">Générale</option>
              <option value="fragile">Fragile</option>
              <option value="alimentaire">Alimentaire</option>
              <option value="dangereuse">Dangereuse</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Capacité disponible (kg)</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
        >
          Publier le trajet
        </button>
      </form>
    </div>
  );
};

export default TripForm;
