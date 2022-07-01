import React from 'react';
import { Loading } from '@components/Loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: false,
      loading: false,
    };
  }
  
  
  // componentWillMount
  // UNSAFE_componentWillMount() {
  //   console.log('UNSAFE_componentWillMount');
  // }

  // componentDidMount() {
  //   console.log('componentDidMount');
  // }

  componentDidUpdate() {
    console.log('Actualizacion');

    if (this.state.loading) {
      setTimeout(() => {
        console.log('haciendo la vaidacion');
  
        if (SECURITY_CODE === this.state.value) {
          this.setState({ error: false, loading: false });
        } else {
          this.setState({ error: true, loading: false })
        }
  
        console.log('terminando la vaidacion');
      }, 3000);
    }
  }

  render() {
    const { name } = this.props;
    const {value, error, loading } = this.state;
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escriba el código de seguridad.</p>

        {(error && !loading) && (
          <p>Error: El código es incorrecto</p>
        )}
        {loading && (
          <Loading />
        )}

        <input 
          placeholder='Codigo de seguridad'
          value={value}
          onChange={(event) => {
            this.setState({ value: event.target.value })
          }}
        />
        <button
          onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}
export { ClassState };