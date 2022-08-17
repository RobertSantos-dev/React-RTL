import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { updateFavoritePokemons } from '../services/pokedexService';
import PokemonDetails from '../pages/PokemonDetails';
import renderWithRouter from '../renderWithRouter';

describe('Testes no componente App.js', () => {
  const NOME_IMAGEM = '../logo.svg';
  const NOME_MAPAS = ['../../public/logo192.png', '../../public/logo512.png'];
  const CIDADES = ['Santa Catarina', 'Pará', 'Rio de Janeiro', 'Acre'];

  const arr = [
    {
      id: 1,
      name: 'Robert Santos',
      image: NOME_IMAGEM,
      averageWeight: { value: '87', measurementUnit: 'kg' },
      type: 'Lindo e maravilhoso',
      summary: 'O mais inteligente que exite, o principal',
      foundAt: [
        { location: CIDADES[0], map: NOME_MAPAS[0] },
        { location: CIDADES[1], map: NOME_MAPAS[1] },
      ],
    },
    {
      id: 2,
      name: 'Roberta Aquino',
      image: NOME_IMAGEM,
      averageWeight: { value: '30', measurementUnit: 'kg' },
      type: 'Linda e maravilhosa',
      summary: 'A segunda mais inteligente que exite so atras do Robert',
      foundAt: [
        { location: CIDADES[2], map: NOME_MAPAS[0] },
        { location: CIDADES[3], map: NOME_MAPAS[1] },
      ],
    },
  ];

  test('Teste para obter detalhes do Pokemon', () => {
    const match = { params: { id: `${arr[0].id}` } };
    renderWithRouter(
      <PokemonDetails
        pokemons={ arr }
        isPokemonFavoriteById={ { [arr[0].id]: true } }
        match={ match }
        onUpdateFavoritePokemons={
          () => updateFavoritePokemons(arr[0].id, true)
        }
      />,
    );

    const texto = `${arr[0].name} Details`;
    const titulo = screen.getByRole('heading', { level: 2, name: texto });
    expect(titulo).toBeInTheDocument();

    const titulo2 = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(titulo2).toBeInTheDocument();

    const descricao = screen.getByText(arr[0].summary);
    expect(descricao).toBeInTheDocument();
  });

  test('Testando o map de pokemon', () => {
    const match = { params: { id: `${arr[0].id}` } };
    renderWithRouter(
      <PokemonDetails
        pokemons={ arr }
        isPokemonFavoriteById={ { [arr[0].id]: true } }
        match={ match }
        onUpdateFavoritePokemons={
          () => updateFavoritePokemons(arr[0].id, true)
        }
      />,
    );

    const texto = `Game Locations of ${arr[0].name}`;
    const titulo = screen.getByRole('heading', { level: 2, name: texto });
    expect(titulo).toBeInTheDocument();

    const location = `${arr[0].name} location`;
    const imagemMap = screen.getAllByRole('img', { name: location });
    imagemMap.forEach((e, i) => {
      expect(e).toBeInTheDocument();
      expect(e).toHaveAttribute('src', NOME_MAPAS[i]);
    });
  });

  test('Testando se existe um label com input checkbox', () => {
    const match = { params: { id: `${arr[0].id}` } };
    renderWithRouter(
      <PokemonDetails
        pokemons={ arr }
        isPokemonFavoriteById={ { [arr[0].id]: true } }
        match={ match }
        onUpdateFavoritePokemons={
          () => updateFavoritePokemons(arr[0].id, true)
        }
      />,
    );

    const check = screen.getByLabelText('Pokémon favoritado?');
    expect(check).toBeInTheDocument();
  });
});
