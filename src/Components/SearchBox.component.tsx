import { Box, Button, Grid, GridItem, Heading, Input } from '@chakra-ui/react';
import axios from 'axios';
import { ChangeEventHandler, useState } from 'react';
import ViewButton from './ViewButton';

function SearchBoxComponent() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const user = localStorage.getItem('user');

  const handleSearch = async () => {
    setLoading(true);
    const apiEndpoint = process.env.REACT_APP_RELEWISE_API_ENDPOINT || '';
    const apiKey = process.env.REACT_APP_RELEWISE_API_KEY || '';
    setQuery(value);

    const searchBody = {
      term: value,
      settings: {
        selectedProductProperties: {
          displayName: true,
          dataKeys: ['Author Names']
        }
      },
      take: 10,
      language: {
        Value: 'da'
      },
      currency: {
        Value: 'DKK'
      },
      user: {
        temporaryId: user
      },
      displayedAtLocation: 'Search overlay'
    };

    try {
      const { data } = await axios.post(`${apiEndpoint}/ProductSearchRequest`, searchBody, {
        headers: {
          Authorization: `APIKey ${apiKey}`
        }
      });

      if (data) {
        const formatted = data.results.map(
          ({ displayName, productId }: { displayName: string; productId: string }) => ({
            displayName,
            productId
          })
        );
        setResult(formatted);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box>
      <Grid templateColumns="repeat(5, 1fr)" gap={0}>
        <GridItem colSpan={4}>
          <Input
            value={value}
            onChange={handleChange}
            placeholder="Search for something"
            size="lg"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Button
            disabled={value.length === 0 || loading}
            isLoading={loading}
            colorScheme="teal"
            onClick={handleSearch}
            size="lg"
          >
            Search
          </Button>
        </GridItem>
        {result.length > 0 && (
          <GridItem colSpan={5} margin={5}>
            <Heading as="h2" size="sm">
              Results for <em>{query}</em>
            </Heading>
            <ul>
              {result.map(({ displayName, productId }) => (
                <li key={productId}>
                  {displayName}
                  <ViewButton id={productId} />
                </li>
              ))}
            </ul>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}

export default SearchBoxComponent;
