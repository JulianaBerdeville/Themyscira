import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Footer = styled.div`
    width: 100%;
    height: 20%;
    background-color: #a0c1b8;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const Credits = styled.p`
    font-family: 'Cormorant', serif;
    font-size: 1.3rem;
    color: #f2efea;
`

class FooterComponent extends React.Component{
    render(){
        return(
            <div>
                <Footer>
                    <Credits>
                        {this.props.credits}
                    </Credits>
                </Footer>
            </div>
        )
    }
}

export default FooterComponent