import styled from 'styled-components';


export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const Sidebar = styled.div`
  width: 200px;
  border-right: 1px solid #ddd;
  padding: 20px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  padding: 10px 0;
  background-color: ${props => (props.active ? '#f5f5f5' : 'transparent')};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  &:hover {
    background-color: #eaeaea;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
`;
