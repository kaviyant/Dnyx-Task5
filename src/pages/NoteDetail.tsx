"use client";

import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";

// Mock data - in a real app, this would come from state management or API
const mockNotes = [
  {
    id: "1",
    title: "Welcome to Notes",
    content: "This is your first note. Click 'View' to see the full content, or create a new note using the form above.",
    createdAt: new Date(),
  },
];

const NoteDetail = () => {
  const { id } = useParams();
  
  // In a real app, you'd fetch or find the note by id
  // For now, we'll use mock data
  const note = mockNotes.find((n) => n.id === id) || {
    id: id || "unknown",
    title: "Note Not Found",
    content: "This note doesn't exist or has been deleted.",
    createdAt: new Date(),
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/notes">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to all notes
            </Button>
          </Link>
        </div>

        {/* Note Content */}
        <Card className="overflow-hidden border-border/50 bg-card shadow-lg">
          <div className="border-b border-border/50 bg-muted/30 px-8 py-6">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {note.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time>{note.createdAt.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</time>
            </div>
          </div>
          
          <div className="p-8">
            <div className="prose prose-slate max-w-none">
              <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
                {note.content}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NoteDetail;
