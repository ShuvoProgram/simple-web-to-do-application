"use client"

import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../store/reducers';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Textarea,
  Button,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import { DeleteIcon, DownloadIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const TaskItem = ({ tasks }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  const [currentTask, setCurrentTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Number of tasks per page

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handleShowModal = (task) => {
    setCurrentTask(task);
    setTitle(task.title);
    setDescription(task.description);
    onOpen();
  };

  const handleCloseModal = () => {
    setCurrentTask(null);
    setTitle('');
    setDescription('');
    onClose();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editTask({ id: currentTask.id, title, description }));
    toast({
      position: 'top-right',
      title: 'Task Edited.',
      description: "I've edited the existing task.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    handleCloseModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    toast({
      position: 'top-right',
      title: 'Task Deleted.',
      description: "The task has been deleted.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = tasks.slice(startIndex, startIndex + tasksPerPage);

  return (
    <div className="border p-4 rounded-md shadow-sm">
      <TableContainer>
        <Table variant='simple'>
          <Thead >
            <Tr >
              <Th className='dark:text-white'>Title</Th>
              <Th className='dark:text-white'>Description</Th>
              <Th className='dark:text-white' isNumeric>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentTasks.map((task) => (
              <Tr key={task.id}>
                <Td className='dark:text-white'>{task.title}</Td>
                <Td className='dark:text-white'>{task.description}</Td>
                <Td isNumeric>
                  <Tooltip label='Edit Task' placement='top'>
                    <EditIcon
                      onClick={() => handleShowModal(task)}
                      className='cursor-pointer mr-4'
                      color='green.500'
                    />
                  </Tooltip>
                  <Tooltip label='Delete Task' placement='top'>
                    <DeleteIcon
                      onClick={() => handleDelete(task.id)}
                      className='cursor-pointer'
                      color='red.500'
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <div className="flex justify-between mt-4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">Page {currentPage} of {totalPages}</span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      {currentTask && (
        <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
          <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
          />
          <ModalContent className='dark:bg-gray-900'>
            <ModalHeader className='text-center dark:text-white'>Edit Task</ModalHeader>
            <ModalBody>
              <form onSubmit={handleEdit} className="space-y-4">
                <div>
                  <Input
                    value={title}
                    className='dark:text-white'
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title'
                    size='md'
                    required
                  />
                </div>
                <div>
                  <Textarea
                    value={description}
                    className='dark:text-white'
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Description'
                    required
                  />
                </div>
                <Button
                  type="submit"
                  leftIcon={<DownloadIcon />}
                  colorScheme='teal'
                  variant='solid'
                >
                  Save
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default TaskItem;