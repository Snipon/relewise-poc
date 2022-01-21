import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import relewise, { SearchResultType } from '../services/relewise.service';

function Recommended() {
  const user = localStorage.getItem('user');

  const [result, setResult] = useState<SearchResultType>({ data: [] });

  const searchBody = {
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
      searchBody
    });

    const {
      data: { recommendations }
    } = searchResult;
    setResult({ data: recommendations });
  };

  useEffect(() => {
    getData();
  }, []);

  const { data } = result;

  return (
    <Box>
      <Heading as="h2" size="md">
        Recommended for you
      </Heading>
      <ul>
        {data.map((item: { productId: string; displayName: string }) => (
          <li key={item.productId}>{item.displayName}</li>
        ))}
      </ul>
    </Box>
  );
}

export default Recommended;
