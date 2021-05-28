import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import picture from '../../../assets/images/logInPageAsset.png';

function LoginPage() {
  const history = useHistory();
  const [visible, setVisible] = useState(true);
  const [buttonDisplayed, setButtonDisplayed] = useState(true);
  const [paragrahDisplayed, setParagrahDisplayed] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

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

  const goToPasswordRecovery = () => {
    history.push('/recuperacao-senha');
  };

  const goToCreateAccount = () => {
    history.push('/criar-conta');
  };

  const changeState = () => {
    setParagrahDisplayed(false)
    setButtonDisplayed(false)
    setVisible(false)
  }
  

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/auth/authenticate', formData);    
    console.log('backend res --> ', response);
    console.log('sent data --> ', formData);
    if (response) {
      history.push('/home');
      sessionStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userToken', response.data.token);
    }
  }

  return (
    <div className="login-page__background">
        <img className="login-page__image-asset" src={picture}
          alt="foto de uma mulher sorrindo, com o rosto apoiado nas mãos e as mãos apoiadas nos joelhos."
        />

        <h1 className="login-page__title">THEMYSCIRA</h1>

        {(visible === true) ?
        <div>  
          <p
          className={
            (paragrahDisplayed === true) ? "login-page__first-description"
              : "login-page__first-description-alt"
          }>
            Este é um espaço <b>GRATUITO</b> elaborado
            com a intenção de proporcionar um
            amplo debate sobre a violência doméstica
            contra as mulheres.
          </p>

        <button className={(buttonDisplayed === true) ? "login-page__learn-more-button"
          : "login-page__learn-more-button-alt"}
          onClick={changeState}>
            login
          </button>

          <p 
            onClick={goToCreateAccount} 
            className="login-page__login-inputs__password-recovery">
              Não tem uma conta? Faça parte da comunidade.
            </p>
          </div>
          : 
          <div> 
          <form className="login-page__login-inputs" onSubmit={submitHandler}>
            <label htmlFor="email-input">email:</label>
            <input 
            id="email"
            name="email"
            type="email" 
            required
            placeholder="seu email aqui" 
            className="login-page__login-inputs__data-input" 
            onChange={handleTextInputs} />
            
            <label htmlFor="password-input">password:</label>
            <input 
            id= "password"
            name="password" 
            type="password" 
            required
            placeholder="sua senha aqui"
            className="login-page__login-inputs__data-input" 
            onChange={handleTextInputs} />
            
            <button type="submit" className="login-page__login-inputs__submit-input">
              login
            </button>

            <p 
            onClick={goToPasswordRecovery} 
            className="login-page__login-inputs__password-recovery">
              Esqueceu a senha?
            </p>
          </form>
          </div>
        }

        

        <div className="login-page__footer">
          <div className="login-page__footer__container">
            <span className="login-page__footer__container__items"> CENTRO UNIVERSITÁRIO CARIOCA (UNICARIOCA)  - </span>
            <span className="login-page__footer__container__items">  ENTENDA SOBRE O ASSUNTO  - </span>
            <span className="login-page__footer__container__items"> BUSQUE AJUDA  </span>
          </div>
        </div>

    </div>
  );
}

export default LoginPage;
