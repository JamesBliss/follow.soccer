import styled from 'styled-components';
import Link from 'next/link';
import { comps } from '~/lib/config';

// styled components
const Wrapper = styled.div`
  min-height: 100%;
  overflow: auto;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Items = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;

  @media (min-width: 720px) {
    grid-gap: 64px;
    grid-template-columns: 1fr 1fr;
  }

  margin: auto;
  max-width: 1200px;
  padding: 5rem 3rem;
`;

const Item = styled.a`
  display: block;
  width: 100%;
  font-size: 24px;
  text-align: center;
  color: #fff;
  transition: opacity 0.2s;

  &:hover {
    transition: opacity 0.2s;
    opacity: 0.5;
  }

  span {
    display: block;
    font-weight: normal;
    font-size: 0.5em;
  }
`;

// exported component
const Index = () => (
  <Wrapper>
    <Items>
      {comps.map((comp) => (
        <Link key={comp.id} href={`/live/${comp.code}`} passHref>
          <Item>{comp.name}</Item>
        </Link>
      ))}
    </Items>
  </Wrapper>
);

export default Index;
