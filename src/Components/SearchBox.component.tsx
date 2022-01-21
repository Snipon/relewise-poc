import { Box, Button, Grid, GridItem, Heading, Input } from '@chakra-ui/react';
import { ChangeEventHandler, useEffect, useState } from 'react';
import relewise, { SearchDataType, SearchResultType } from '../services/relewise.service';
import ViewButton from './ViewButton';

function SearchBoxComponent() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem('user');
  const [result, setResult] = useState<SearchResultType>({ query: '', data: [] });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const searchBody = {
    term: value,
    settings: {
      selectedProductProperties: {
        displayName: true,
        dataKeys: ['Author Names']
      }
    },
    take: 20,
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

  const handleSearch = async () => {
    setLoading(true);
    const searchResult = await relewise({
      searchPath: 'ProductSearchRequest',
      searchBody,
      query: value
    });

    const {
      data: { query, results }
    } = searchResult;
    setResult({ query, data: results || [] });
    setLoading(false);
  };

  const { data, query } = result;

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
        {data.length > 0 && (
          <GridItem colSpan={5} margin={5}>
            <Heading as="h2" size="sm">
              Results for <em>{query}</em>
            </Heading>
            <ul>
              {data.map(({ displayName, productId }: SearchDataType) => (
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
