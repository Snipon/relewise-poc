import { Box, Heading, Progress } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import relewise, { SearchResultType } from '../services/relewise.service';
import ProductList from './ProductList';

function Related({ id }: { id: string }) {
  const user = localStorage.getItem('user');
  const [loading, setLoading] = useState(false);
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
      recommendVariant: true,
      allowReplacingOfRecentlyShownRecommendations: true
    },
    Language: {
      Value: 'da'
    },
    user: {
      temporaryId: user
    },
    displayedAtLocationType: 'Product Details Page',
    currency: {
      value: 'DKK'
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const searchResult = await relewise({
        searchPath: 'SimilarProductsRequest',
        requestBody
      });

      const { recommendations } = searchResult;
      setResult({ recommendations, results: [], predictions: [] });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { recommendations } = result;

  return (
    <Box as="section">
      <Heading as="h1" size="md" marginBottom={5}>
        Similar products
      </Heading>
      <ProductList data={recommendations} columns={5} />
      {loading && <Progress colorScheme="teal" size="xs" isIndeterminate />}
    </Box>
  );
}

export default Related;
