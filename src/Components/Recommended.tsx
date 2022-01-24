import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import relewise, { SearchResultType } from '../services/relewise.service';

function Recommended() {
  const user = localStorage.getItem('user');

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
      },
      user: {
        temporaryId: user
      }
    }
  };

  const getData = async () => {
    const searchResult = await relewise({
      searchPath: 'PersonalProductRecommendationRequest',
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
        Recommended for you
      </Heading>
      <ul>
        {recommendations.map((item: { productId: string; displayName: string }) => (
          <li key={item.productId}>{item.displayName}</li>
        ))}
      </ul>
    </Box>
  );
}

export default Recommended;
