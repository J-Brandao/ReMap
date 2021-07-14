import React, {useState, useEffect} from 'react';
import {Carousel} from 'react-bootstrap';
import imgCarousel1 from '../../Images/ImgCarousel1.jpg';
import imgCarousel2 from '../../Images/ImgCarousel2.jpg';

function Galeria({fotos}) {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return(
        <Carousel className="imgCarousel mb-0" activeIndex={index} onSelect={handleSelect}>
            {fotos.map((item, key) => {
                return (
                    <>
                    {index === key ?
                    <Carousel.Item className="divCarousel">
                        <img
                            className="d-block imgCarousel"
                            src={item}
                            alt={`${key}`}
                        />
                    </Carousel.Item>
                    :
                    <></>
                    }

                    </>
                )
            })}
        </Carousel>
    )
}

export default Galeria;