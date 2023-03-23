import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { USERS } from '../constants/LIST_USERS';

  export default function Login() {
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
          },
        validationSchema: Yup.object({
        userName: Yup.string()
            .required("Required"),
        password: Yup.string()
            .required("Required"),
        }),
        onSubmit: (values) => {
            doLogin(values);
        },
    });
    const toast = useToast();
    const navigate = useNavigate();
    const doLogin = (values) => {
        const user = USERS.find(el => el.id === values.userName);
        if (user) {
            if (user.password === values.password) {
                if (user.roles) {
                    toast({
                        title: 'Selamat datang di KiSeratus',
                        status: 'success',
                        isClosable: true,
                        position: "top",
                    });
                    localStorage.setItem("USER", JSON.stringify(user));
                    return navigate("/");
                }
        
                if (user.roles) {
                    toast({
                        title: 'Akun Belum memiliki peran',
                        status: 'warning',
                        isClosable: true,
                        position: "top",
                    });
                    return;
                }
            }

            toast({
                title: 'ID / Password salah',
                status: 'error',
                isClosable: true,
                position: "top",
            });
            return;
        }

        toast({
            title: 'Akun tidak terdaftar',
            status: 'error',
            isClosable: true,
            position: "top",
        });
    };

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Log In</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            width={400}
            p={8}>
            <Stack spacing={10}>
              <form onSubmit={formik.handleSubmit} style={{display: "flex", flexDirection: "column", gap: "15px"}}>
                    <FormControl id="username">
                        <FormLabel>Id</FormLabel>
                        <Input 
                            type="text" 
                            name="userName" 
                            id='userName'
                            onChange={formik.handleChange}
                            value={formik.values.userName}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type="password" 
                            name="password" 
                            id='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </FormControl>
                    <Stack spacing={15}>
                        <Button
                        type='submit'
                        bg={'#19A7CE'}
                        color={'white'}
                        disabled={!(formik.isValid && formik.dirty)}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                            Sign in
                        </Button>
                    </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }