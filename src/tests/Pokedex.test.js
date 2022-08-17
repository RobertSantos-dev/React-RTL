import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';

const IMAGEM_NAME = '../logo.svg';
const arr = [
  {
    id: 1,
    name: 'Robert Santos',
    image: IMAGEM_NAME,
    averageWeight: { value: '87', measurementUnit: 'kg' },
    type: 'Lindo e maravilhoso',
  },
  {
    id: 2,
    name: 'Roberta Aquino',
    image: IMAGEM_NAME,
    averageWeight: { value: '30', measurementUnit: 'kg' },
    type: 'Linda e maravilhosa',
  },
];

describe('Testes no componente Pokedex.js', () => {
  test('Teste para encontrar um h2', () => {
    const arr2 = [
      {
        id: 1,
        name: 'Robert Santos',
        image: IMAGEM_NAME,
        averageWeight: { value: '87', measurementUnit: 'kg' },
        type: 'Lindo e maravilhoso',
      },
    ];
    renderWithRouter(
      <Pokedex
        pokemons={ arr2 }
        isPokemonFavoriteById={ { [arr2[0].id]: true } }
      />,
    );
    const titulo = screen.getByRole('heading', { level: 2, name: /Encountered/i });
    expect(titulo).toBeInTheDocument();
  });

  test('Teste para encontrar validar os pokemons que aparecem na tela', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ arr }
        isPokemonFavoriteById={ { [arr[0].id]: true } }
      />,
    );

    const botao = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const val1 = `${arr[0].averageWeight.value} ${arr[0].averageWeight.measurementUnit}`;
    const frases1 = [
      `Average weight: ${val1}`,
      `${arr[0].name}`,
      `${arr[0].type}`,
    ];
    frases1.forEach((e) => {
      const texto = screen.getAllByText(e);
      expect(texto[0]).toBeInTheDocument();
    });
    expect(botao).toBeInTheDocument();

    userEvent.click(botao);

    const val2 = `${arr[1].averageWeight.value} ${arr[1].averageWeight.measurementUnit}`;
    const frases2 = [
      `Average weight: ${val2}`,
      `${arr[1].name}`,
      `${arr[1].type}`,
    ];
    frases2.forEach((e) => {
      const texto = screen.getAllByText(e);
      expect(texto[0]).toBeInTheDocument();
    });

    userEvent.click(botao);
    frases1.forEach((e) => {
      const texto = screen.getAllByText(e);
      expect(texto[0]).toBeInTheDocument();
    });
  });
});

describe('Testes no componente Pokedex agora nos botões de filtro', () => {
  test('Testando botões de filtro se são encontrados', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ arr }
        isPokemonFavoriteById={ { [arr[0].id]: true } }
      />,
    );

    const botoes = screen.getAllByTestId(/pokemon-type-button/i);
    expect(botoes).toHaveLength(2);
    arr.forEach((e, i) => {
      expect(botoes[i].innerHTML).toBe(e.type);
    });

    const val1 = `${arr[0].averageWeight.value} ${arr[0].averageWeight.measurementUnit}`;
    const frases1 = [
      `Average weight: ${val1}`,
      `${arr[0].name}`,
      `${arr[0].type}`,
    ];

    userEvent.click(botoes[0]);
    frases1.forEach((e) => {
      const texto = screen.getAllByText(e);
      expect(texto[0]).toBeInTheDocument();
    });
  });

  test('Testando botões All', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ arr }
        isPokemonFavoriteById={ { [arr[0].id]: true } }
      />,
    );

    const botaoReset = screen.getByRole('button', { name: /all/i });
    expect(botaoReset).toBeInTheDocument();
    userEvent.click(botaoReset);

    const val1 = `${arr[0].averageWeight.value} ${arr[0].averageWeight.measurementUnit}`;
    const frases1 = [
      `Average weight: ${val1}`,
      `${arr[0].name}`,
      `${arr[0].type}`,
    ];

    frases1.forEach((e) => {
      const texto = screen.getAllByText(e);
      expect(texto[0]).toBeInTheDocument();
    });
  });
});
