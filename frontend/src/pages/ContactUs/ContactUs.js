import React from 'react';

import Navbar from '../../components/Navbar/Navbar';

function ContactUs() {
    return (
        <>
            <>
                <div className="contact-us__background">
                    <Navbar />

                    <h1 className="contact-us__title">Fale com a gente</h1>

                    <hr className="contact-us__horizontal-line"></hr>

                    <p className="contact-us__page-description">
                        Reservamos esse espaço da página para que os usuários possam entrar
                        em contato conosco sobre diversos assuntos -- sejam sugestões,
                        reclamações ou reportar ações inadequadas.
                    </p>

                    <form id="contact-us" className="contact-us__form-container">
                        <label className="contact-us__form-container__label">nome completo:</label>
                        <input className="contact-us__form-container__input" />

                        <label className="contact-us__form-container__label">email:</label>
                        <input className="contact-us__form-container__input" />

                        <label className="contact-us__form-container__label">mensagem:</label>
                        <textarea className="contact-us__form-container__textarea" rows="5" />

                        <button type="submit" className="contact-us__form-container__submit-button">enviar</button>
                    </form>
                </div>
            </>
        </>
    );
}

export default ContactUs;