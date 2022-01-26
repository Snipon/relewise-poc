import { Box, Heading, Progress } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import relewise, { SearchResultType } from '../services/relewise.service';
import ProductList from './ProductList';

function Recommended() {
  const user = localStorage.getItem('user');
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<SearchResultType>({
    results: [],
    recommendations: [],
    predictions: []
  });

  const requestBody = {
    Language: {
      Value: 'da'
    },
    settings: {
      numberOfRecommendations: 5,
      selectedProductProperties: {
        displayName: true
      }
    },
    user: {
      temporaryId: user
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      const searchResult = await relewise({
        searchPath: 'PersonalProductRecommendationRequest',
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
        Recommended for you
      </Heading>
      <ProductList data={recommendations} columns={5} />
      {loading && <Progress colorScheme="teal" size="xs" isIndeterminate />}
    </Box>
  );
}

export default Recommended;
