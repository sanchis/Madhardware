
import { Box, Center, Heading, Image, Text } from '@chakra-ui/react'

export function PccomponentesCard ({ product }) {
  return (
    <Box borderWidth='1px' borderColor='orange.400' backgroundColor='white' color='gray.900' borderRadius='lg' overflow='hidden'>
      <Center>
        <Image src={product.image} alt={product.name} />
      </Center>

      <Box p='6'>
        <Heading align='center' size='lg'>{product.name}</Heading>

        <Box mt='5'>
          <Text noOfLines={5}>
            {product.description}
          </Text>
        </Box>

        <Heading mt='5' align='center' size='lg'>{product.price} €</Heading>
      </Box>
    </Box>
  )
}
