import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TaskFormProps {
  onSubmit: (title: string) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export function TaskForm({ onSubmit, onCancel, isLoading }: TaskFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    await onSubmit(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="task-title" className="text-sm font-medium">
          Task Title
        </Label>
        <Input
          id="task-title"
          type="text"
          placeholder="Enter your task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          className="text-base"
          autoFocus
        />
      </div>
      
      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button
          type="submit"
          variant="gradient"
          disabled={!title.trim() || isLoading}
        >
          {isLoading ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Adding..." : "Add Task"}
        </Button>
      </div>
    </form>
  );
}