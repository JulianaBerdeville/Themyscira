/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';


function ForumTopic() {
    const postId = sessionStorage.getItem('postId');
    const userToken = localStorage.getItem('userToken');

    const [isLoading, setIsLoading] = useState(true);
    const [votesVisible, setVotesVisible] = useState(true);
    const [alertVisible, setAlertVisible] = useState(true);


    const [postData, setPostData] = useState();
    const [commentsData, setCommentsData] = useState();

    const [formData, setFormData] = useState({ content: '' });


    const handleTextInputs = (e) => {
        const { name, value } = e.target || { name: null, value: null };
        if (name && value) {
            setFormData((prevState) => {
                let obj = { ...prevState };
                obj[name] = value;
                return obj;
            });
        }
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        let response = await axios.post(`http://localhost:5000/comments/${postId}`, formData, { headers: { Authorization: "Bearer " + userToken } });
        if (response) {
            setAlertVisible(false);
            console.log(response)
        }
    };

    const showComments = () => {
        setVotesVisible(false);
    };

    const ButtonVisible = () => {
        setVotesVisible(true);
    };

    const getApiData = async () => {
        const postResponse = await axios.get(`http://localhost:5000/posts/${postId}`, { headers: { Authorization: "Bearer " + userToken } });
        const commentsResponse = await axios.get(`http://localhost:5000/comments/${postId}`, { headers: { Authorization: "Bearer " + userToken } });

        if (postResponse.data && commentsResponse.data) {
            setCommentsData(commentsResponse.data);
            setPostData(postResponse.data.post);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getApiData();
    }, []);


    if (isLoading) {
        return (
            <div className="forum-topic__background">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
        );
    }


    return (
        <div className="forum-topic__background">
            <div
                className={(alertVisible)
                    ? "forum-topic__submit-alert"
                    : "forum-topic__submit-alert-alt"
                }>
                Seu comentário foi publicado com sucesso!
                </div>
            <Navbar />
            <div className="forum-topic__page-container">

                <div className="forum-topic__post-container">
                    <h2 className="forum-topic__post-container__post-title">
                              { postData.title }  
                        </h2>
                        
                        <p className="forum-topic__post-container__post-content">
                              { postData.content } 
                        </p>

                        <p className="forum-topic__post-container__post-author">
                          por <span className="forum-topic__post-container__post-author__name">
                                 { postData.author[0].username }
                              </span>
                        </p>
    
                </div>

                <hr className="forum-topic__horizontal-line"></hr>

                <div className="forum-topic__comments-container">

                    <div className="forum-topic__comments-container__left-container">
                        <div className={(votesVisible)
                            ? "forum-topic__comments-container__left-container__votes-wrapper"
                            : "forum-topic__comments-container__left-container__votes-wrapper-alt"
                        }>
                            {(!postData.comments.length)
                                ? <> </>
                                :
                                <>
                                    <span className="forum-topic__comments-container__left-container__votes-wrapper__number">
                                        {
                                            postData.comments.length
                                        }
                                    </span>
                                    <span className="forum-topic__comments-container__left-container__votes-wrapper__title">
                                        respostas
                                </span>
                                </>
                            }
                        </div>
                    </div>
                    <div className={(votesVisible)
                        ? "forum-topic__comments-container__right-container"
                        : "forum-topic__comments-container__right-container-alt"
                    }>
                        <p className={(votesVisible)
                            ? "forum-topic__comments-container__right-container__content"
                            : "forum-topic__comments-container__right-container__content-alt"
                        }>
                            {(!postData.comments.length)
                                ? <span> Este post ainda não tem comentários </span>
                                :
                                <>
                                    <span className="forum-topic__comments-wrapper">
                                        <span className="forum-topic__comments-wrapper__comment-username">
                                            {commentsData.commentFromThisPost[0].author[0].username}
                                        </span>
                                        :
                                        <span className="forum-topic__comments-wrapper__comment-content">
                                            {commentsData.commentFromThisPost[0].content}
                                        </span>
                                        <br></br>
                                    </span>
                                    <br></br>
                                </>
                            }
                        </p>

                        {(!postData.comments.length)
                            ? <></>
                            :
                            <button
                                type="button"
                                onClick={showComments}
                                className={(votesVisible)
                                    ? "forum-topic__comments-container__right-container__other-responses-button"
                                    : "forum-topic__comments-container__right-container__other-responses-button-alt"
                                }>
                                Visualizar outras respostas
                            </button>
                        }
                    </div>

                    <div className={
                        (votesVisible)
                            ? "forum-topic__show-comments"
                            : "forum-topic__show-comments-alt"
                    }>
                        {postData.comments.map(comment => (
                            <div key={postData.comments_id}>
                                <span className="forum-topic__comments-wrapper">
                                    <span className="forum-topic__comments-wrapper__comment-username">
                                        {comment.author[0].username}
                                    </span>
                                        :
                                        <span className="forum-topic__comments-wrapper__comment-content">
                                        {comment.content}
                                    </span>
                                    <br></br>
                                </span>
                                <br></br>
                            </div>
                        ))}
                        <button className={
                            (votesVisible)
                                ? "forum-topic__return-button"
                                : "forum-topic__return-button-alt"}
                            onClick={ButtonVisible}
                        >
                            voltar
                            </button>
                    </div>

                </div>

                <form
                    onSubmit={submitHandler}
                    className="forum-topic__response-container">
                    <hr className="forum-topic__response-container__horizontal-line"></hr>

                    <textarea
                        id="content"
                        name="content"
                        rows="10"
                        cols="30"
                        required
                        autoComplete="on"
                        spellCheck="default"
                        onChange={handleTextInputs}
                        className="forum-topic__response-container__content"
                        placeholder="Tem algo a comentar?">
                    </textarea>

                    <input
                        type="submit"
                        className="forum-topic__response-container__send-button" />
                </form>
            </div>
        </div>
    );
}

export default ForumTopic;