import { useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import HeaderBG from '../../../../assets/intro_bg.svg'
import './style.scss'

function Intro() {
  const [isHovered, setIsHovered] = useState(false)

  /**
   * Анимации
   */
  useGSAP(() => {
    if (isHovered) {
      gsap.to('.intro-square__item--1', {
        x: 0,
        y: 0,
        opacity: 0,
      })
      gsap.to('.intro-square__item--3', {
        x: 0,
        y: 0,
        opacity: 0,
      })
    } else {
      gsap.to('.intro-square__item--1', {
        x: 30,
        y: -30,
        opacity: 1,
      })
      gsap.to('.intro-square__item--3', {
        x: -30,
        y: 30,
        opacity: 1,
      })
    }
  }, [isHovered])

  useGSAP(() => {
    gsap.to('.intro', {
      y: -100,
      opacity: 0,
      duration: 200,
      scrollTrigger: {
        trigger: '.intro-2024',
        start: 'top-=100px top',
        end: '+=1500px',
        scrub: true,
      },
    })
    gsap.from('.intro-2024__item', {
      x: -50,
      opacity: 0,
    })
    gsap.from('.intro__header', {
      delay: 0.3,
      opacity: 0,
    })
    gsap.from('.intro__subheader', {
      delay: 0.6,
      opacity: 0,
    })
    gsap.from('.intro-button-wrap', {
      delay: 0.9,
      opacity: 0,
      y: -10,
    })
    gsap.from('.intro-bg-item1', {
      delay: 2.1,
      opacity: 0,
    })
    gsap.from('.intro-bg-item2', {
      delay: 1.8,
      opacity: 0,
      y: 20,
      x: -20,
    })
    gsap.from('.intro-bg-item3', {
      delay: 1.5,
      opacity: 0,
      y: 10,
      x: -10,
    })
  })

  return (
    <div className="intro">
      <div className="container">
        <div className="intro__logo">
          <div
            className="intro-square"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="intro-square__item intro-square__item--1"></div>
            <div className="intro-square__item intro-square__item--2"></div>
            <div className="intro-square__item intro-square__item--3"></div>
          </div>
          <div className="intro-2024">
            <div className="intro-2024__item">2</div>
            <div className="intro-2024__item">0</div>
            <div className="intro-2024__item">4</div>
            <div className="intro-2024__item">8</div>
          </div>
        </div>
        <div className="intro__info">
          <h1 className="intro__header">
            Добро пожаловать в&nbsp;мир&nbsp;чисел&nbsp;и&nbsp;стратегий!{' '}
          </h1>
          <p className="intro__subheader">
            Мы рады представить вам нашу игру - "2048". <br />
            Это увлекательное погружение в мир логики, терпения
            и&nbsp;вычислений, где каждый ход может стать ключом к вашей победе.
          </p>
          <div className="intro-button-wrap">
            <Link className="intro__button" to="/">
              ИГРАТЬ
            </Link>
          </div>
        </div>
      </div>
      <div className="intro__bg intro-bg-item1">
        <img src={HeaderBG} alt="" />
      </div>
      <div className="intro__bg intro-bg-item2">
        <img src={HeaderBG} alt="" />
      </div>
      <div className="intro__bg intro-bg-item3">
        <img src={HeaderBG} alt="" />
      </div>
    </div>
  )
}

export default Intro
