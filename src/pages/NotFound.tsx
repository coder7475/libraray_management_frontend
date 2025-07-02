import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background px-4"
      style={{ minHeight: "100dvh", minWidth: "100vw" }}
    >
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl text-center p-4 sm:p-8">
        <CardContent>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            Sorry, the page you are looking for doesn’t exist.
          </p>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/">Go back home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
