import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import emptyTasksImage from "@/assets/empty-tasks.jpg";

interface EmptyStateProps {
  onAddTask: () => void;
}

export function EmptyState({ onAddTask }: EmptyStateProps) {
  return (
    <Card className="p-12 text-center animate-scale-in">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <img
            src={emptyTasksImage}
            alt="No tasks illustration"
            className="w-48 h-32 mx-auto object-cover rounded-lg shadow-md"
          />
        </div>
        
        <h3 className="text-2xl font-semibold mb-3 text-foreground">
          No tasks yet!
        </h3>
        
        <p className="text-muted-foreground mb-6 text-lg">
          Start organizing your life by creating your first task. 
          Stay productive and achieve your goals one step at a time.
        </p>
        
        <Button
          onClick={onAddTask}
          variant="gradient"
          size="lg"
          className="animate-bounce-in"
        >
          <Plus className="mr-2" />
          Create Your First Task
        </Button>
      </div>
    </Card>
  );
}