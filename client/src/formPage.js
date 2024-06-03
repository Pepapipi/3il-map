import React, { useState } from 'react';
import Axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const FormPage = () => {
  const [formData, setFormData] = useState({
    alias: '',
    position_x: '',
    position_y: '',
    nom: '',
    description: '',
    is_accessible: false,
    indice_cout_vie: '',
    comparaison: '',
    distance: '',
    passeport: false,
    langue: '',
    timezone: '',
    automne_semestre: '',
    lien_ecole: '',
  });

  const { id } = useParams(); 
  
  console.log(id); // Assuming you are using React Router to handle the URL parameters
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await Axios.get(`http://localhost:3001/pings/${id}`);
          const data = response.data[0];
          data.position_x = data.position['x'];
          data.position_y = data.position['y'];
          setFormData(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);
  console.log(formData);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {  
    var url = id ? `http://localhost:3001/pings/update/${id}` : "http://localhost:3001/pings/create";
    Axios.post(url, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    e.preventDefault();
    // Your form submission logic goes here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ping Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['alias', 'position_x','position_y', 'nom', 'description', 'indice_cout_vie', 'comparaison', 'distance', 'langue', 'timezone', 'automne_semestre', 'lien_ecole'].map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="mb-2 capitalize">{field.replace('_', ' ')}:</label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        ))}
        <div className="flex items-center">
          <label htmlFor="is_accessible" className="mr-2">Est accessible avec un contrat en veille:</label>
          <input
            type="checkbox"
            id="is_accessible"
            name="is_accessible"
            checked={formData.is_accessible}
            onChange={handleChange}
            className="h-5 w-5"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="passeport" className="mr-2">Passeport Requis:</label>
          <input
            type="checkbox"
            id="passeport"
            name="passeport"
            checked={formData.passeport}
            onChange={handleChange}
            className="h-5 w-5"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
