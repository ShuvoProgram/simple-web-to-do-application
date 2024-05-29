"use client"

import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { useEffect, useState } from 'react';
import { setCurrentPage } from '@/store/reducers';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-4">
      <TaskItem tasks={tasks} />
    </div>
  );
};

export default TaskList;