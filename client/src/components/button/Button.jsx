import styled from "styled-components";

const ButtonContainer = ({ className, children, ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export const Button = styled(ButtonContainer)`
user-select: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: ${({ width = "100%" }) => width};
  height: 32px;

  border: 1px solid #eee;
  background-color: #816170;
  border-radius: 5px;

  color: #eee;
  
  transition: background 1s cubic-bezier(0.53, -0.04, 0.75, 0.72), 
              border 1s cubic-bezier(0.53, -0.04, 0.75, 0.72);

&:hover {
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
 
  border: none;
  background: linear-gradient(
    90deg,
    #846573 0%,
    #ec4c4c 53.38%,
    #f7aa47 100%
  );
  
}
`;