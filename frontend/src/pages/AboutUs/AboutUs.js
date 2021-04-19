import React from 'react';

import JulianaBerdeville from '../../assets/images/JulianaBerdeville.jpeg';
import LucasViveiros from '../../assets/images/LucasViveiros.jpeg';

import Navbar from '../../components/Navbar/Navbar';

function AboutUs() {
    return (
        <>
            <div className="about-page__background">
                <Navbar />
                <h1 className="about-page__title">Sobre Themyscira:</h1>
                <p className="about-page__first-paragraph">
                    Esse espaço foi elaborado por uma dupla de graduandos em Ciência da Computação
                    com o objetivo de tornar acessível um ambiente para que a violência doméstica
                    seja debatida.
            </p>

                <p className="about-page__second-paragraph">
                    Acreditamos na capacidade transformadora do diálogo e entendemos que esta
                    seja uma forma eficaz - à longo prazo - de combater esse tipo de violência.
            </p>

                <span className="about-page__introduction--title">Prazer! Somos:</span>

                <div className="about-page__introduction__container">
                    <img src={JulianaBerdeville} alt="foto de Juliana Berdeville" className="about-page__introduction__photo-icon" />
                    <div className="about-page__introduction__info">
                        <span className="about-page__introduction__name">Juliana Berdeville</span>
                        <span>
                            <a href="https://github.com/JulianaBerdeville" className="about-page__introduction__github-link">github/JulianaBerdeville</a>
                        </span>
                    </div>
                </div>

                <div className="about-page__introduction__container">
                    <img src={LucasViveiros} alt="foto de Lucas Viveiros" className="about-page__introduction__photo-icon" />
                    <div className="about-page__introduction__info">
                        <span className="about-page__introduction__name">Lucas Viveiros</span>
                        <span>
                            <a href="https://github.com/JulianaBerdeville" className="about-page__introduction__github-link">github/JulianaBerdeville</a>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;