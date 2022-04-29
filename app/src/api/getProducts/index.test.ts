import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { ProductResource } from 'src/api/resources';
import { Product } from 'src/models';

import { getProducts } from '.';

describe('getProducts()', () => {
  const url = 'http://localhost:4000/products/all';

  const exampleProducts: readonly ProductResource[] = [
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

  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('retrieves a list of products', async () => {
    server.use(
      rest.get(url, (_req, response, context) => {
        return response(context.json(exampleProducts));
      }),
    );
    const actualProducts = await getProducts();
    const expectedProducts: readonly Product[] = [
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

    expect(actualProducts).toStrictEqual(expectedProducts);
  });

  it('throws when fails to get products', async () => {
    server.use(
      rest.get(url, (_request, response, context) => {
        return response(context.status(500));
      }),
    );

    await expect(getProducts()).rejects.toThrow('Failed to get products (500)');
  });
});
