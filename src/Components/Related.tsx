import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import relewise, { SearchResultType } from '../services/relewise.service';
import ProductList from './ProductList';

const user = localStorage.getItem('user');

function Related({ id }: { id: string }) {
  const [result, setResult] = useState<SearchResultType>({
    results: [],
    recommendations: [],
    predictions: []
  });

  const requestBody = {
    existingProductId: { productId: id },
    evaluationSettings: {
      significanceOfSimilaritiesInDisplayName: 1,
      significanceOfSimilarListPrice: 0.5,
      significanceOfCommonImmediateParentCategories: 1,
      significanceOfCommonParentsParentCategories: 0.5,
      significanceOfCommonAncestorCategories: 2,
      significanceOfIdenticalProductDataValues: 1,
      significanceOfSimilarSalesPrice: 0.5
    },
    settings: {
      numberOfRecommendations: 5,
      recommendVariant: true
    },
    Language: {
      Value: 'da'
    },
    user: {
      temporaryId: user,
      data: {}
    },
    displayedAtLocationType: 'Product Details Page',
    currency: {
      value: 'DKK'
    }
  };

  const getData = async () => {
    const searchResult = await relewise({
      searchPath: 'SimilarProductsRequest',
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
        Similar products
      </Heading>
      <ProductList data={recommendations} columns={5} />
    </Box>
  );
}

export default Related;
