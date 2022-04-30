type Product = {
  readonly id: string;
  readonly name: string;
  readonly images: Image[];
};

type Image = {
  list: ImageList[];
};

type ImageList = {
  path: string;
  resolution: string;
};

export type { Product, Image };
