import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testes no componente NotFound.js', () => {
  test('Teste para encontrar um h2', () => {
    renderWithRouter(<NotFound />);

    const titulo = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(titulo).toBeInTheDocument();
  });

  test('Teste se é mostrado uma imagem ao rederizar o componente', () => {
    renderWithRouter(<NotFound />);

    const titulo = screen.getAllByRole('img', { alt: /requested was not found/i });
    const imagemUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(titulo[1]).toBeInTheDocument();
    expect(titulo[1]).toHaveAttribute('src', imagemUrl);
  });
});
