import React from 'react'
import styled from 'styled-components'

const Navbar = styled.div`
    width: 100%;
    height: 10%;
    background-color: #5eaaa8;
    display: flex;
    flex-direction: row;
`

const ForumTitle = styled.a`
    font-family: 'Cinzel', serif;
    color: #290001;
    font-size: 2rem;
    padding: 4px;
`

function NavbarComponent(){
    return(
        <div>
            <Navbar>
                <ForumTitle>Themyscira</ForumTitle>
            </Navbar>
        </div>
    )
}

export default NavbarComponent