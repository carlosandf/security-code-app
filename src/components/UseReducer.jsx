import React, { useEffect, useReducer } from 'react';
import { Loading } from '@components/Loading';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onWrite = ({ target }) => {
    dispatch({ 
      type: actionTypes.write, 
      payload: target.value 
    })
  }
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

  useEffect(() => {
    console.log('Empezando el efecto');

    if (state.loading) {
      setTimeout(() => {
        console.log('haciendo la vaidacion');
  
        (state.value === SECURITY_CODE) ? onConfirm() : onError();
  
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
          onChange={onWrite}
        />
        <button onClick={onCheck}>
          Comprobar
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación. ¿Estás seguro?</p>
        <button onClick={onDelete}>
          Sí, eliminar
        </button>
        <button onClick={onReset} >
          No, me arrepentí
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button onClick={onReset}>
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

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET',
}

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: { 
    ...state,
    loading:false,
    error: false,
    confirmed: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
    value: '',
  },
  [actionTypes.write]: {
    ...state, 
    value: payload 
  },
  [actionTypes.check]: {
    ...state,
    loading: true
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
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