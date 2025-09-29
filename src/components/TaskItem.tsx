import { useState } from "react";
import { Check, Edit2, Trash2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Task } from "./TaskManager";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => Promise<void>;
  onEdit: (id: string, newTitle: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function TaskItem({ task, onToggle, onEdit, onDelete, isLoading }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggle = () => {
    if (!isLoading) {
      onToggle(task.id);
    }
  };

  const handleEdit = () => {
    if (!isLoading) {
      setIsEditing(true);
      setEditTitle(task.title);
    }
  };

  const handleSave = async () => {
    if (editTitle.trim() && editTitle.trim() !== task.title) {
      await onEdit(task.id, editTitle);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
  };

  const handleDelete = () => {
    if (!isLoading && !isEditing) {
      onDelete(task.id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <Card className={cn(
      "p-4 transition-smooth hover:shadow-md group",
      task.completed && "bg-accent/30",
      isLoading && "opacity-60 pointer-events-none"
    )}>
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <div className="relative">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggle}
            disabled={isLoading || isEditing}
            className={cn(
              "h-5 w-5 transition-smooth",
              task.completed && "animate-task-complete"
            )}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              className="text-base"
              autoFocus
              onFocus={(e) => e.target.select()}
            />
          ) : (
            <div className="flex flex-col">
              <span className={cn(
                "text-base font-medium transition-smooth",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Created {task.createdAt.toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={cn(
          "flex items-center gap-2 transition-smooth",
          !isEditing && "opacity-0 group-hover:opacity-100"
        )}>
          {isEditing ? (
            <>
              <Button
                size="icon-sm"
                variant="success"
                onClick={handleSave}
                disabled={!editTitle.trim() || isLoading}
              >
                <Save className="h-3 w-3" />
              </Button>
              <Button
                size="icon-sm"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="icon-sm"
                variant="task"
                onClick={handleEdit}
                disabled={isLoading}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                size="icon-sm"
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}