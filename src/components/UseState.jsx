import React, { useEffect, useState } from 'react';
import { Loading } from '@components/Loading';

function UseState({ name }) {
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Empezando el efecto');

    if (loading) {
      setTimeout(() => {
        console.log('haciendo la vaidacion');
  
        setLoading(false)
  
        console.log('terminando la vaidacion');
      }, 3000);
    }
 
    console.log('Terminando el efecto');
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escriba el código de seguridad.</p>

      {error && (
        <p>Error: El código es incorrecto</p>
      )}
      {loading && (
        <Loading />
      )}

      <input placeholder='Codigo de seguridad'/>
      <button
        onClick={() => setLoading(true)}
      >Comprobar</button>
    </div>
  );
}
export { UseState };