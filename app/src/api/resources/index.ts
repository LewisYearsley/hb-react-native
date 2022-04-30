import { Image, Promotion } from 'src/models';

type ProductResource = {
  readonly id: string;
  readonly name: string;
  readonly images: Image[];
  readonly price: number;
  readonly stock_status: string;
  readonly rating: number;
  readonly promotions: Promotion[];
};

export type { ProductResource };
