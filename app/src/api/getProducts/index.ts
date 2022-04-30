import { Product } from 'src/models';
import { ProductResource } from 'src/api/resources';

const toModel = (response: Array<ProductResource>): Array<Product> => {
  const products = response.map(product => ({
    id: product.id,
    name: product.name,
    images: product.images,
  }));

  return products;
};

const getProducts = async (page = 0, pageSize = 0): Promise<readonly Product[]> => {
  const baseUrl = 'http://localhost:4000';
  const url = `${baseUrl}/products/all`;

  const result = await fetch(url);
  const { status } = result;

  if (status !== 200) {
    throw new Error(`Failed to get products (${status})`);
  }

  const response = await result.json();

  const paginatedResponse: ProductResource[] =
    response.slice(page * pageSize, (page + 1) * pageSize) || [];

  return toModel(paginatedResponse);
};

export { getProducts };
