import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { ProductListScreen } from '.';
import { Product } from 'src/models';

import { getProducts } from 'src/api';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');

  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock('src/api');

describe('<ProductListScreen />', () => {
  const mockGetProducts = getProducts as jest.Mock;

  const products: readonly Product[] = [
    {
      id: '1',
      name: 'Name #1',
      price: 1.99,
      stock_status: 'INSTOCK',
      rating: 5,
      promotions: [{ text: 'penny' }],
      images: [
        {
          list: [
            { path: 'image path #1', resolution: '10' },
            { path: 'image path #2', resolution: '10' },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Name #2',
      price: 1.99,
      stock_status: 'INSTOCK',
      rating: 5,
      promotions: [{ text: 'penny' }],
      images: [
        {
          list: [
            { path: 'image path #1', resolution: '10' },
            { path: 'image path #2', resolution: '10' },
          ],
        },
      ],
    },
  ];

  beforeEach(() => {
    mockGetProducts.mockResolvedValue(products);
  });

  it.each(products)('renders product list', async ({ name }) => {
    const { getByText } = render(<ProductListScreen />);

    await waitFor(() => {
      expect(getByText(name)).toBeTruthy();
    });
  });

  it('renders activity indicator (spinner) initially and then removes it', async () => {
    const { queryByTestId } = render(<ProductListScreen />);

    expect(queryByTestId('activity-indicator')).toBeTruthy();
    await waitFor(() => expect(queryByTestId('activity-indicator')).toBeFalsy());
  });

  it('renders error message when fails to get products', async () => {
    const errorMessage = 'Failed to get products';

    mockGetProducts.mockRejectedValue(new Error(errorMessage));

    const { getByText } = render(<ProductListScreen />);

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeTruthy();
    });
  });

  it.each(products)('navigates to detail screen when user selects product "%j"', async product => {
    const { getByText } = render(<ProductListScreen />);

    const { name } = product;

    await waitFor(() => {
      expect(getByText(name)).toBeTruthy();
    });

    fireEvent.press(getByText(name));

    expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', { product });
  });
});
