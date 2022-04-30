import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Product } from 'src/models';
import { ProductList } from '.';

describe('<ProductList />', () => {
  const products: Product[] = [
    {
      name: 'Name #1',
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
      name: 'Name #2',
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
    const { getByText } = render(<ProductList products={[]} />);

    expect(getByText('No products found.')).toBeTruthy();
  });

  it.each(products)('renders product list including "%s"', ({ name }) => {
    const { getByText } = render(<ProductList products={products} />);

    expect(getByText(name)).toBeTruthy();
  });
});
