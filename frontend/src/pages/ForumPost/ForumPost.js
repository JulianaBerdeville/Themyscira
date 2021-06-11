import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

function ForumPost() {
  const history = useHistory();
  const [visible, setVisible] = useState(true);
  const [formDisplayed, setFormDisplayed] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  const [postId, setPostId] = useState('');

  const handleTextInputs = (e) => {
    const { name, value } = e.target || { name: null, value: null };
    if (value && name) {
      setFormData((prevState) => {
        let obj = { ...prevState };
        obj[name] = value;
        return obj;
      })
    }
  }

  const requestHeader = { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } }

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/posts/', formData, requestHeader);
    if (response) {
      setVisible(false);
      setFormDisplayed(false);
      setPostId(response.data.post._id);
      console.log('backend res --> ', response);
      console.log('submitted data --> ', formData);
    }
  }

  const goToPostHighlight = () => {
    sessionStorage.setItem('postId', postId);
    history.push('/conversa');
  }

  if (visible) {
    return (
      <div className="forum-post__background">
      <Navbar />
      <div className="forum-post__page-container">
        <h1 className="forum-post__page-container__page-header">Inicie uma conversa</h1>
        <p className="forum-post__page-container__introduction-paragraph">
          Aqui você esta livre para expressar suas opiniões ou experiências
          sobre violência doméstica contra a mulher.
          </p>
        <p className="forum-post__page-container__introduction-paragraph">
          A Themyscira é movida à debates de cunho ressignificativo.
          Queremos mudar a realidade das mulheres que sofrem violência
          doméstica através do diálogo.
           </p>

        <div className={(formDisplayed) ? "forum-post__page-container__form-container" : "forum-post__page-container__form-container-alt"}>
          <form onSubmit={submitHandler} className="forum-post__page-container__form-container__form">
            <label className="forum-post__page-container__form-container__form__post-label">Título: </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleTextInputs}
              placeholder="Informe o título do seu post aqui"
              className="forum-post__page-container__form-container__form__post-input" />

            <label className="forum-post__page-container__form-container__form__post-label">Conteúdo: </label>
            <textarea
              id="content"
              name="content"
              rows="10"
              cols="35"
              required
              autoComplete="on"
              spellCheck="default"
              onChange={handleTextInputs}
              placeholder="Informe o conteúdo do seu post aqui"
              className="forum-post__page-container__form-container__form__post-textarea"
            />

            <input
              type="submit"
              className="forum-post__page-container__form-container__form__send-button"
            />
          </form>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="forum-post__background">
      <Navbar />
      <div className="forum-post__page-container">
        <h1 className="forum-post__page-container__page-header">Inicie uma conversa</h1>
        <p className="forum-post__page-container__introduction-paragraph">
          Aqui você esta livre para expressar suas opiniões ou experiências
          sobre violência doméstica contra a mulher.
        </p>

        <p className="forum-post__page-container__introduction-paragraph">
          A Themyscira é movida à debates de cunho ressignificativo.
          Queremos mudar a realidade das mulheres que sofrem violência
          doméstica através do diálogo.
        </p>

        <p onClick={goToPostHighlight} className="forum-post__page-container__go-to-post-highlight">
          Seu post foi publicado com sucesso! Clique aqui para vê-lo.
        </p>
      </div>
    </div>
  );
}

export default ForumPost;
