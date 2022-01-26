import { Box, Heading, Image } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import relewise from '../services/relewise.service';
import Highlighted from './Highlighted';
import { ModalContext } from '../providers/ModalProvider';

export interface ProductType {
  name: string;
  id: string;
  highlight?: string;
}

const user = localStorage.getItem('user');

function ProductTeaser({ name, id, highlight }: ProductType) {
  const [clicked, setClicked] = useState(false);
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

  /* eslint-disable */
  const [value, setValue] = useContext(ModalContext);

  const handleOnClick = async () => {
    try {
      const { statusCode } = await relewise({ searchPath: 'TrackProductViewRequest', requestBody });
      setValue({ visible: true, data: { title: name, content: id } });

      console.log(statusCode);
      setClicked(!clicked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box as="article" onClick={handleOnClick} cursor="pointer">
      <Image
        src={`https://dummyimage.com/320x180&text=${clicked ? ':D' : ':)'}`}
        alt="Teaser image"
      />
      <Heading as="h1" size="sm" padding={2} wordBreak="break-word">
        <Highlighted subject={name} term={highlight} />
      </Heading>
    </Box>
  );
}

export default ProductTeaser;
