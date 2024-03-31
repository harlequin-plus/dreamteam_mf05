import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './style.scss'

function Rectangles() {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({ ignoreMobileResize: true })
  useGSAP(() => {
    gsap.from('.rectangles__item', {
      y: -80,
      stagger: 0.15,
      duration: 200,
      minHeight: '400px',
      width: '40%',
      scrollTrigger: {
        trigger: '.intro-2024',
        start: 'top-=100px top',
        end: '+=1500px',
        scrub: true,
      },
    })
  })

  return (
    <div className="rectangles">
      <div className="rectangles__item rectangles__item--1"></div>
      <div className="rectangles__item rectangles__item--2"></div>
      <div className="rectangles__item rectangles__item--3"></div>
      <div className="rectangles__item rectangles__item--4"></div>
      <div className="rectangles__item rectangles__item--5"></div>
      <div className="rectangles__item rectangles__item--6"></div>
    </div>
  )
}
export default Rectangles
