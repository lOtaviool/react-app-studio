import { memo } from "react";
import { Button, Image } from "react-bootstrap";
import styled from "styled-components";
import type { User } from "../../types/user.type";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin: 2px 10px;
  width: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
`;

interface Props {
  user: User;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

const UserCard = memo(({user, onClickEdit, onClickDelete}:Props) => {

    return(
        <Container role="user-card">
            <div style={{display:"flex", alignItems: "center", gap:"20px", width: "100%"}}>
                <Image roundedCircle width={100} src={user?.avatar}/>
                <h4>{user?.name}</h4>
            </div>
            <Content>
                <Button data-testid="edit-button" 
                title="Editar"
                onClick={onClickEdit} 
                style={{width:'50px'}} 
                variant="outline-dark">
                    <i className="bi bi-pencil-square"></i>
                </Button>
                <Button data-testid="delete-button" title="Deletar" onClick={onClickDelete} style={{width:'50px'}} variant="outline-dark">
                    <i className="bi bi-trash3"></i>
                </Button>
            </Content>
        </Container>
    )
})

export default UserCard;