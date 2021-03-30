
import { Box, Center, Heading, Image, Progress, SkeletonCircle, SkeletonText, Text, Tooltip } from '@chakra-ui/react'

export default function ProductCard ({ product, shopColor, loading = false }) {
  const isLoading = () => !product || loading
  return (
    <Box data-testid='card' borderWidth='1px' borderColor={shopColor} borderRadius='lg' overflow='hidden'>
      {isLoading() ? <Progress aria-label='loading-progress' size='xs' isIndeterminate colorScheme='orange' /> : null}
      <Center>
        <SkeletonCircle aria-label='loading' width='300px' height='300px' colorScheme='blue' isLoaded={!isLoading()}>
          <Image aria-label='product-image' maxW='300' mt='3' data-src={product?.image} borderRadius='lg' src={product?.image} alt={product?.name} />
        </SkeletonCircle>
      </Center>

      <Box p='6'>
        <SkeletonText aria-label='loading' align='center' size='lg' noOfLines={3} isLoaded={!isLoading()}>
          <Tooltip label={product?.name || ''}>
            <Heading aria-label='product-header' align='center' size='lg' noOfLines={3}>{product?.name}</Heading>
          </Tooltip>
        </SkeletonText>
        <Box mt='5'>
          <SkeletonText aria-label='loading' noOfLines={5} isLoaded={!isLoading()}>
            <Text aria-label='product-description' noOfLines={5}>{product?.description}</Text>
          </SkeletonText>
        </Box>
        <SkeletonText aria-label='loading' mt='5' align='center' size='lg' isLoaded={!isLoading()}>
          <Heading aria-label='product-price' mt='5' align='center' size='lg'>{product?.price} €</Heading>
        </SkeletonText>

      </Box>
    </Box>
  )
}
