import React from 'react';
import { Loading } from '@components/Loading';

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: true,
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
  
        this.setState({ loading: false })
  
        console.log('terminando la vaidacion');
      }, 3000);
    }
  }

  render() {
    const { name } = this.props;
    const { error, loading } = this.state;
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
          onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}
export { ClassState };