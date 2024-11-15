import styled from "styled-components";

export const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AddressCard = styled.div`
  padding: 10px;
  border: 1px solid ${({ isSelected }) => (isSelected ? "#007BFF" : "#ccc")};
  border-radius: 5px;
  background-color: ${({ isSelected }) => (isSelected ? "#E6F4FF" : "#fff")};
  cursor: pointer;
  &:hover {
    border-color: #007bff;
    background-color: #f0f8ff;
  }
`;
export const FormSection = styled.div`
  flex: 1;
  max-width: 60%;
`;
export const OrderSummary = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: sticky;
  top: 18%; 
  height: fit-content;
  z-index: 1;
`;
export const SectionContact = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 -20px;
`;
export const SectionShipping = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 -20px;
`;
export const SectionSelectShipping = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 -20px;
`;
export const TabsContainer = styled.div`
  display: flex;
  gap: 35px;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 -20px;
`;
export const TabButton = styled.div`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  background-color: ${({ isActive }) => (isActive ? "#333" : "#f8f8f8")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#333")};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;