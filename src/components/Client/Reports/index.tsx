"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { PrioritySelect } from "@/components/Select/Priority/select";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ServiceSelect } from "@/components/Select/Services/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { z } from "zod";
import { ReportSchema } from "@/validators/report.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useReportStore from "@/hooks/useReport";

type FormValues = z.infer<typeof ReportSchema>;

export default function ClientReportComponent({ id }: { id: number }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(ReportSchema),
  });

  const {
    setValue,
    reset,
    control,
    formState: { errors },
  } = form;

  const handlePriorityChange = (selected: string) => {
    setValue("priority", selected);
  };

  const handleServiceChange = (selected: string) => {
    setValue("module", selected);
  };

  const { createReport } = useReportStore();

  async function onSubmit(data: z.infer<typeof ReportSchema>) {
    const dataToSend = {
      ...data,
      userId: String(id),
    };
    try {
      const requestPromise = createReport(dataToSend);
      toast.promise(requestPromise, {
        loading: "Enviando ticket...",
        success: "Ticket enviado correctamente",
        error: "Error al enviar el ticket",
      });

      await requestPromise;

      reset({
        priority: "Media",
        module: "",
        description: "",
      });
    } catch (error) {
      console.error("Error al crear el ticket", error);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-5">
      <CardHeader>
        <CardTitle>Solicitud de Soporte Técnico</CardTitle>
        <CardDescription>
          Completa el siguiente formulario para reportar un problema o solicitar
          asistencia.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Prioridad</FormLabel>
                    <FormControl>
                      <PrioritySelect
                        onPriority={handlePriorityChange}
                        control={control}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="module"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Servicio</FormLabel>
                    <FormControl>
                      <ServiceSelect
                        onService={handleServiceChange}
                        control={control}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Descripción del problema
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escribe su mensaje acá..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" variant="incor">
              Enviar solicitud
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
