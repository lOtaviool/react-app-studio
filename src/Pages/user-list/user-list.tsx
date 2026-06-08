import styled from "styled-components";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useDeleteUser, useGetUsers } from "../../hooks/user";
import type { User } from "../../types/user.type";
import UserCard from "../../components/user-card/user-card";
import UserEdit from "../../components/user-edit/user-edit";
import { Spinner } from "react-bootstrap";

const Container = styled.div`
  display: flex;
  align-items: center;
  display: grid;
  padding: 0 20px;
`;

const Head = styled.div`
    display: flex;
    gap: 4px;
    align-itens: center;
`

export default function UserList() {
    const {data, isLoading, isError} = useGetUsers();
    const {mutate} = useDeleteUser();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const queryClient = useQueryClient();
    

    const handleDelete = (user: User) =>{
        mutate(
            { user: user},
            {
                onSuccess: () => {
                    queryClient.invalidateQueries("user-list");
                    console.log("Delected with success!")
                }
            }
        );
    }

    const Row = ({ index, style }: { index: number; style: any }) => {
        if (!data) return null;

        const user = data[index];
        console.log("renderizou linha", index);

        return (
            <div style={style}>
                <UserCard
                user={user}
                onClickEdit={() => setSelectedUser(user)}
                onClickDelete={() => handleDelete(user)}
                />
            </div>
        );
    };

    return(
        <Container>
            <Head >
                <h3 style={{fontSize: '32px'}}>Lista de Usuários</h3>
            </Head>
            <br />
            {isLoading && <Spinner animation="border" />}
            {isError && <h4>Ocorreu algum problema :(</h4>}
            {/* {data?.map((user: User, index) => (
                console.log("renderizou card", index),
                <UserCard 
                    key={index}
                    user={user} 
                    onClickEdit={() => setSelectedUser(user)}
                    onClickDelete={()=> handleDelete(user)}
                />
            ))} */}
            {data && ( //Otimização para renderizar apenas os itens visíveis
                <AutoSizer>
                    {({ width }) => (
                        <List
                        height={window.innerHeight - 100}
                        width={width}
                        itemCount={data.length}
                        itemSize={200}
                        >
                        {Row}
                        </List>
                    )}
                </AutoSizer>
            )}
            {selectedUser && (
                <UserEdit
                    user={selectedUser}
                    show={!!selectedUser}
                    handleClose={() => setSelectedUser(null)}
                />
            )}
        </Container>
    )
}