import axios from 'axios';

export interface SearchConfigType {
  searchPath: string;
  searchBody: any;
  query?: string;
}

export interface SearchDataType {
  displayName: string;
  productId: string;
}

export interface SearchResultType {
  query?: string;
  data: any;
  status?: string;
}

async function relewise(conf: SearchConfigType): Promise<SearchResultType> {
  const { searchPath, query, searchBody } = conf;
  const apiEndpoint = process.env.REACT_APP_RELEWISE_API_ENDPOINT || '';
  const apiKey = process.env.REACT_APP_RELEWISE_API_KEY || '';
  let result;

  try {
    const { data } = await axios.post(`${apiEndpoint}/${searchPath}`, searchBody, {
      headers: {
        Authorization: `APIKey ${apiKey}`
      }
    });
    result = data;
  } catch (error) {
    console.log(error);
  }
  return { data: result, query };
}

export default relewise;
