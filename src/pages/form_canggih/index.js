import React, { useEffect, useState } from "react";

import { Box, Button, FormControl, FormLabel, Input, Select, SimpleGrid, Textarea, useToast} from '@chakra-ui/react';


const FormCanggih = () => {
  const toast = useToast()

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [address, setAddress] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [resume, setResume] = useState('');
  const [picture, setPicture] = useState(null);
  const [isTriggerSave, setIsTriggerSave] = useState(false);

  useEffect(() => {
    // get data from localStorage
    const data = JSON.parse(localStorage.getItem('data-form-canggih'));
    if (data) {
      setName(data.name);
      setAge(data.age);
      setMaritalStatus(data.maritalStatus);
      setAddress(data.address);
      setJobTitle(data.jobTitle);
      setResume(data.resume);
      setPicture(data.picture);
    }
    
    // interval save form data to server
    const interval = setInterval(() => {
      handleSubmit();
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // set interval to save form data to localStorage
    const debounceTimeout = setTimeout(() => {
      localStorage.setItem('data-form-canggih', JSON.stringify({
        name,
        age,
        maritalStatus,
        address,
        jobTitle,
        resume,
        picture,
      }));

      toast({
        title: 'Form telah tersimpan otomatis.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }, 1000 * 15);

    return () => {
      clearTimeout(debounceTimeout);
    }
  }, [address, age, jobTitle, maritalStatus, name, picture, resume, toast, isTriggerSave]);

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setIsTriggerSave(true);
    // save to localStorage first
    localStorage.setItem('data-form-canggih', JSON.stringify({
      name,
      age,
      maritalStatus,
      address,
      jobTitle,
      resume,
      picture,
    }));

    // then send to server and check if offline
    if (navigator.onLine) {
      // send to server
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          name,
          age,
          maritalStatus,
          address,
          jobTitle,
          resume,
          picture,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      toast({
        title: 'Form telah tersimpan otomatis.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
    else {
      toast({
        title: 'Tidak ada koneksi internet. Form akan tersimpan otomatis.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }
    setIsTriggerSave(false);
  }

  return (
    <Box maxWidth={600}>
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={1} spacing={2}>
          <FormControl id="name">
            <FormLabel>Nama</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          
          <FormControl id="age" w={150}>
            <FormLabel>Usia (tahun)</FormLabel>
            <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </FormControl>
          
          <FormControl id="marital-status" w={200}>
            <FormLabel>Status Perkawinan</FormLabel>
            <Select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
              <option value="belum_menikah">Belum Menikah</option>
              <option value="menikah">Menikah</option>
            </Select>
          </FormControl>
          
          <FormControl id="address">
            <FormLabel>Alamat</FormLabel>
            <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </FormControl>

          <FormControl id="job-title" w={350}>
            <FormLabel>Pekerjaan</FormLabel>
            <Input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </FormControl>
          
          <FormControl id="resume">
            <FormLabel>Ringkasan Kehidupan</FormLabel>
            <Textarea value={resume} onChange={(e) => setResume(e.target.value)} />
          </FormControl>
          
          <FormControl id="picture">
            <FormLabel>Picture</FormLabel>
            <Input type="file" onChange={(e) => {
              const file = e.target.files[0];
              setPicture(file);
              console.log(file);
            }} />
          </FormControl>

          <Button type="submit" mt={10}>Simpan</Button>
        </SimpleGrid>
      </form>
    </Box>

  )
}

export default FormCanggih;