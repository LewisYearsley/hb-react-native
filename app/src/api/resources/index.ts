import { Image } from 'src/models';

type ProductResource = {
  readonly id: string;
  readonly name: string;
  readonly images: Image[];
};

export type { ProductResource };
