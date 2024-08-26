import { deleteStudy } from "@/actions/Study/delete-study.action";
import { uploadStudy } from "@/actions/Study/upload-study.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useStudyMutations = () => {
    const queryClient = useQueryClient();
    const uploadStudyMutation = useMutation({
        mutationFn: uploadStudy,
        onSuccess: async (study, variables, context) => {
            await queryClient.invalidateQueries({ queryKey: ['studiesByUserId'] });
            // await queryClient.invalidateQueries({ queryKey: ['allUltraSoundImages'] });
            console.log("Study created", study, variables, context);

        },

        onError: (error, variables, context) => {
            console.log("Error creating Study", error, variables, context);
        },
    });

    const deleteStudyMutation = useMutation({
        mutationFn: (id: number) => deleteStudy(id),
        onSuccess: (patient, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['studiesByUserId'] })
            // queryClient.invalidateQueries({ queryKey: ['allUltraSoundImages'] });
            console.log("Study deleted", patient, variables, context);
        },
        onError: (error, variables, context) => {
            console.log("Error deleting Study", error, variables, context);
        },
    });

    return { uploadStudyMutation, deleteStudyMutation };
};
