import { Box, Heading } from '@chakra-ui/react';
import { PredictionsType } from '../services/relewise.service';
import Highlighted from './Highlighted';

function Predictions({ predictions }: { predictions: PredictionsType[] }) {
  let query = '';

  predictions
    .filter(({ type }) => type === 'Match')
    .map(({ term }) => {
      query = term;
    });

  return (
    <Box>
      <Heading as="h2" size="md">
        Recommended for you
      </Heading>
      <ul>
        {predictions
          .filter(({ type }) => type === 'WordContinuation')
          .map((prediction, i: number) => (
            <li key={i}>
              <Highlighted subject={prediction.term} term={query} />
            </li>
          ))}
      </ul>
    </Box>
  );
}

export default Predictions;
