'use client';
import { Button, Flex, Switch } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <Flex alignItems='flex-end' justifyContent='flex-end' className='my-4'>
      <Button variant='outline' className='bg-gray-200 dark:bg-white' colorScheme='teal' size='sm' onClick={toggleTheme}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</Button>
   
    </Flex>
  );
};

export default ThemeToggle;
