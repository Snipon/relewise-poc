import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import relewise, { SearchResultType } from '../services/relewise.service';
import ProductList from './ProductList';

function PopularProducts() {
  const [result, setResult] = useState<SearchResultType>({
    results: [],
    recommendations: [],
    predictions: []
  });

  const requestBody = {
    basedOn: 'MostViewed',
    settings: {
      sinceMinutesAgo: 0,
      numberOfRecommendations: 5,
      selectedProductProperties: {
        displayName: true
      }
    },
    Language: {
      Value: 'da'
    }
  };

  const getData = async () => {
    const searchResult = await relewise({
      searchPath: 'PopularProductsRequest',
      requestBody
    });

    const { recommendations } = searchResult;
    setResult({ recommendations, results: [], predictions: [] });
  };

  useEffect(() => {
    getData();
  }, []);

  const { recommendations } = result;

  return (
    <Box>
      <Heading as="h2" size="md">
        Popular products
      </Heading>
      <ProductList data={recommendations} columns={5} />
    </Box>
  );
}

export default PopularProducts;
