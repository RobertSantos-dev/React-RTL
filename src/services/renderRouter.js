import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderRouter = (componente) => {
  const historico = createMemoryHistory();
  return ({
    ...render(<Router history={historico}>{ componente }</Router>), historico,
})
}

export default renderRouter;
