import { 
  Heading,
  Text,
  Flex,
  useToast,
  Button,
  Tooltip
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'

import { CopyIcon } from '@chakra-ui/icons'

export default function Home() {
  const toast = useToast()
  const [location, setLocation] = useState([]);
  console.log(location);

  async function getIp() {
    try {
      const res = await fetch('https://ipapi.co/json/')
      const data = await res.json()

      console.log(data)
      setLocation(data)
    } 
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#483C67';
    getIp();
  }, [])

  const handleClick = () => {
    navigator.clipboard.writeText(location.ip);

    toast({
        title: 'Copiado para a área de transferência',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
  }
  
  return (
    <>
    <Flex 
      height='100vh' 
      alignItems='center' 
      justifyContent='center' 
      fontSize='2xl'
      textAlign='center'
      >
        <Flex 
          direction='column' 
          background='gray.100' 
          p='12' 
          rounded='6' 
          gap='5'
          >
        <Heading color='black' paddingBottom='5'>Ip Finder</Heading>
        
        <Flex direction='row' gap='5' mb={2} justifyContent='center' textAlign='center'>
          <Text>Ipv6: {location.ip}</Text>
          <Tooltip label='Copiar'>
          <Button onClick={handleClick} colorScheme='facebook'><CopyIcon/></Button>
          </Tooltip>
        </Flex>

        <Text>Latitude: {location.latitude}</Text>
        <Text>Latitude: {location.longitude}</Text>
        <Text>Endereço: {location.city} - {location.region} ({location.country})</Text>
        <Text>Provedor: {location.org}</Text>

        </Flex>
    </Flex>
    </>
  )
}
