import React from 'react';

import Navbar from '../../components/Navbar/Navbar'

function ForumTopic() {
    return (
        <>
            <div className="forum-topic__background">
                <Navbar />
                <div className="forum-topic__page-container">

                    <div className="forum-topic__post-container">
                        <h2 className="forum-topic__post-container__post-title">
                            Ensinando criança sobre violência doméstica:
                        </h2>
                        <p className="forum-topic__post-container__post-content">
                            Pensando em combater a violência doméstica
                            à longo prazo, como faríamos isso?

                            Trabalho como professora de história para
                            crianças da quinta série do fundamental e
                            me preocupo com sua percepção a respeito da
                            mulher, limites, controle emocional etc.

                            Como podemos reverter esta questão?
                        </p>
                    </div>

                    <hr className="forum-topic__horizontal-line"></hr>

                    <div className="forum-topic__comments-container">
                        <div className="forum-topic__comments-container__left-container">
                            <div className="forum-topic__comments-container__left-container__votes-wrapper">
                                <span className="forum-topic__comments-container__left-container__votes-wrapper__title">votos</span>
                                <span className="forum-topic__comments-container__left-container__votes-wrapper__number">1</span>
                                <span className="forum-topic__comments-container__left-container__votes-wrapper__number">2</span>
                                <span className="forum-topic__comments-container__left-container__votes-wrapper__title">respostas</span>
                            </div>
                        </div>
                        <div className="forum-topic__comments-container__right-container">
                            <p className="forum-topic__comments-container__right-container__content">
                                Acho que por meio da introdução deste assunto desde cedo. De repente esta criança é até uma vítima.
                            </p>
                            <button className="forum-topic__comments-container__right-container__other-responses-button" type="button">
                                Visualizar outras respostas
                            </button>
                        </div>
                    </div>

                    <div className="forum-topic__response-container">
                        <hr className="forum-topic__response-container__horizontal-line"></hr>
                        <textarea className="forum-topic__response-container__content"
                            placeholder="Tem algo a comentar?">
                        </textarea>
                        <button className="forum-topic__response-container__send-button" type="button">Enviar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForumTopic;