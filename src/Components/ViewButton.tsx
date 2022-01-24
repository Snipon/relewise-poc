import { Button } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import relewise from '../services/relewise.service';
function ViewButton({ id }: { id: string }) {
  const user = localStorage.getItem('user');

  const requestBody = {
    productView: {
      user: {
        temporaryId: user,
        data: {}
      },
      product: {
        id
      },
      typeName: 'ProductView'
    }
  };

  const handleOnClick = async () => {
    try {
      const { statusCode } = await relewise({ searchPath: 'TrackProductViewRequest', requestBody });

      console.log(statusCode);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button size="xs" onClick={handleOnClick}>
      <ViewIcon />
    </Button>
  );
}

export default ViewButton;
