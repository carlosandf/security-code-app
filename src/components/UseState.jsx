import React, { useEffect, useState } from 'react';
import { Loading } from '@components/Loading';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(value);

  useEffect(() => {
    console.log('Empezando el efecto');

    if (loading) {
      //setError(false);
      setTimeout(() => {
        console.log('haciendo la vaidacion');
  
        if (value !== SECURITY_CODE) {
          setError(true);
        }
        setLoading(false);
  
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

      <input
        placeholder='Codigo de seguridad'
        value={value}
        onChange={(event) => {
          setError(false);
          setValue(event.target.value)
        }}
      />
      <button
        onClick={() => setLoading(true)}
      >Comprobar</button>
    </div>
  );
}
export { UseState };