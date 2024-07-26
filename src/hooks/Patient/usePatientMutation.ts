import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Patient } from "@/modules/patients/domain/Patient";
import { createPatient } from "@/actions/Patient/create-patient.action";
import { updatePatient } from "@/actions/Patient/update-patient.action";
import { deletePatient } from "@/actions/Patient/delete-patient.action";

export const usePatientMutations = () => {
  const queryClient = useQueryClient();

  const addPatientMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: (patient, variables, context) => {
      console.log("Patient created", patient, variables, context);
    },

    onError: (error, variables, context) => {
      console.log("Error creating patient", error, variables, context);
    },
  });

  const updatePatientMutation = useMutation({
    mutationFn: ({ id, patient }: { id: number; patient: Patient }) => updatePatient(id, patient),
    onSuccess: (patient, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      console.log("Patient updated", patient, variables, context);
    },
    onError: (error, variables, context) => {
      console.log("Error updating patient", error, variables, context);
    },
  });

  const deletePatientMutation = useMutation({
    mutationFn: (id: number) => deletePatient(id),
    onSuccess: (patient, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      console.log("Patient deleted", patient, variables, context);
    },
    onError: (error, variables, context) => {
      console.log("Error deleting patient", error, variables, context);
    },
  });

  return { addPatientMutation, updatePatientMutation, deletePatientMutation };
};
