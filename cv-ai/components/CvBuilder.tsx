"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Нэрээ заавал оруулна уу"),
  email: z.string().email("Зөв имэйл оруулна уу").or(z.literal("")),
  phone: z.string().optional(),
  skills: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CvBuilderPage() {
  const [isUploading, setIsUploading] = useState(false);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      skills: "",
    },
  });

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("AI таны CV-г уншиж байна...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/cv-extract", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error);

      const aiData = result.data;

      form.reset({
        name: aiData.name || "",
        email: aiData.email || "",
        phone: aiData.phone || "",
        skills: Array.isArray(aiData.skills)
          ? aiData.skills.join(", ")
          : aiData.skills || "",
      });

      toast.success("Мэдээллийг амжилттай ялгаж авлаа!", { id: toastId });
    } catch (err: any) {
      toast.error(`Алдаа: ${err.message}`, { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  });

  const onSubmit = (data: FormValues) => {
    toast.success("CV-ний мэдээлэл хадгалагдлаа!");
    console.log("Бэлэн болсон дата:", data);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">AI CV Үүсгэгч</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25 bg-muted/50 hover:bg-muted"
            }`}
          >
            <input {...getInputProps()} />
            {isUploading ? (
              <p className="text-primary font-medium animate-pulse">
                Уншиж байна...
              </p>
            ) : (
              <div className="text-muted-foreground">
                <p className="font-medium text-foreground">
                  Хуучин CV-гээ энд чирж оруулна уу
                </p>
                <p className="text-sm mt-1">
                  PDF эсвэл Зураг (AI автоматаар уншина)
                </p>
              </div>
            )}
          </div>

          <Card className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Овог Нэр</FormLabel>
                      <FormControl>
                        <Input placeholder="Жишээ нь: Бат-Эрдэнэ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имэйл</FormLabel>
                        <FormControl>
                          <Input placeholder="bat@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Утас</FormLabel>
                        <FormControl>
                          <Input placeholder="9900..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ур чадварууд</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="JavaScript, React, Figma..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Хадгалах
                </Button>
              </form>
            </Form>
          </Card>
        </div>

        <div className="bg-muted/30 rounded-xl border p-8 flex flex-col h-full min-h-125">
          <h2 className="text-xl font-bold border-b pb-2 mb-4">CV Загвар</h2>
          <div className="flex-1 bg-white border rounded shadow-sm p-8">
            <h1 className="text-2xl font-bold uppercase tracking-wider">
              {form.watch("name") || "ТАНЫ НЭР"}
            </h1>
            <div className="text-sm text-gray-500 mt-2 flex gap-4">
              <span>{form.watch("email") || "Имэйл хаяг"}</span>
              <span>{form.watch("phone") || "Утасны дугаар"}</span>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-gray-700 border-b pb-1">
                УР ЧАДВАРУУД
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {form.watch("skills") || "Энд таны ур чадварууд орно..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
