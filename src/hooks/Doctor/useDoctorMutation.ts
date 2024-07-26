import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDoctor } from "@/actions/Doctor/create-doctor.action";
import { updateDoctor } from "@/actions/Doctor/update-doctor.action";
import { Doctor } from "@/modules/doctors/domain/Doctor";
import { deleteDoctor } from "@/actions/Doctor/delete-doctor.action";

export const useDoctorMutations = () => {
  const queryClient = useQueryClient();

  const addDoctorMutation = useMutation({
    mutationFn: createDoctor,
    onSuccess: (doctor, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      console.log("OK", doctor, variables, context);
    },

    onError: (error, variables, context) => {
      console.log("Error", error, variables, context);
    },
  });

  const updateDoctorMutation = useMutation({
    mutationFn: ({ id, doctor }: { id: number; doctor: Doctor }) => updateDoctor(id, doctor),
    onSuccess: (doctor, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['doctors', variables.id] })
      console.log("OK", doctor, variables, context);
    },
    onError: (error, variables, context) => {
      console.log("Error", error, variables, context);
    },
  });

  const deleteDoctorMutation = useMutation({
    mutationFn: (id: number) => deleteDoctor(id),
    onSuccess: (doctor, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      console.log("ok", doctor, variables, context);
    },
    onError: (error, variables, context) => {
      console.log("Error deleting patient", error, variables, context);
    },
  });



  return { addDoctorMutation, updateDoctorMutation, deleteDoctorMutation };
};
