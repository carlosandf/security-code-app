import React, { useEffect, useReducer, useState } from 'react';
import { Loading } from '@components/Loading';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('Empezando el efecto');

    if (state.loading) {
      setTimeout(() => {
        console.log('haciendo la vaidacion');
  
        if (state.value === SECURITY_CODE) 
          dispatch({ type: 'CONFIRM' });
        else dispatch({ type: 'ERROR' });
  
        console.log('terminando la vaidacion');
      }, 1500);
    }
 
    console.log('Terminando el efecto');
  }, [state.loading]);

  console.log(state)
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
          onChange={(event) => dispatch({ 
            type: 'WRITE', 
            payload: event.target.value 
          })}
        />
        <button onClick={() => dispatch({ type: 'CHECK' })}>
          Comprobar
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación. ¿Estás seguro?</p>
        <button onClick={() => dispatch({ type: 'DELETE' })}>
          Sí, eliminar
        </button>
        <button onClick={() => dispatch({ type: 'RESET' })} >
          No, me arrepentí
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button onClick={() => dispatch({ type: 'RESET' })}>
          Resetear, volve atrás
        </button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const reducerObject = (state, payload) => ({
  'CONFIRM': { 
    ...state,
    loading:false,
    error: false,
    confirmed: true,
  },
  'EROR': {
    ...state,
    error: true,
    loading: false
  },
  'WRITE': {
    ...state, 
    value: payload 
  },
  'CHECK': {
    ...state,
    loading: true
  },
  'DELETE': {
    ...state,
    deleted: true,
  },
  'RESET': {
    ...state,
    confirmed: false,
    deleted: false,
    value: '',
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
}

export { UseReducer };






/* FORMAS DE UTILIZAR REDUCER */

// CON CONDICIONALES IF
// const reducerIf = () => {
//   if (action.type === 'ERROR') {
//     return {
//       ...state,
//       error: true,
//       loading: false
//     }
//   } else if (action.type === 'CHECK') {
//     return {
//       ...state,
//       loading: true
//     }
//   } else {
//     return {
//       ...state
//     }
//   }
// };

// // CON SWITCH
// const reducerSwitch = (state, action) => {
//   switch (action.type) {
//     case 'ERROR': 
//       return {
//         ...state,
//         error: true,
//         loading: false
//       }
//     case 'CHECK':
//       return {
//         ...state,
//         loading: true
//       }
//     default: 
//       return {
//         ...state
//       }
//   }
// };

// // CON REDUCER OBJECTS
// const reducerObject = (state) => ({
//   'EROR': {
//     ...state,
//     error: true,
//     loading: false
//   },
//   'CHECK': {
//     ...state,
//     loading: true
//   }
// });

// const reducer = (state, action) => {
//   if (reducerObject(state)[action.type]) {
//     return reducerObject(state)[action.type];
//   } else {
//     return state;
//   }
// }