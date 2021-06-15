import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import picture from '../../../assets/images/signInPageAsset.png';
import Loader from '../../../components/Loader/Loader';

function SignIn() {
  const history = useHistory();
  const [visible, setVisible] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false); //quando houver resposta, isRequesting = true
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleTextInputs = (e) => {
    const { value, name } = e.target || { value: null, name: null };
    if (value && name) {
      setFormData((prevState) => {
        let obj = { ...prevState };
        obj[name] = value;
        return obj;
      });
    }
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/auth/register', formData);
    if (response) {
      setIsRequesting(true);
      setVisible(false);
      setButtonVisible(false);
      setFormVisible(false);
      setIsRequesting(false);
    }
  };

  const goToLoginPage = () => {
    history.push('/');
  };
  
  if (visible) {
    return (
      <div>
      {(isRequesting) &&  <Loader />}
        <div className="signin-page__background">
          <img className="signin-page__image-asset" src={picture}
            alt="" />

          <h1 className="signin-page__title">THEMYSCIRA</h1>

          <form
            onSubmit={submitHandler}
            className={(formVisible === true) ? "signin-page__form"
              : "signin-page__form-alt"}>
            <label htmlFor="username">
              username:
                </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="username aqui"
              onChange={handleTextInputs}
            />

            <label htmlFor="email">
              email:
                </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              placeholder="email aqui"
              onChange={handleTextInputs}
            />

            <label htmlFor="password">
              senha:
                 </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="senha aqui"
              onChange={handleTextInputs}
            />

            <button
              type="submit"
              className={(buttonVisible === true) ? "signin-page__form__submit-button"
                : "signin-page__form__submit-button-alt"}>
              criar conta
              </button>
          </form>
        </div>
      </div>
    );
  }

  return (
      <div className="signin-page__background">
        <img className="signin-page__image-asset" src={picture}
          alt="" />

        <h1 className="signin-page__title">THEMYSCIRA</h1>
        <p className="signin-page__welcome">
          Bem-vinda à comunidade! Esperamos que você se sinta
          acolhida e bastante à vontade!
          </p>
        <p className="signin-page__back-to-login" onClick={goToLoginPage}>voltar ao Login</p>
      </div>
  );
}

export default SignIn;