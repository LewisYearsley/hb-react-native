import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Product } from 'src/models';
import { ProductList } from '.';

describe('<ProductList />', () => {
  const onEndReached = jest.fn;
  const onSelectProduct = jest.fn;

  const products: Product[] = [
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

  it('renders message when product list is empty', () => {
    const { getByText } = render(
      <ProductList products={[]} onEndReached={onEndReached} onSelectProduct={onSelectProduct} />,
    );

    expect(getByText('No products found.')).toBeTruthy();
  });

  it.each(products)('renders product list including "%s"', ({ name }) => {
    const { getByText } = render(
      <ProductList
        products={products}
        onEndReached={onEndReached}
        onSelectProduct={onSelectProduct}
      />,
    );

    expect(getByText(name)).toBeTruthy();
  });

  it.each(products)('raises event when user selects product "%j"', ({ name }) => {
    const onSelectProduct = jest.fn();
    const expectedProduct = products.find(product => product.name === name);

    const { getByText } = render(
      <ProductList
        products={products}
        onSelectProduct={onSelectProduct}
        onEndReached={onEndReached}
      />,
    );

    fireEvent.press(getByText(name));

    expect(onSelectProduct).toHaveBeenCalledWith(expectedProduct);
  });
});
