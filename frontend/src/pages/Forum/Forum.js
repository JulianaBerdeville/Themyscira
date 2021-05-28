/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';

function Forum() {
  const [formData, setFormData] = useState();
  const [isReady, setIsReady] = useState(false);
  let history = useHistory();
  var postsDates = [];
  var postsResponses = [];
  var postVotes = [];
  var sortedPosts = [];

  const goToSelectedForumTopic = (e) => {
    const { id } =  e.target;
    sessionStorage.setItem('postId', id);
    history.push('/conversa');
  }
  const bearerToken = `Bearer ${localStorage.getItem('userToken')}`;

  useEffect(() => {
    axios.get('http://localhost:5000/posts/', { headers: { 'Authorization': bearerToken}})
    .then((res) => {
      setFormData(res.data);
      setIsReady(true);
    })
    .catch((error) => {
      console.error(error);
    })
  }, []);

  if (!isReady) {
    return (
      <Loader />
    );
  }

  return (
      <div className="forum__background">
        <Navbar />

        <h1 className="forum__title">Rodas de conversa</h1>

        <hr className="forum__horizontal-line"></hr>

      {formData.posts.map(post => (
        <div key={post._id}>
          <div className="forum__posts-container">
            <div className="forum__posts-container__left-container">
              <div className="forum__posts-container__left-container__votes-wrapper">
                <span className="forum__posts-container__left-container__votes-wrapper__title">votos</span>
                <span className="forum__posts-container__left-container__votes-wrapper__number">{post.votes ? post.votes : 0}</span>
              </div>
              <div className="forum__posts-container__left-container__response-wrapper">
                <span className="forum__posts-container__left-container__response-wrapper__number">{post.comments ? post.comments.length : 0}</span>
                <span className="forum__posts-container__left-container__response-wrapper__title">respostas</span>
              </div>
            </div>
            <div className="forum__posts-container__right-container">
              <h2 onClick={(e) => goToSelectedForumTopic(e)} id={post._id} className="forum__posts-container__right-container__title">
                {
                  post.title
                }
              </h2>
              <p className="forum__posts-container__right-container__content">
              {post.content}
              </p>

              <p className="forum__posts-container__right-container__post-date">
              {post.CreatedAt.slice(0,10)}
              </p>
            </div>
          </div>
          <hr className="forum__horizontal-line"></hr>
        </div>
      ))}
      </div>
  );
}

export default Forum;