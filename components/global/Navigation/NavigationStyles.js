import styled from 'styled-components';

export const Menu = styled.nav`
  width: 100%;
  background: lime;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const MenuItem = styled.button`
  box-sizing: border-box;
  -webkit-appearance: none;
  cursor: pointer;
  backface-visibility: hidden;
  border: none;
  background: transparent;
  border-radius: 0;
  line-height: 1;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  padding: 13px;
  z-index: 1;
  background: #fff;

  &:hover {
    background: #333;
  }
`;
