type Product = {
  readonly id: string;
  readonly name: string;
  readonly images: Image[];
  readonly price: number;
  readonly stock_status: string;
  readonly rating: number;
  readonly promotions: Promotion[];
};

type Promotion = {
  text: string;
};
type Image = {
  list: ImageList[];
};

type ImageList = {
  path: string;
  resolution: string;
};

export type { Product, Image, Promotion };
