import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      loading ? (
        <div>
          <h1>Carregando...</h1>
        </div>) : (
        ''
      )
    );
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};
export default Loading;
