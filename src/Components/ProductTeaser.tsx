import { Box } from '@chakra-ui/react';
import Highlighted from './Highlighted';
import ViewButton from './ViewButton';

export interface ProductType {
  name: string;
  id: string;
  highlight?: string;
}

function ProductTeaser({ name, id, highlight }: ProductType) {
  return (
    <Box>
      <Highlighted subject={name} term={highlight} /> <ViewButton id={id} />
    </Box>
  );
}

export default ProductTeaser;
