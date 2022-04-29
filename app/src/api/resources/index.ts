import { Image } from 'src/models';

type ProductResource = {
  readonly name: string;
  readonly images: Image[];
};

export type { ProductResource };
