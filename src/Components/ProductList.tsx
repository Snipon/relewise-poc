import { Grid, GridItem, List, ListItem } from '@chakra-ui/react';
import ProductTeaser from './ProductTeaser';

/* eslint-disable */
function ProductList({
  data,
  highlight,
  columns
}: {
  data: any[];
  highlight?: string;
  columns: number;
}) {
  return (
    <List spacing={3}>
      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={5}>
        {data.map(({ displayName, productId }) => (
          <GridItem key={productId} colSpan={1} bg="tomato" color="white">
            <ListItem>
              <ProductTeaser name={displayName} id={productId} highlight={highlight} />
            </ListItem>
          </GridItem>
        ))}
      </Grid>
    </List>
  );
}

export default ProductList;
