import axios from 'axios';

export interface SearchConfigType {
  searchPath: string;
  requestBody: any;
  query?: string;
}

export interface SearchDataType {
  displayName: string;
  productId: string;
}

export interface PredictionsType {
  term: string;
  type: string;
}

/* eslint-disable */
export interface SearchResultType {
  query?: string;
  predictions: PredictionsType[];
  recommendations: any[];
  results: any[];
  statusCode?: number;
}

async function relewise(conf: SearchConfigType): Promise<SearchResultType> {
  const { searchPath, query, requestBody } = conf;
  const apiEndpoint = process.env.REACT_APP_RELEWISE_API_ENDPOINT || '';
  const apiKey = process.env.REACT_APP_RELEWISE_API_KEY || '';

  const searchResult = {
    results: [],
    recommendations: [],
    predictions: [],
    statusCode: 0
  };

  try {
    const { data, status: statusCode } = await axios.post(
      `${apiEndpoint}/${searchPath}`,
      requestBody,
      {
        headers: {
          Authorization: `APIKey ${apiKey}`
        }
      }
    );

    searchResult.results = data.results || [];
    searchResult.recommendations = data.recommendations || [];
    searchResult.statusCode = statusCode;

    data.responses &&
      data.responses.map((response: any) => {
        const { predictions, results } = response;
        if (predictions) searchResult.predictions = predictions || [];
        if (results) searchResult.results = results || [];
      });
  } catch (error) {
    console.log(error);
  }
  return {
    results: searchResult.results || [],
    recommendations: searchResult.recommendations || [],
    predictions: searchResult.predictions || [],
    query,
    statusCode: searchResult.statusCode
  };
}

export default relewise;
