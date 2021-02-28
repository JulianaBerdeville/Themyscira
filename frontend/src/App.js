import React from 'react'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import Form from './components/Form'
import Footer from './components/Footer'
import Posts from './components/Posts'

const PageContainer = styled.div`
    width: auto;
    height: 100vh;
    background-color: #e79e4f;
`

const ForumInfo = styled.div`
    width: auto;
    height: 100vh;
    background-color: #e8ded2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ForumInfoParagraph = styled.p`
    font-family: 'Cormorant', serif;
    font-weight: bold;
    font-size: 1.5rem;
    width: 50%;
    color: #968c83;
`

const ForumInfoTitle = styled.h2`
    font-family: 'Amiri', serif;
    font-size: 3rem;
    color: #92817a;
`

const PostsContainerScrollable = styled.div`
    height: 100vh;
    overflow: auto;
`

const PostsForm = styled.div`
    width: auto;
    height: 100vh;
    background-color: #dbcbbd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const FormContainer = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

function App () {

    return (
        <PageContainer>
            <Navbar/>
            <ForumInfo>
                <ForumInfoTitle>Seja bem-vindx!</ForumInfoTitle>
                <ForumInfoParagraph>
                    Este espaço virtual foi elaborado de forma a representar um ambiente 
                    seguro e de livre-expressão, voltado à vítimas de violência doméstica 
                    e aqueles que lutam ativamente contra este tipo de abuso.
                    <br></br>
                    <br></br>
                    Sinta-se à vontade para compartilhar seus pensamentos e vivências. 
                    Você <b>não</b> é obrigado a compartilhar seu nome. 
                    <br></br>
                    <br></br>
                    <b>Não</b> compartilhe informações pessoais que possam comprometer
                    sua integridade e/ou privacidade, tais como número de telefone, CPF,
                    senhas de cartões de crédito/débito etc. 
                    <br></br>
                    Essas informações <b>não</b> são solicitadas pela plataforma em nenhum momento. 
                </ForumInfoParagraph>
            </ForumInfo>
            <PostsContainerScrollable>
                <Posts/>
            </PostsContainerScrollable>
            <PostsForm>
                <FormContainer>
                    <Form/>
                </FormContainer>
            </PostsForm>
            <Footer credits="Juliana Berdeville - copyright - 2020"/>
        </PageContainer>
    )
}

export default App;