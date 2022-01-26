import { UnorderedList, ListItem } from '@chakra-ui/react';
import ProductTeaser from './ProductTeaser';

/* eslint-disable */
function ProductList({ data, highlight }: { data: any[]; highlight?: string }) {
  return (
    <UnorderedList spacing={3}>
      {data.map(({ displayName, productId }) => (
        <ListItem key={productId}>
          <ProductTeaser name={displayName} id={productId} highlight={highlight} />
        </ListItem>
      ))}
    </UnorderedList>
  );
}

export default ProductList;
