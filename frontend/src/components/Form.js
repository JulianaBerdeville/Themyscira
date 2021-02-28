import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import qs from 'qs'

const Form = styled.form`
   width: auto;
   height: auto;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`

const PostHeader = styled.h3`
    font-size: 3rem;
    font-family: 'Cormorant', serif;
    color: #92817a;
    text-align: center;
`

const FormInput = styled.input`
    width: 40vw;
    height: 3vw;
    border: none;
    background-color: #a0c1b8;
    margin-bottom: 5px;
`

const FormTextArea = styled.textarea`
    width: 40vw;
    height: 8vw;
    border: none;
    background-color: #a0c1b8;

`

const FormSubmitButton = styled.button`
    border: 4px solid #a0c1b8;
    padding: 10px;
    background-color: inherit;
    text-align: center;
    color: #92817a;
    font-size: 1rem;
        :hover{
            background-color: #a0c1b8;
            border-color: #92817a; 
            color: a0c1b8;
            transition: 1.5s;
        }
`

function FormComponent(){
    
    const baseURL = 'http://localhost:3456/createPost'
    
    const [form, setForm] = useState({postUsername: '', postTitle: '', postContent: '', postImageUrl: ''}, )
    
    const handleChange = (event) => {
      setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit =  (event) => {
         event.preventDefault()
    
        axios({
            method: 'post',
            url: baseURL,
//          headers: { 'Content-Type': 'multipart/form-data' },
            data: {
                username: form.postUsername,
                title: form.postTitle,
                content: form.postContent,
                imageURL: form.postImageURL
            }
        })
          .then(response => {
              console.log('Body passado pelo Axios: ', response.data)
                console.log('POST request done successfuly: ', response)
                alert('Post criado com sucesso!')
            })
          .catch((error) => console.log(error.response) );   
    }


    return(
        <div>
            <PostHeader>Interaja com a comunidade:</PostHeader>
            <Form onSubmit={handleSubmit}>
                <FormInput type="text" placeholder="informe seu nome de usuário" name={'postUsername'} onChange={handleChange} value={form.postUsername}></FormInput>
                <br></br>
                <FormInput type="text" placeholder="dê a seu post um título" onChange={handleChange} value={form.postTitle} name={'postTitle'}></FormInput>
                <br></br>
                <FormInput type="url" placeholder="adicione, se quiser, uma imagem (URL)" onChange={handleChange} value={form.postImageURL} name={'postImageURL'}></FormInput>
                <br></br>
                <FormTextArea placeholder="e agora? sobre o que vamos falar?" rows="3" onChange={handleChange} value={form.postContent} name={'postContent'}></FormTextArea>
                <br></br>
                <FormSubmitButton type="submit">postar!</FormSubmitButton>
            </Form>
        </div>
    )
}

export default FormComponent