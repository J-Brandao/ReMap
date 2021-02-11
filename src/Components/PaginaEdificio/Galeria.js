import React, {useState, useEffect} from 'react';
import {Carousel} from 'react-bootstrap';
import imgCarousel1 from '../../Images/ImgCarousel1.jpg';
import imgCarousel2 from '../../Images/ImgCarousel2.jpg';

function Galeria() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };


    return(
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
    )
}

export default Galeria;