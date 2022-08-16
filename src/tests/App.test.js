import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderRouter from '../services/renderRouter';

describe('Testes no componente App.js', () => {
  test('Teste para encontrar o link escrito Home', () => {
    renderRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite/i });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
    userEvent.click(linkHome);

    const tituloPokemons = screen.getByRole('heading', {
      level: 2, name: /Encountered/i,
    });
    expect(tituloPokemons).toBeInTheDocument();
  });
});
