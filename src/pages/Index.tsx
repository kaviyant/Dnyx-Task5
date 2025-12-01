import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Notes App
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Your beautiful space for capturing thoughts and ideas
        </p>
        <Link to="/notes">
          <Button size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
