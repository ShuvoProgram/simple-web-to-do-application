"use client"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/reducers';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Textarea } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react'

const AddTask = () => {
  const toast = useToast()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ id: uuidv4(), title, description }));
    toast({
      position: 'top-right',
      title: 'Task created.',
      description: "I've created new task.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
        size='md'
        className='dark:text-white'
        required
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Description'
        className='dark:text-white'
        required
      />
      <Button type="submit" leftIcon={<AddIcon />} colorScheme='teal' variant='solid' >
        Add Task
      </Button>
    </form>
  );
};

export default AddTask;