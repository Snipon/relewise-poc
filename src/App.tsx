import { Container, Grid, GridItem } from '@chakra-ui/react';
import HeaderComponent from './Components/Header.Component';
import SearchBoxComponent from './Components/SearchBox.component';

function App() {
  return (
    <Container maxW="container.lg">
      <Grid templateColumns="repeat(5, 1fr)" gap={5}>
        <GridItem colSpan={5}>
          <HeaderComponent />
        </GridItem>
        <GridItem colSpan={5}>
          <SearchBoxComponent />
        </GridItem>
      </Grid>
    </Container>
  );
}

export default App;
