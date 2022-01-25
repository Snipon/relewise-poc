import { Box, Button, Grid, GridItem, Heading, Input } from '@chakra-ui/react';
import { ChangeEventHandler, useEffect, useState } from 'react';
import relewise, { SearchDataType, SearchResultType } from '../services/relewise.service';
import Highlighted from './Highlighted';
import PopularTerms from './PopularTerms';
import Predictions from './Predictions';
import ViewButton from './ViewButton';

function SearchBoxComponent() {
  const [value, setValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem('user');

  const defaultValue = {
    query: '',
    results: [],
    recommendations: [],
    predictions: []
  };

  const [searchResult, setSearchResult] = useState<SearchResultType>(defaultValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setValue(e.target.value);
  };

  // Combined request, woot!
  const requestBody = {
    Requests: [
      {
        $type: 'Relewise.Client.Requests.Search.SearchTermPredictionRequest, Relewise.Client',
        Term: value,
        Take: 5
      },
      {
        $type: 'Relewise.Client.Requests.Search.ProductSearchRequest, Relewise.Client',
        Term: value,
        Facets: {
          Items: []
        },
        Settings: {
          Recommendations: {},
          selectedProductProperties: {
            displayName: true,
            dataKeys: ['Author Names', 'Publishers']
          }
        },
        Sorting: {},
        Take: 20,
        Filters: {}
      }
    ],
    Language: {
      Value: 'da'
    },
    Currency: {
      Value: 'DKK'
    },
    User: {
      temporaryId: user,
      Classifications: {},
      Identifiers: {},
      Data: {}
    },
    DisplayedAtLocation: 'Search overlay',
    RelevanceModifiers: {},
    Filters: {}
  };

  const handleSearch = async () => {
    setLoading(true);
    setSearchQuery(value);
    const { query, results, recommendations, predictions } = await relewise({
      searchPath: 'SearchRequestCollection',
      requestBody,
      query: value
    });

    setSearchResult({ query, results, recommendations, predictions });
    setLoading(false);
  };

  const { results, predictions, query } = searchResult;

  const handlePredictionClick = (val: string) => {
    setValue(val);
    setSearchQuery(val);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

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
        <GridItem colSpan={5}>
          <PopularTerms />
        </GridItem>
        {predictions.length > 1 && (
          <GridItem colSpan={1} margin={5}>
            <Predictions predictions={predictions} callback={handlePredictionClick} />
          </GridItem>
        )}
        {results.length > 0 && (
          <GridItem colSpan={predictions.length > 1 ? 4 : 5} margin={5}>
            <Heading as="h2" size="sm">
              Results for <em>{query}</em>
            </Heading>
            <ul>
              {results.map(({ displayName, productId }: SearchDataType) => (
                <li key={productId}>
                  <Highlighted subject={displayName} term={query} /> <ViewButton id={productId} />
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
