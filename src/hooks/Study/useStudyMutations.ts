import { deleteStudy } from "@/actions/Study/delete-study.action";
import { uploadStudy } from "@/actions/Study/upload-study.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useStudyMutations = () => {
    const queryClient = useQueryClient();

    const uploadStudyMutation = useMutation({
        mutationFn: uploadStudy,
        onSuccess: (study, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['studiesByUserId'] });
            console.log("Patient created", study, variables, context);
        },

        onError: (error, variables, context) => {
            console.log("Error creating patient", error, variables, context);
        },
    });

    const deleteStudyMutation = useMutation({
        mutationFn: (id: number) => deleteStudy(id),
        onSuccess: (patient, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['studiesByUserId'] })
            console.log("Patient deleted", patient, variables, context);
        },
        onError: (error, variables, context) => {
            console.log("Error deleting patient", error, variables, context);
        },
    });

    return { uploadStudyMutation, deleteStudyMutation };
};
