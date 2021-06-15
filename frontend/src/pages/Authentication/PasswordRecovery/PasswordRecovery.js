import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import picture from '../../../assets/images/passwordRecoveryAsset.png';


function PasswordRecovery() {
  const history = useHistory();
  const [visible, setVisible] = useState(true);
  const [formData, setFormData] = useState({ email: '' })
  const [formDisplayed, setFormDisplayed] = useState(true);

  const handleEmailInput = (e) => {
    const { value, name } = e.target || { value: null, name: null };
    if (value && name) {
      setFormData((prevState) => {
        let obj = { ...prevState };
        obj[name] = value;
        return obj;
      });
    }
  };

  const goToLoginPage = () => {
    history.push('/');
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/auth/forgot_password', formData);
    if (response) {
      setVisible(false);
      setFormDisplayed(false);
      localStorage.setItem('userEmail', formData.email);
    }
  }

  if (visible) {
    return (
        <div className="password-recovery__background">

          <img className="password-recovery__image-asset" src={picture}
            alt="foto de uma mulher sorrindo, com o rosto apoiado nas mãos e as mãos apoiadas nos joelhos."
          />

          <h1 className="password-recovery__title">THEMYSCIRA</h1>

          <p className="password-recovery__first-description">Recuperação de senha</p>

          <div>
            <form onSubmit={submitHandler}
              className={(formDisplayed) ? "password-recovery__form"
                : "password-recovery__form-alt"}>
            <div className="password-recovery__input-wrapper">
              <label htmlFor="email-input">email:</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="seu email aqui"
                className="password-recovery__form__email-input"
                onChange={handleEmailInput} />
            </div>

            <div className="password-recovery__input-wrapper">
              <button
                type="submit"
                className="password-recovery__form__submit-input"
              >
              enviar
              </button>
              </div>
              <p
                onClick={goToLoginPage}
                className="password-recovery__form__back-to-login">
                Voltar ao Login
              </p>
            </form>
          </div>
        </div>
    );
  }

  return (
    <div className="password-recovery__background">

      <img 
        src={picture}
        className="password-recovery__image-asset" 
        alt="foto de uma mulher sorrindo, com o rosto apoiado nas mãos e as mãos apoiadas nos joelhos."
      />

      <h1 className="password-recovery__title">THEMYSCIRA</h1>

      <p className="password-recovery__second-description">
        Enviamos um e-mail ao endereço informado com um token.
        </p>
      <p className="password-recovery__third-description">
        Utilize este token para criar uma nova senha.
        </p>

      <p
        onClick={goToLoginPage}
        className="password-recovery__back-to-login"
      >
        Voltar ao Login
        </p>

      <div className="password-recovery__footer">
        <div className="password-recovery__footer__container">
          <span className="password-recovery__footer__container__items"> CENTRO UNIVERSITÁRIO CARIOCA (UNICARIOCA)  - </span>
          <span className="password-recovery__footer__container__items">  ENTENDA SOBRE O ASSUNTO  - </span>
          <span className="password-recovery__footer__container__items"> BUSQUE AJUDA  </span>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;
