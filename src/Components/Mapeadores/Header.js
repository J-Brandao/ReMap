import React from 'react'
import BackArrow from '../Geral/BackArrow';

import styled from 'styled-components';

const Div = styled.div`
    margin: 40px 30px 0 30px;
`;

function Header() {
  return (
            <Div>
                <section className="row col-12 p-0 m-0">
              <BackArrow isGoingBack={false}/>
                    <span className="col-8 tituloPagina offset-2 text-center m-0 p-0">
                        Mapeadores
                    </span>
                </section>
            </Div>
  )
}

export default Header
