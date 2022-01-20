import { Box, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Recommended() {
  const user = localStorage.getItem('user');
  const apiEndpoint = process.env.REACT_APP_RELEWISE_API_ENDPOINT || '';
  const apiKey = process.env.REACT_APP_RELEWISE_API_KEY || '';

  const [result, setResult] = useState([]);

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
    try {
      const res = await axios.post(
        `${apiEndpoint}/PersonalProductRecommendationRequest`,
        requestBody,
        {
          headers: {
            Authorization: `APIKey ${apiKey}`
          }
        }
      );

      setResult(res.data.recommendations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Heading as="h2" size="md">
        Recommended for you
      </Heading>
      <ul>
        {result.map((item: { productId: string; displayName: string }) => (
          <li key={item.productId}>{item.displayName}</li>
        ))}
      </ul>
    </Box>
  );
}

export default Recommended;
