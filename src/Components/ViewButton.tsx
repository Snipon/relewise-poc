import { Button } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import axios from 'axios';
function ViewButton({ id }: { id: string }) {
  const apiEndpoint = process.env.REACT_APP_RELEWISE_API_ENDPOINT || '';
  const apiKey = process.env.REACT_APP_RELEWISE_API_KEY || '';
  const user = localStorage.getItem('user');

  const searchBody = {
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
      const res = await axios.post(`${apiEndpoint}/TrackProductViewRequest`, searchBody, {
        headers: {
          Authorization: `APIKey ${apiKey}`
        }
      });

      console.log(res.status);
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
