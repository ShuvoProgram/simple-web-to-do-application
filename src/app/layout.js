"use client"
import { Provider } from 'react-redux';
import "./globals.css";
import store from "@/store/store";
import { ChakraProvider } from '@chakra-ui/react'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='dark:bg-gray-900 bg-white'>
      <ChakraProvider>
      <Provider store={store}>
      {children}
      </Provider>
      </ChakraProvider>
      </body>
    </html>
  );
}
