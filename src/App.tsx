import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import HeaderComponent from './Components/Header.Component';
import SearchBoxComponent from './Components/SearchBox.component';
import { v4 as uuid } from 'uuid';
import Recommended from './Components/Recommended';
import PopularProducts from './Components/PopularProducts';

function App() {
  // Set mock user id.
  let currentUser = localStorage.getItem('user');
  if (!currentUser) {
    const id = uuid();
    localStorage.setItem('user', id);
    currentUser = id;
  }

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Container maxW="container.lg" padding={5}>
        <Grid templateColumns="repeat(12, 1fr)" gap={5}>
          <GridItem colSpan={12}>
            <HeaderComponent />
          </GridItem>
        </Grid>
      </Container>
      <Box bg="white" color="black">
        <Container maxW="container.lg" padding="5">
          <Grid templateColumns="repeat(5, 1fr)" gap={5}>
            <GridItem colSpan={12}>
              <SearchBoxComponent />
            </GridItem>
            <GridItem colSpan={6} margin={5}>
              <Recommended />
            </GridItem>
            <GridItem colSpan={6} margin={5}>
              <PopularProducts />
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Container maxW="container.lg" padding={5}>
        <Grid templateColumns="repeat(5, 1fr)" gap={5}>
          <GridItem colSpan={12}>
            <p>User: {currentUser}</p>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
