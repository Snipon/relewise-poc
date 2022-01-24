import { Box, Button, Grid, GridItem, Heading, Input } from '@chakra-ui/react';
import { ChangeEventHandler, useState } from 'react';
import relewise, { SearchDataType, SearchResultType } from '../services/relewise.service';
import ViewButton from './ViewButton';

function SearchBoxComponent() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem('user');
  const [searchResult, setSearchResult] = useState<SearchResultType>({
    query: '',
    results: [],
    recommendations: [],
    predictions: []
  });

  const autoCompleteBody = {
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
      Classifications: {},
      Identifiers: {},
      Data: {}
    },
    DisplayedAtLocation: 'Search overlay',
    RelevanceModifiers: {},
    Filters: {}
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setValue(e.target.value);
    const { predictions, results } = await relewise({
      searchPath: 'SearchRequestCollection',
      requestBody: autoCompleteBody
    });

    setSearchResult({
      predictions,
      results,
      recommendations: [],
      query: value
    });
  };

  const requestBody = {
    term: value,
    settings: {
      selectedProductProperties: {
        displayName: true,
        dataKeys: ['Author Names', 'Publishers']
      },
      recommendations: {
        take: 5
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
    const { query, results, recommendations, predictions } = await relewise({
      searchPath: 'ProductSearchRequest',
      requestBody,
      query: value
    });

    setSearchResult({ query, results, recommendations, predictions });
    setLoading(false);
  };

  const { results, predictions, query } = searchResult;

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
        {predictions.length > 0 && (
          <GridItem colSpan={5} margin={5}>
            <Heading as="h2" size="sm">
              predictions for <em>{query}</em>
            </Heading>
            <ul>
              {predictions.map(({ term }: any, i) => (
                <li key={i}>{term}</li>
              ))}
            </ul>
          </GridItem>
        )}
        {results.length > 0 && (
          <GridItem colSpan={5} margin={5}>
            <Heading as="h2" size="sm">
              Results for <em>{query}</em>
            </Heading>
            <ul>
              {results.map(({ displayName, productId }: SearchDataType) => (
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
