import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

function ContactUs() {
    const [visible, setVisible] = useState(true);
    const [formVisible, setFormVisible] = useState(true);
    const [paragraphVisible, setParagraphVisible] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: ''
    });

    const handleTextInputs = (e) => {
        const { name, value } = e.target || { name: null, value: null };
        if (name && value) {
            setFormData((prevState) => {
                let obj = { ...prevState };
                obj[name] = value;
                return obj;
            })
        }
    }

    const requestHeader = { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } }

    let userEmail = sessionStorage.getItem('userEmail');
    formData.email = userEmail;

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/contact-us', formData, requestHeader);
        if (response) {
            setVisible(false);
            setFormVisible(false);
            setParagraphVisible(false);
            console.log('backend res --> ', response);
            console.log('sent data --> ', formData);
        }
    }

    if (visible) {
        return (
            <div className="contact-us__background">
            <Navbar />

            <h1 className="contact-us__title">Fale com a gente</h1>

            <hr className="contact-us__horizontal-line"></hr>

            <p className={(paragraphVisible) ? "contact-us__page-description" : "contact-us__page-description-alt"}>
                Reservamos esse espaço da página para que os usuários possam entrar
                em contato conosco sobre diversos assuntos -- sejam sugestões,
                reclamações ou reportar ações inadequadas.
                    </p>

            <form onSubmit={submitHandler} className={(formVisible) ? "contact-us__form-container" : "contact-us__form-container-alt"}>
                <label className="contact-us__form-container__label">nome:</label>
                <input
                    id="name"
                    name="name"
                    placeholder="seu nome aqui"
                    onChange={handleTextInputs}
                    required
                    className="contact-us__form-container__input" />


                <label className="contact-us__form-container__label">mensagem:</label>
                <textarea
                    id="content"
                    name="content"
                    placeholder="sua mensagem aqui"
                    onChange={handleTextInputs}
                    className="contact-us__form-container__textarea" rows="5" />

                <button type="submit" className="contact-us__form-container__submit-button">enviar</button>
            </form>
        </div>
        );
    }

    return (
        <div className="contact-us__background">
            <Navbar />

            <h1 className="contact-us__title">Fale com a gente</h1>

            <hr className="contact-us__horizontal-line"></hr>

            <p className={(paragraphVisible) ? "contact-us__page-description" : "contact-us__page-description-alt"}>
                Recebemos sua mensagem e em breve retornaremos o contato.
            </p>

            <p className={(paragraphVisible) ? "contact-us__page-description" : "contact-us__page-description-alt"}>
                Obrigada por entrar em contato! 
            </p>

            
        </div>
    );
}

export default ContactUs;