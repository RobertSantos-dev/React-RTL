import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

describe('Testes no componente Pokemon.js', () => {
  const NOME_IMAGEM = '../logo.svg';
  const arr = [
    {
      id: 1,
      name: 'Robert Santos',
      image: NOME_IMAGEM,
      averageWeight: { value: '87', measurementUnit: 'kg' },
      type: 'Lindo e maravilhoso',
    },
  ];

  test('Teste se é mostrado um pokemon com todas as caracteristicas passadas', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ arr[0] }
        showDetailsLink
        isFavorite={ false }
      />,
    );

    const val1 = `${arr[0].averageWeight.value} ${arr[0].averageWeight.measurementUnit}`;
    const personagem = [
      `Average weight: ${val1}`,
      `${arr[0].name}`,
      `${arr[0].type}`,
    ];
    personagem.forEach((e) => {
      const texto = screen.getAllByText(e);
      expect(texto[0]).toBeInTheDocument();
    });

    const imagemPokemon = screen.getByRole('img', { name: `${arr[0].name} sprite` });
    expect(imagemPokemon).toBeInTheDocument();
    expect(imagemPokemon).toHaveAttribute('src', NOME_IMAGEM);
  });

  test('Teste se é mostrado um link com uma determinada url', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ arr[0] }
        showDetailsLink
        isFavorite={ false }
      />,
    );

    const linkDetalhes = screen.getByRole('link');
    expect(linkDetalhes).toBeInTheDocument();
    expect(linkDetalhes).toHaveAttribute('href', `/pokemons/${arr[0].id}`);
  });

  test('Teste se na url é mostradoum valor como "/pokemon/:id" ', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ arr[0] }
        showDetailsLink
        isFavorite={ false }
      />,
    );

    const linkDetalhes = screen.getByRole('link');
    expect(linkDetalhes).toBeInTheDocument();

    userEvent.click(linkDetalhes);
    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${arr[0].id}`);
  });

  test('Teste se é mostrado um icone de estrela ao favoritar um pokemon ', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ arr[0] }
        showDetailsLink
        isFavorite
      />,
    );

    const favorito = `${arr[0].name} is marked as favorite`;
    const imagemFavorito = screen.getByRole('img', { name: favorito });
    expect(imagemFavorito).toBeInTheDocument();
    expect(imagemFavorito).toHaveAttribute('src', '/star-icon.svg');
  });
});
