import React, { useEffect, useState } from 'react';
import { Loading } from '@components/Loading';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({ 
      ...state,
      loading:false,
      error: false,
      confirmed: true,
    });
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
      value: ''
    });
  }

  const onWrite = (newValue) => {
    setState({ ...state, value: newValue });
  }

  const onCheck = () => {
    setState({ ...state, loading: true });
  }

  const onDelete = () => {
    setState({ ...state, deleted: true, });
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    })
  }

  useEffect(() => {
    console.log('Empezando el efecto');

    if (state.loading) {
      setTimeout(() => {
        console.log('haciendo la vaidacion');
  
        if (state.value === SECURITY_CODE) 
          onConfirm();
        else onError();
  
        console.log('terminando la vaidacion');
      }, 1500);
    }
 
    console.log('Terminando el efecto');
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escriba el código de seguridad.</p>
        {(state.error && !state.loading) && (
          <p>Error: El código es incorrecto</p>
        )}
        {state.loading && (
          <Loading />
        )}
        <input
          placeholder='Codigo de seguridad'
          value={state.value}
          onChange={(event) => onWrite(event.target.value)}
        />
        <button onClick={() => onCheck()}>
          Comprobar
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación. ¿Estás seguro?</p>
        <button onClick={() => onDelete()}>
          Sí, eliminar
        </button>
        <button onClick={() => onReset()} >
          No, me arrepentí
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button onClick={() => onReset()}>
          Resetear, volve atrás
        </button>
      </React.Fragment>
    );
  }
}
export { UseState };