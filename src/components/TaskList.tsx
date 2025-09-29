import { TaskItem } from "./TaskItem";
import type { Task } from "./TaskManager";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => Promise<void>;
  onEdit: (id: string, newTitle: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function TaskList({ tasks, onToggle, onEdit, onDelete, isLoading }: TaskListProps) {
  return (
    <div className="space-y-3 animate-slide-up">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <TaskItem
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        </div>
      ))}
    </div>
  );
}