"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Search, Plus, FileText } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome to Notes",
      content: "This is your first note. Click 'View' to see the full content, or create a new note using the form above.",
      createdAt: new Date(),
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date(),
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                My Notes
              </h1>
              <p className="text-sm text-muted-foreground">
                {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Sidebar - Add Note Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 border-border/50 bg-card shadow-sm">
              <form onSubmit={addNote} className="p-5">
                <h2 className="mb-4 text-lg font-semibold">Create Note</h2>
                <div className="mb-3">
                  <Input
                    type="text"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-input"
                  />
                </div>
                <div className="mb-4">
                  <Textarea
                    placeholder="Content..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] resize-none border-input"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </form>
            </Card>
          </div>

          {/* Main Content - Notes List */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Notes Grid */}
            {filteredNotes.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {searchQuery ? "No notes found" : "No notes yet"}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search"
                    : "Create your first note to get started"}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredNotes.map((note) => (
                  <Card
                    key={note.id}
                    className="group overflow-hidden border-border/50 bg-card transition-all hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="p-5">
                      <h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-2">
                        {note.title}
                      </h3>
                      <p className="mb-3 text-sm text-muted-foreground line-clamp-3">
                        {note.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <time className="text-xs text-muted-foreground">
                          {note.createdAt.toLocaleDateString()}
                        </time>
                        <Link to={`/notes/${note.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:bg-primary/10"
                          >
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Welcome Tab */}
      <div className="border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <FileText className="h-5 w-5" />
            <span>Welcome to Notes - Your personal note-taking space</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
