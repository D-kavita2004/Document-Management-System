import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Upload } from "lucide-react";

// ✅ Zod validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["PDF", "DOCX", "TXT", "XLSX"], { errorMap: () => ({ message: "Type is required" }) }),
  author: z.string().min(1, "Author is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const UploadDocuments = () => {
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
    console.log("Document Data:", data);
    // You can send this to your API/backend
  };

  return (
      <div className=" w-[80%] mx-auto max-h-[85vh] overflow-auto py-3">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto">
              
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-md">Name :</FormLabel>
                    <FormControl className="border-1 border-black">
                      <Input placeholder="Enter document name" {...field} />
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
                    <FormControl className="border-1 border-black">
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type (Select Dropdown) */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                      <div className="flex gap-3">
                          <FormLabel className="font-bold text-md">Type</FormLabel>
                          <FormControl className="border-1 border-black">
                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                              <SelectTrigger>
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
                      </div>
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
                    <FormControl className="border-1 border-black">
                      <Input placeholder="Author name" {...field} />
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
                    <FormControl className="border-1 border-black">
                      <Textarea placeholder="Optional description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-1/3 flex mx-auto bg-[#1A33A9] text-white">Submit</Button>
            </form>
          </Form>
      </div>
  );
}
export default UploadDocuments;