import { Box, Button, Grid, GridItem, Heading, Input } from '@chakra-ui/react';
import axios from 'axios';
import { ChangeEventHandler, useState } from 'react';

function SearchBoxComponent() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setQuery(value);
    const apiKey = process.env.REACT_APP_RELEWISE_API_KEY || '';
    const searchUrl = process.env.REACT_APP_RELEWISE_API_ENDPOINT || '';

    const searchBody = {
      Term: query,
      Settings: {
        SelectedProductProperties: {
          DisplayName: true,
          DataKeys: ['Author Names']
        }
      },
      Take: 10,
      Language: {
        Value: 'da'
      },
      Currency: {
        Value: 'DKK'
      },
      User: {},
      DisplayedAtLocation: 'Search overlay'
    };

    try {
      const { data } = await axios.post(`${searchUrl}/ProductSearchRequest`, searchBody, {
        headers: {
          Authorization: `APIKey ${apiKey}`
        }
      });

      if (data) {
        const formatted = data.results.map(({ displayName }: { displayName: string }) => ({
          displayName
        }));
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
              {result.map(({ displayName }, i) => (
                <li key={i}>{displayName}</li>
              ))}
            </ul>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}

export default SearchBoxComponent;
