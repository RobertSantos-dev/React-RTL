import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../pages/About';
import renderRouter from '../services/renderRouter';

describe('Testes no componente About.js', () => {
  test('Teste se a pagina contem um h2', () => {
    renderRouter(<About />);

    const tituloAbout = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(tituloAbout).toBeInTheDocument();
  });

  test('Teste se a pagina contem 2 paragrafos', () => {
    renderRouter(<About />);
    const paragrafos = [
      screen.getByText(/This application simulates a Pokédex, a/i),
      screen.getByText(/One can filter Pokémons by type/i),
    ];

    paragrafos.forEach((paragrafo) => {
      expect(paragrafo).toBeInTheDocument();
    });
  });

  test('Teste se a pagina contem uma imagem especifica', () => {
    renderRouter(<About />);
    const imagemUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagemAbout = screen.getByRole('img');

    expect(imagemAbout).toBeInTheDocument();
    expect(imagemAbout).toHaveAttribute('src', imagemUrl);
  });
});
