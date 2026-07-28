import { useMutation, useQuery} from "react-query";
import { api } from "../services/user.service";
import type { User } from "../types/user.type";

export function useGetUsers(){
    const { data, isFetching, isError } = useQuery({
        queryKey: ['user-list'],
        queryFn: () => api.getUsers(),
        staleTime: 4000,
    });

    return {data, isLoading: isFetching, isError};
}

export function useEditUser(){
    
    return useMutation({
        mutationFn: ({ user, value }: { user: User, value: string }) =>
            api.updateUserName(user.id, value),
        onError: (error) => {
            console.error("Erro ao editar usuário: ", error);
        },
    });
}

export function useDeleteUser(){
   
    return useMutation({
        mutationFn: ({ user }: { user: User }) =>
            api.deleteUser(user.id),
        onError: (error) => {
            console.error("Erro ao editar usuário: ", error);
        },
    });
}

export function useGetUserDetail(userName: string){
    const { data, isFetching, isError } = useQuery({
        queryKey: ['user-detail', userName],
        queryFn: () => api.getUserDetails(userName),
        staleTime: 4000,
        enabled: !!userName
    });

    return {data, isLoading: isFetching, isError};
}