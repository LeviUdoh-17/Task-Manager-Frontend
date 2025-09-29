import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { EmptyState } from "./EmptyState";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = "all" | "completed" | "pending";

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addTask = async (title: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTask: Task = {
        id: Date.now().toString(),
        title: title.trim(),
        completed: false,
        createdAt: new Date(),
      };
      
      setTasks(prev => [newTask, ...prev]);
      setShowForm(false);
      
      toast({
        title: "Task created",
        description: "Your new task has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      
      const task = tasks.find(t => t.id === id);
      toast({
        title: task?.completed ? "Task reopened" : "Task completed",
        description: task?.completed ? "Task marked as pending." : "Great job! Task marked as completed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const editTask = async (id: string, newTitle: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? { ...task, title: newTitle.trim() } : task
        )
      );
      
      toast({
        title: "Task updated",
        description: "Task has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setTasks(prev => prev.filter(task => task.id !== id));
      
      toast({
        title: "Task deleted",
        description: "Task has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">TaskFlow</h1>
            <p className="text-white/90 text-lg">Stay organized and productive</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Add Task Section */}
        <Card className="mb-8 p-6 shadow-lg animate-slide-up">
          {!showForm ? (
            <div className="text-center">
              <Button
                onClick={() => setShowForm(true)}
                variant="gradient"
                size="lg"
                className="animate-scale-in"
              >
                <Plus className="mr-2" />
                Add New Task
              </Button>
            </div>
          ) : (
            <TaskForm
              onSubmit={addTask}
              onCancel={() => setShowForm(false)}
              isLoading={isLoading}
            />
          )}
        </Card>

        {/* Filter Tabs */}
        {tasks.length > 0 && (
          <div className="mb-6 animate-fade-in">
            <div className="flex justify-center gap-2">
              {(["all", "pending", "completed"] as FilterType[]).map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(filterType)}
                  className="capitalize"
                >
                  {filterType} ({taskCounts[filterType]})
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={deleteTask}
            isLoading={isLoading}
          />
        ) : tasks.length === 0 ? (
          <EmptyState onAddTask={() => setShowForm(true)} />
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground text-lg">
              No {filter} tasks found.
            </p>
            <Button
              variant="outline"
              onClick={() => setFilter("all")}
              className="mt-4"
            >
              View All Tasks
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}