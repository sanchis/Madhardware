
import { Box, Center, Heading, Image, SkeletonCircle, SkeletonText, Text, Tooltip } from '@chakra-ui/react'

export default function ProductCard ({ product, shopColor, loading = false }) {
  const isLoading = () => !product || loading
  return (
    <Box borderWidth='1px' borderColor={shopColor} borderRadius='lg' overflow='hidden'>
      <Center>
        <SkeletonCircle width='300px' height='300px' colorScheme='blue' isLoaded={!isLoading()}>
          <Image maxW='300' mt='3' borderRadius='lg' src={product?.image} alt={product?.name} />
        </SkeletonCircle>
      </Center>

      <Box p='6'>
        <SkeletonText align='center' size='lg' noOfLines={3} isLoaded={!isLoading()}>
          <Tooltip label={product?.name || ''}>
            <Heading align='center' size='lg' noOfLines={3}>{product?.name}</Heading>
          </Tooltip>
        </SkeletonText>
        <Box mt='5'>
          <SkeletonText noOfLines={5} isLoaded={!isLoading()}>
            <Text noOfLines={5}>{product?.description}</Text>
          </SkeletonText>
        </Box>
        <SkeletonText mt='5' align='center' size='lg' isLoaded={!isLoading()}>
          <Heading mt='5' align='center' size='lg'>{product?.price} €</Heading>
        </SkeletonText>

      </Box>
    </Box>
  )
}
