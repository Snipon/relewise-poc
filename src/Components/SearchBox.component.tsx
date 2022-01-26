import {
  Box,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner
} from '@chakra-ui/react';
import { useState } from 'react';
import relewise, { SearchResultType } from '../services/relewise.service';
import PopularTerms from './PopularTerms';
import Predictions from './Predictions';
import ProductList from './ProductList';
import { Formik, FormikValues } from 'formik';
import { SearchIcon } from '@chakra-ui/icons';

function SearchBoxComponent() {
  const user = localStorage.getItem('user');

  const defaultValue = {
    query: '',
    results: [],
    recommendations: [],
    predictions: []
  };

  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResultType>(defaultValue);

  const handleSearch = async ({ query }: FormikValues) => {
    setLoading(true);

    // Combined request, woot!
    const requestBody = {
      Requests: [
        {
          $type: 'Relewise.Client.Requests.Search.SearchTermPredictionRequest, Relewise.Client',
          Term: query,
          Take: 5
        },
        {
          $type: 'Relewise.Client.Requests.Search.ProductSearchRequest, Relewise.Client',
          Term: query,
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

    const { results, recommendations, predictions } = await relewise({
      searchPath: 'SearchRequestCollection',
      requestBody,
      query
    });

    setSearchResult({ query, results, recommendations, predictions });
    setLoading(false);
  };

  const { results, predictions, query } = searchResult;

  const handlePredictionClick = (val: string) => {
    handleSearch({ query: val });
  };

  return (
    <Box>
      <Grid templateColumns="repeat(12, 1fr)" gap={0}>
        <GridItem colSpan={12}>
          <Formik initialValues={{ query: '' }} onSubmit={handleSearch}>
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <InputGroup>
                  <InputRightElement
                    children={
                      loading ? <Spinner size="sm" color="gray" /> : <SearchIcon color="gray" />
                    }
                  />
                  <Input
                    disabled={loading}
                    value={values.query}
                    name="query"
                    onChange={handleChange}
                    placeholder="Search for something"
                    size="lg"
                  />
                </InputGroup>
              </form>
            )}
          </Formik>
        </GridItem>
        <GridItem colSpan={12}>
          <PopularTerms />
        </GridItem>
        {predictions.length > 1 && (
          <GridItem colSpan={2} margin={5} as="aside">
            <Predictions predictions={predictions} callback={handlePredictionClick} />
          </GridItem>
        )}
        {results.length > 0 && (
          <GridItem colSpan={predictions.length > 1 ? 10 : 12} margin={5} as="main">
            <Heading as="h2" size="md" marginBottom={5}>
              Results for <em>{query}</em>
            </Heading>
            <ProductList data={results} columns={predictions.length > 1 ? 4 : 5} />
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}

export default SearchBoxComponent;
