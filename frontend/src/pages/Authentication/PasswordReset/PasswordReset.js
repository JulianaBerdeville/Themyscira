import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import picture from '../../../assets/images/passwordResetAsset.png';


function PasswordReset() {
  const history = useHistory();
  const [visible, setVisible] = useState(true);
  const [formDisplayed, setFormDisplayed] = useState(true);
  const [formData, setFormData] = useState({
     email: '',
     token: '',
     newPassword: ''
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

  const goToLoginPage = () => {
    history.push('/');
  };
 
  const userEmail = localStorage.getItem('userEmail');
  formData.email = userEmail;


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('Submitting data --> ', formData);
    const response = await axios.post('http://localhost:5000/auth/reset_password', formData);
    if (response) {
      setVisible(false);
      setFormDisplayed(false);
    }
  };

  if (visible) {
    return (
      <div className="password-recovery__background">

        <img className="password-recovery__image-asset" src={picture}
          alt="foto de uma mulher sorrindo, vestindo um vestido azul com pequenas flores brancas."
        />

        <h1 className="password-recovery__title">THEMYSCIRA</h1>

        <p className="password-recovery__first-description">Reset de senha</p>

        <p className="password-recovery__first-description">
          Informe abaixo o token e a nova senha:
      </p>

        <form onSubmit={submitHandler}
          className={(formDisplayed) ? "password-recovery__form"
            : "password-recovery__form-alt"}>
          <label htmlFor="token">token:</label>
          <input
            id="token"
            name="token"
            type="token"
            required
            placeholder="token aqui"
            className="password-recovery__form__email-input"
            onChange={handleTextInputs}
          />

          <label htmlFor="nova-senha">nova senha:</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            placeholder="nova senha aqui"
            className="password-recovery__form__email-input"
            onChange={handleTextInputs}
          />
          <input
            type="submit"
            className="password-recovery__form__submit-input"
          />
        </form>

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

  return (
      <div className="password-recovery__background">

        <img className="password-recovery__image-asset" src={picture}
          alt="foto de uma mulher sorrindo, vestindo um vestido azul com pequenas flores brancas."
        />

        <h1 className="password-recovery__title">THEMYSCIRA</h1>

        <p className="password-recovery__first-description">Reset de senha</p>

        <p className="password-recovery__first-description">
          Informe abaixo o token e a nova senha:
        </p>
            <p className="password-recovery__second-description">
              Senha modificada com sucesso!
            </p>

            <p
              onClick={goToLoginPage}
              className="password-recovery__back-to-login">
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

export default PasswordReset;
