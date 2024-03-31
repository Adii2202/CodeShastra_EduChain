import React, { useState } from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import {
  RiDashboardFill,
  RiLogoutBoxLine,
  RiMenu5Fill,
  RiProfileFill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton = ({ url = '/', title = 'Home', onClose, handleHover }) => (
  <Link onMouseEnter={() => handleHover(title)} onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [speech, setSpeech] = useState(null);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  };

  const handleHover = text => {
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(text);
      setSpeech(msg);
      setTimeout(() => {
        speechSynthesis.cancel();
      }, 2000);
      speechSynthesis.speak(msg);
    } else {
      console.log('Speech synthesis not supported');
    }
  };

  return (
    <>
      <ColorModeSwitcher />

      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height={'12'}
        rounded={'full'}
        zIndex={'overlay'}
        position={'fixed'}
        top={'6'}
        left={'6'}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(3px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>COURSE BUNDLER</DrawerHeader>

          <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'}>
              <LinkButton
                onClose={onClose}
                url="/"
                title="Home"
                handleHover={handleHover}
              />
              <LinkButton
                onClose={onClose}
                url="/courses"
                title="Browse All Courses"
                handleHover={handleHover}
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request a Course"
                handleHover={handleHover}
              />
              <LinkButton
                onClose={onClose}
                url="/contact"
                title="Contact Us"
                handleHover={handleHover}
              />

              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2rem'}
                width={'80%'}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <LinkButton
                          onClose={onClose}
                          url="/profile"
                          title="Profile"
                          handleHover={handleHover}
                        />
                        <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine /> Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <LinkButton
                          onClose={onClose}
                          url="admin/dashboard"
                          title="Dashboard"
                          handleHover={handleHover}
                        />
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <LinkButton
                      onClose={onClose}
                      url="/login"
                      title="Login"
                      handleHover={handleHover}
                    />
                    <p>OR</p>
                    <LinkButton
                      onClose={onClose}
                      url="/register"
                      title="Sign Up"
                      handleHover={handleHover}
                    />
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
