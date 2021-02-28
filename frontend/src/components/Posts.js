import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'

const PostsContainer = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #d2c6b2;
`
const PostPic = styled.img`
    max-width: 140px;
    height: auto;
    padding-top: 5px;
    border-radius: 50% 50% 50% 50%;
`

const PostTitle = styled.h3`
    font-family: 'Amiri', serif;
    font-size: 1.8rem;
    color: #92817a;
`

const PostContent = styled.p`
    font-size: 1.2rem;
    color: #3f4441;
`

const PostUsername = styled.p`
    font-size: 1rem;
    color: #92817a;
`

const PostDate = styled.p`
    font-size: 0.8rem;
    color: #4a3f35;
`
function PostsComponent(){

    const [posts, setPosts] = useState([])

    const baseURL = 'http://localhost:3456/getAllPosts'

    useEffect(()=>{ 
        async function getAllPosts () {
            const request = await axios.get(baseURL)
            console.log(request)
            setPosts(request.data)
            return request
        }
        getAllPosts()
    }, [baseURL])

    return(
        <div>
            {posts.map(post => (
                <PostsContainer key={post._id}>
                    <PostPic src={post.imageURL}></PostPic>
                    <PostTitle>{post.title}</PostTitle>
                    <PostContent>{post.content}</PostContent>
                    <PostUsername>{post.username}</PostUsername>
                    <PostDate>{post.created}</PostDate>
                </PostsContainer>
            ))}
        </div> 
    )
}

export default PostsComponent