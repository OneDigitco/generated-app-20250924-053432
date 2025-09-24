import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Edit, Plus, Trash2, X } from 'lucide-react';
import { useTodoStore, Task, Filter } from '@/store/todoStore';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
const TaskItem = React.memo(({ task, onDelete }: { task: Task, onDelete: (id: string) => void }) => {
  const { toggleTask, updateTask } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const handleUpdate = () => {
    if (editText.trim()) {
      updateTask(task.id, editText);
      setIsEditing(false);
    }
  };
  return (
    <>
      <motion.li
        layout
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group flex items-center gap-4 rounded-lg bg-card p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
      >
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => toggleTask(task.id)}
          className="h-6 w-6 rounded-full"
        />
        {isEditing ? (
          <div className="flex flex-1 items-center gap-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
              className="h-9 flex-1"
              autoFocus
            />
            <Button size="icon" variant="ghost" onClick={handleUpdate} className="h-9 w-9">
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)} className="h-9 w-9">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <label
            htmlFor={`task-${task.id}`}
            className={cn(
              "flex-1 cursor-pointer text-lg font-medium text-foreground transition-all duration-300",
              task.completed && "text-muted-foreground line-through"
            )}
          >
            {task.text}
          </label>
        )}
        <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {!isEditing && !task.completed && (
            <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)} className="h-9 w-9">
              <Edit className="h-4 w-4" />
            </Button>
          )}
          <Button size="icon" variant="ghost" onClick={() => onDelete(task.id)} className="h-9 w-9 text-red-500 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </motion.li>
    </>
  );
});
export function HomePage() {
  const [newTask, setNewTask] = useState('');
  const { tasks, filter, addTask, setFilter, clearCompleted, deleteTask } = useTodoStore();
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    }
  };
  const completedCount = useMemo(() => tasks.filter(t => t.completed).length, [tasks]);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800 text-foreground">
      <ThemeToggle className="fixed top-6 right-6" />
      <main className="container mx-auto flex max-w-2xl flex-col px-4 py-8 md:py-12">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="font-display text-4xl font-bold md:text-5xl">Clarity</h1>
        </motion.header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="relative mb-8 flex items-center">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
              className="h-14 rounded-full bg-card py-3 pl-6 pr-16 text-lg shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 h-10 w-10 rounded-full bg-blue-600 text-white shadow-md transition-transform duration-200 hover:bg-blue-700 active:scale-95"
              aria-label="Add task"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </form>
        </motion.div>
        <motion.div
          layout
          className="flex-1"
        >
          {tasks.length > 0 ? (
            <>
              <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)} className="mb-4 flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
              <ul className="space-y-3">
                <AnimatePresence>
                  {filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} onDelete={setTaskToDelete} />
                  ))}
                </AnimatePresence>
              </ul>
              {filteredTasks.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center text-muted-foreground"
                >
                  <p className="text-lg">No tasks here. Enjoy the peace!</p>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center text-muted-foreground"
            >
              <p className="text-xl">Your list is empty.</p>
              <p>Add a task above to get started.</p>
            </motion.div>
          )}
        </motion.div>
        {tasks.length > 0 && (
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-center justify-between text-sm text-muted-foreground"
          >
            <span>{tasks.length - completedCount} items left</span>
            {completedCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCompleted} className="text-muted-foreground hover:text-foreground">
                Clear completed
              </Button>
            )}
          </motion.footer>
        )}
      </main>
      <AlertDialog open={!!taskToDelete} onOpenChange={(open) => !open && setTaskToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setTaskToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (taskToDelete) {
                  deleteTask(taskToDelete);
                  setTaskToDelete(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}