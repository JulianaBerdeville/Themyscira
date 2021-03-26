/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import picture  from '../../assets/images/homepageAsset.png';
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

    const CallInOtherButtons = () => {
        if (buttonRendered) {
            return (
                <>
                    <Button text="rodas de conversa" functionName={goToForumPage}/>
                    <Button text="sobre nós" functionName={goToAboutUsPage}/>
                </>
                );
        } 
        return (<></>)
    };

    return (
        <>
        <div className="homepage__background">
            <img className="homepage__image-asset" src={picture}
                alt="foto de uma mulher usando brincos quadrados e rosa branca adornando o ombro esquerdo"
            />
            <Navbar/>
            <h1 className="homepage__title">Olá!</h1>
            <p className="homepage__first-description">
                Este é um espaço <b>GRATUITO</b> elaborado
                com a intenção de proporcionar um 
                amplo debate sobre a violência doméstica
                contra as mulheres.
            </p>

            <p className="homepage__second-description">
                Aqui você não é obrigade a compartilhar
                seu nome em nenhuma roda de conversa
            </p>
            { (buttonDisplayed === true) ? <button type="button" onClick={() => {
                    setButtonRendered(true); 
                    setButtonDisplayed(false);
                }} 
                className="homepage__button"
                >
                    saiba mais
                </button> : <></>
            }
            <CallInOtherButtons/>
        </div>
        </>
    );
}

export default Home;