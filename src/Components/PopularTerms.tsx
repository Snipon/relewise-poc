import { useEffect } from 'react';
import relewise from '../services/relewise.service';

function PopularTerms() {
  const requestBody = {
    term: 'test',
    settings: {
      targetEntityTypes: ['Product']
    },
    language: {
      value: 'da'
    }
  };

  const getData = async () => {
    const searchResult = await relewise({
      searchPath: 'PopularSearchTermsRecommendationRequest',
      requestBody
    });

    console.log(searchResult);
  };

  useEffect(() => {
    getData();
  }, []);

  return <span style={{ textDecoration: 'line-through' }}>Popular search terms</span>;
}

export default PopularTerms;
