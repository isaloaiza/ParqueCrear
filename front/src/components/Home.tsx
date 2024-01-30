
import DefaultLayout from "../layout/DefaultLayout";
import React , {useState, useEffect}from "react";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import TrackVisibility from 'react-on-screen';






export const Home = () => {

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "somos ParkingLocation" ];
 

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
  
  return (
    <div>
     <  DefaultLayout >
     <section className="banner" id="home">
      <div className="Container">
        <div className="aligh-items-center">
          <div className="intento">
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Bienvenido Usuario</span>
                <h1>{`Hola! Aventureros `} <span className="txt-rotate"  data-rotate='[ "Somos ParkingLocation" ]'><span className="wrap">{text}</span></span></h1>
                  <p>¡Bienvenido a ParkingLocation! Encuentra, reserva y simplifica tu estacionamiento en segundos. Explora una variedad de parqueaderos cercanos, filtra por precios, horarios y servicios, todo para hacer tu vida más fácil. Simplifica tu rutina de estacionamiento con nosotros.</p>
                  <button onClick={() => console.log('connect')}>Ver video <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </div>
          <div className="imagen">
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src="https://th.bing.com/th/id/OIG.U8_0yhXRRVSN13JnzqE1?pid=ImgGn&w=1024&h=1024&rs=1" alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </div>
        </div>
      </div>
    </section>
    </DefaultLayout>
    </div>
  )
}

export default Home