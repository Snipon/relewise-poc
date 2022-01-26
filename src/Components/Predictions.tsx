import { Box, Heading } from '@chakra-ui/react';
import { PredictionsType } from '../services/relewise.service';
import Highlighted from './Highlighted';

function Predictions({
  predictions,
  callback
}: {
  predictions: PredictionsType[];
  callback: (val: string) => void;
}) {
  let query = '';

  predictions
    .filter(({ type }) => type === 'Match')
    .map(({ term }) => {
      query = term;
    });

  return (
    <Box as="nav">
      <Heading as="h1" size="sm">
        Predictions
      </Heading>
      <ul>
        {predictions
          .filter(({ type }) => type === 'WordContinuation')
          .map((prediction, i: number) => (
            <li key={i} onClick={() => callback(prediction.term)} style={{ cursor: 'pointer' }}>
              <Highlighted subject={prediction.term} term={query} />
            </li>
          ))}
      </ul>
    </Box>
  );
}

export default Predictions;
