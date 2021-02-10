import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import '../../Styles/Perfil.css';
import {Carousel} from 'react-bootstrap';
import imgCarousel1 from '../../Images/ImgCarousel1.jpg';
import imgCarousel2 from '../../Images/ImgCarousel2.jpg';
import Perfil from '../../Images/Perfil.jpg';

function DetalhesSeccao (props) {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

    const CommentPicture = styled.div`
      margin: 0 auto;
      background-image: url(${Perfil});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-radius: 50%;
      min-height: 70px;
      width: 70px;
    `;  

    return(
        <div className="row col-12 m-0 p-0">
            {props.tipo === 'Edifícios Adicionados' ?
            <Carousel className="imgCarousel mb-0" activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                        className="d-block imgCarousel"
                        src={imgCarousel1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block imgCarousel"
                        src={imgCarousel2}
                        alt="Second slide"
                    />
                </Carousel.Item>
            </Carousel>
            :
            props.tipo === 'Sugestões' ?
            <>
                <span className="col-3 p-0">
                    <CommentPicture/>
                </span>
                <span className="col-9 pr-0">
                    <p className="NomeComments">Pedro Alves</p>
                    <p className="textoComments">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </span>
            </>
            :
            props.tipo === 'Fotografias' ?
            <Carousel className="imgCarousel mb-0" activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                        className="d-block imgCarousel"
                        src={imgCarousel1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block imgCarousel"
                        src={imgCarousel2}
                        alt="Second slide"
                    />
                </Carousel.Item>
            </Carousel>
            :
            <>
                <span className="col-3 p-0">
                    <CommentPicture/>
                </span>
                <span className="col-9 pr-0">
                    <p className="NomeComments">Pedro Alves</p>
                    <p className="textoComments">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </span>
            </>
            }
        </div> 
    )
}

export default DetalhesSeccao