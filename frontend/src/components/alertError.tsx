import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

interface AlertErrorProps {
  children: React.ReactNode;
}

export function AlertError({ children }: AlertErrorProps) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4 mb-4">
      <Alert variant="destructive">
        <AlertDescription>
          <p>{children}</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
