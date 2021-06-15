/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';

function Home() {

    const history = useHistory();

    const [buttonRendered, setButtonRendered] = useState(false);
    const [buttonDisplayed, setButtonDisplayed] = useState(true);

    const goToForumPage = () => {
        history.push('/conversas');
    };

    const goToAboutUsPage = () => {
        history.push('/sobre-nos');
    };

    const goToContactUsPage = () => {
        history.push('/fale-conosco');
    };

    const goToCreateTopicPage = () => {
        history.push('/criar-conversa');
    };

    const CallInOtherButtons = () => {
        if (buttonRendered) {
            return (
                <div className="homepage__menu-buttons">
                    <Button text="rodas de conversa" functionName={goToForumPage} />
                    <Button text="sobre nós" functionName={goToAboutUsPage} />
                    <Button text="fale com a gente" functionName={goToContactUsPage} />
                    <Button text="criar conversa" functionName={goToCreateTopicPage} />
                </div>
            );
        }
        return (<div></div>)
    };

    return (
            <div className="homepage__background">
                <Navbar />
                <h1 className="homepage__title">Olá!</h1>
                <p className="homepage__first-description">
                Este é um espaço <b>GRATUITO</b> elaborado
                com a intenção de proporcionar um
                amplo debate sobre a violência doméstica
                contra as mulheres.
            </p>

                <p className="homepage__second-description">
                    Aqui você não é obrigada a compartilhar
                    suas informações pessoais, principalmente 
                    dados que podem a identificar.
            </p>
                {(buttonDisplayed === true)
                    ? <div className="homepage__buttons-container"><button type="button" onClick={() => {
                        setButtonRendered(true);
                        setButtonDisplayed(false);
                    }}
                    className="homepage__buttons-container__learn-more-button"
                    > saiba mais </button> </div>
                    : <div></div>
                }
                <CallInOtherButtons />

                <div className="homepage__footer">
                    <div className="homepage__footer__container">
                        <span className="homepage__footer__container__items"> CENTRO UNIVERSITÁRIO CARIOCA (UNICARIOCA)  - </span>
                        <span className="homepage__footer__container__items">  ENTENDA SOBRE O ASSUNTO  - </span>
                        <span className="homepage__footer__container__items"> BUSQUE AJUDA  </span>
                    </div>
                </div>
            </div>
    );
}

export default Home;