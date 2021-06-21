import styled from 'styled-components';

export const Menu = styled.nav`
  width: 100%;
  display: grid;
  background: #fff;
  grid-template-columns: 1fr 1fr 1fr;

  box-shadow: -2px -2px 6px 2px rgb(0 0 0 / 13%), 0 3px 6px rgb(0 0 0 / 13%);
  z-index: 10;
`;

export const MenuItem = styled.a`
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
  font-weight: normal;
  width: 100%;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  padding: 20px;
  z-index: 1;
  text-decoration: none;
  color: #333;

  &:hover {
    background: #a1a1a1;
  }
`;
