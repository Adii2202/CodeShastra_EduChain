import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/intro.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCondition from "../../assets/docs/termsAndCondition"

const Founder = () => (
  <Stack direction={('column', 'row')} spacing={['4', '16']} padding={'8'}>
    <VStack>
      <Avatar
        src="https://avatars.githubusercontent.com/u/131331573?s=96&v=4"
        boxSize={['40', '48']}
      />
      <Text children="Co-Founder" opacity={'0.7'} />
    </VStack>

    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Adii Ningule" size={['md', 'xl']} />
      <Text
        textAlign={['center', 'left']}
        children="Hi, I am a Full Stack Developer and a student"
      />
    </VStack>
  </Stack>
);

const VideoPlayer = () => (
  <Box>
    <video
      autoPlay
      loop
      muted
      controls
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      src={introVideo}
    ></video>
  </Box>
);

const TandC = ({ termsAndConditions }) => (
  <Box>
    <Heading
      size={'md'}
      children="Terms & Conditions"
      textAlign={['center', 'left']}
      my={'4'}
    />

    <Box h={'sm'} p={'4'} overflowY={"scroll"} >
      <Text
        fontFamily={'heading'}
        letterSpacing={'widest'}
        textAlign={['center', 'left']}
      >
        {termsAndConditions}
      </Text>
      <Heading my={"4"} size={"xs"} children="Refund Only Available for cancellation within 7 days" />
    </Box>
  </Box>
);

const About = () => {
  return (
    <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Founder />

      <Stack m={'8'} direction={['column', 'row']} alignItems={'center'}>
        <Text fontFamily={'cursive'} m={'8'} textAlign={['center', 'left']}>
          We are a video streaming platform with some premium courses available
          only for premium members
        </Text>

        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>

      <VideoPlayer />

      <TandC termsAndConditions={termsAndCondition} />

      <HStack my={'4'} p={'4'}>
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
          children="Payments are Secured by MetaMask"
        />
      </HStack>
    </Container>
  );
};

export default About;
