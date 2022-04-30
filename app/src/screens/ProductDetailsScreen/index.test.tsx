import React from 'react';

import { render } from '@testing-library/react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Product } from 'src/models';
import { ProductDetailScreen } from '.';

jest.mock('@react-navigation/native');

describe('<ProductDetailScreen />', () => {
  const mockUseNavigation = useNavigation as jest.Mock;
  const mockUseRoute = useRoute as jest.Mock;

  const mockSetOptions = jest.fn();

  const product: Product = {
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
  };

  beforeEach(() => {
    mockUseNavigation.mockReturnValue({
      setOptions: mockSetOptions,
    });

    mockUseRoute.mockReturnValue({
      params: {
        product,
      },
    });
  });

  it('sets navigation title to product name', () => {
    render(<ProductDetailScreen />);

    expect(mockSetOptions).toBeCalledWith({
      title: product.name,
    });
  });
});
