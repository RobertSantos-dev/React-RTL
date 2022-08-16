import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testes no componente App.js', () => {
  test('Teste para mostra uma menssagem de erro caso um array vazio for passado', () => {
    const arr = [];
    renderWithRouter(<FavoritePokemons pokemons={ arr } />);

    const mensagem = screen.getByText(/No favorite pokemon found/i);
    expect(mensagem).toBeInTheDocument();
  });

  test('Teste para mostra uma caso um array for passado', () => {
    const arr = [
      { averageWeight: { value: '87', measurementUnit: 'kg' },
        id: 1,
        image: '../logo.svg',
        name: 'Robert Santos',
        type: 'Lindo e maravilhoso',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ arr } />);

    const { value, measurementUnit } = arr[0].averageWeight;
    const frases = [
      `Average weight: ${value} ${measurementUnit}`,
      `${arr[0].name}`,
      `${arr[0].type}`,
    ];
    frases.forEach((e) => {
      const personagem = screen.getByText(e);
      expect(personagem).toBeInTheDocument();
    });
  });
});
