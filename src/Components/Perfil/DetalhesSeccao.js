import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import '../../Styles/Perfil.css';
import {Carousel} from 'react-bootstrap';
import imgCarousel1 from '../../Images/ImgCarousel1.jpg';
import imgCarousel2 from '../../Images/ImgCarousel2.jpg';
import Perfil from '../../Images/Perfil.jpg';
import SingleSugestao from '../PaginaEdificio/SingleSugestao'
import SingleComentario from '../PaginaEdificio/SingleComentario'
import { storage } from '../../Firebase/FbConfig';

function DetalhesSeccao (props) {

    const [index, setIndex] = useState(0);
    const [imagens, setImagens] = useState([]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
    
    useEffect(() => {
        props.edificios.map(item => {
            storage.ref('imagensEdificios').child(`${item[0].fotos[0]}`).getDownloadURL().then((url) => {
                console.log(url)
                setImagens([...imagens, url])
            })
        })
    }, [])

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
                {imagens.map(item => {
                    console.log(item)
                    return(
                        <Carousel.Item>
                            <img
                                className="d-block imgCarousel"
                                src={item}
                                alt="First slide"
                            />
                        </Carousel.Item>
                    )
                })}
            </Carousel>
            :
                props.tipo === 'Sugestões' ?
            <>
                        {props.sugestoes && props.sugestoes.length>0 &&
                            props.sugestoes.map((sugestao, index) => {
                        return <SingleSugestao sugestao={sugestao} />
                    })
                    }
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
                            {props.comentarios && props.comentarios.length>0 &&
                                props.comentarios.map((comment, index) => {
                           return <SingleComentario comment={comment} />
                         })
                    } 
            </>
            }
        </div> 
    )
}

export default DetalhesSeccao