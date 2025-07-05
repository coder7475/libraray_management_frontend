import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCreateBookMutation } from "@/services/books";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IBook } from "@/services/types";
import { createBookSchema } from "@/validators/CreateBookSchema";
import { Loader2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function CreateBookPage() {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();
  const form = useForm<IBook>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });

  const onSubmit = async (data: IBook) => {
    try {
      await createBook({
        ...data,
        copies: Number(data.copies),
      }).unwrap();

      toast("Book created successfully!");

      navigate("/books");
    } catch (error: unknown) {
      console.error(error);
      const message = "Failed to create book.";
      toast(message, { description: "Error", className: "text-red-600" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center px-2 py-8">
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-primary tracking-tight">
            Add New Book
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              autoComplete="off"
            >
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Book title"
                        {...field}
                        className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Author
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Author name"
                        {...field}
                        className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Genre */}
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Genre
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FICTION">Fiction</SelectItem>
                        <SelectItem value="NON_FICTION">Non Fiction</SelectItem>
                        <SelectItem value="SCIENCE">Science</SelectItem>
                        <SelectItem value="HISTORY">History</SelectItem>
                        <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                        <SelectItem value="FANTASY">Fantasy</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ISBN */}
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      ISBN
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ISBN number"
                        {...field}
                        className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Short description"
                        {...field}
                        className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary min-h-[80px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Copies */}
              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Copies
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        value={field.value}
                        onChange={(e) => {
                          const copies = Number(e.target.value);
                          field.onChange(copies);
                          form.setValue("available", copies > 0);
                        }}
                        className="rounded-lg border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Available */}
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="text-lg font-semibold mb-0">
                      Available
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Submit */}
              <div className="pt-4 flex justify-center">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  )}
                  Add Book
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
