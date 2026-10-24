import type { Metadata } from "next";
import { BooksSection } from "@/components/sections/books";
import { getAllBooks } from "@/lib/books";

export const metadata: Metadata = { title: "Books" };

export default function BooksPage() {
  const books = getAllBooks();
  return (
    <div className="pt-20 min-h-screen">
      <BooksSection books={books} />
    </div>
  );
}
