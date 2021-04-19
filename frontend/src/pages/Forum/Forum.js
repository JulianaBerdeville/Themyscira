import React from 'react';
import { useHistory } from "react-router-dom";

import Navbar from '../../components/Navbar/Navbar';


function Forum() {
    let history = useHistory();

    const goToSelectedForumTopic = () => {
        history.push('/conversa');
    }
    return (
        <>
            <div className="forum__background">
                <Navbar />

                <h1 className="forum__title">Rodas de conversa</h1>

                <hr className="forum__horizontal-line"></hr>

                <div className="forum__filter-buttons-container">
                    <button type="button" className="forum__filter-buttons-container__filter-buttons">mais recentes</button>
                    <button type="button" className="forum__filter-buttons-container__filter-buttons">sem resposta</button>
                    <button type="button" className="forum__filter-buttons-container__filter-buttons">popular</button>
                </div>

                <div className="forum__posts-container">
                    <div className="forum__posts-container__left-container">
                        <div className="forum__posts-container__left-container__votes-wrapper">
                            <span className="forum__posts-container__left-container__votes-wrapper__title">votos</span>
                            <span className="forum__posts-container__left-container__votes-wrapper__number">1</span>
                        </div>
                        <div className="forum__posts-container__left-container__response-wrapper">
                            <span className="forum__posts-container__left-container__response-wrapper__number">10</span>
                            <span className="forum__posts-container__left-container__response-wrapper__title">respostas</span>
                        </div>
                    </div>
                    <div className="forum__posts-container__right-container">
                        <h3 onClick={goToSelectedForumTopic} className="forum__posts-container__right-container__title">Ensinando crianças sobre violência doméstica</h3>
                        <p className="forum__posts-container__right-container__content">
                            Pensando em combater a violência doméstica
                            à longo prazo, como faríamos isso?
                            </p>
                    </div>
                </div>
                <hr className="forum__horizontal-line"></hr>
            </div>
        </>
    );
}

export default Forum;