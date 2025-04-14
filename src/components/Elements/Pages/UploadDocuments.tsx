import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

// ✅ Zod validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["PDF", "DOCX", "TXT", "XLSX"], {
    errorMap: () => ({ message: "Type is required" }),
  }),
  author: z.string().min(1, "Author is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const UploadDocuments = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
      type: undefined,
      author: "",
      description: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const fullData = {
      ...data,
      file: selectedFile,
    };

    console.log("Full Form Data:", fullData);

    // If sending to backend:
    // const formData = new FormData();
    // formData.append("file", selectedFile);
    // formData.append("name", data.name);
    // etc...
  };

  return (
    <div className="w-[80%] mx-auto max-h-[85vh] overflow-auto py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-lg mx-auto"
        >
          {/* File Upload */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="file" className="font-bold">Choose a Document</Label>
            <Input id="file" type="file" className="border-1 border-black dark:bg-white dark:text-black text-center"/>
          </div>


          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-md">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter document name"
                    className="border-1 border-black dark:bg-white dark:text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-md">Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="border-1 border-black dark:bg-white dark:text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex">
                <FormLabel className="font-bold text-md">Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="dark:bg-white dark:text-black border-1 border-black">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="DOCX">DOCX</SelectItem>
                      <SelectItem value="TXT">TXT</SelectItem>
                      <SelectItem value="XLSX">XLSX</SelectItem>
                    </SelectContent>
                  </Select>
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
                <FormLabel className="font-bold text-md">Author</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Author name"
                    className="border-1 border-black dark:bg-white dark:text-black"
                    {...field}
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
                <FormLabel className="font-bold text-md">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Optional description..."
                    className="border-1 border-black dark:bg-white dark:text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            className="w-1/3 flex mx-auto bg-[#1A33A9] text-white font-bold text-lg"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UploadDocuments;
