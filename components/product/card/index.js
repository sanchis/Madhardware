
import { Box, Center, Heading, Image, Text } from '@chakra-ui/react'

export default function ProductCard ({ product, shopColor }) {
  return (
    <Box borderWidth='1px' borderColor={shopColor} borderRadius='lg' overflow='hidden'>
      <Center>
        <Image maxW='300' src={product.image} alt={product.name} />
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
