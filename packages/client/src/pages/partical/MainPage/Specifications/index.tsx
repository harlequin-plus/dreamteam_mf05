import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import spec1 from '../../../../assets/spec_1.svg'
import spec2 from '../../../../assets/spec_2.svg'
import spec3 from '../../../../assets/spec_3.svg'
import spec4 from '../../../../assets/spec_4.svg'
import './style.scss'

function Specification() {
  useGSAP(() => {
    gsap.from('.specification__header', {
      x: 300,
      opacity: 0,
      scrollTrigger: {
        trigger: '.rectangles',
        start: 'center+=300px center',
        end: '+=600px',
        scrub: true,
      },
    })

    gsap.from('.specification-item', {
      y: 100,
      x: 50,
      opacity: 0,
      stagger: 0.4,
      scrollTrigger: {
        trigger: '.rectangles',
        start: 'center+=300px center',
        end: '+=600px',
        scrub: true,
      },
    })
  })
  return (
    <div className="specification">
      <div className="container">
        <div className="specification__header">
          Окунись в мир стратегии с 2048
        </div>
        <div className="specification__items">
          <div className="specification-item">
            <div className="specification-item__title">
              Бесконечные
              <br />
              возможности
            </div>
            <div className="specification-item__text">
              Игра "2048" предоставляет бесконечные возможности для развития
              вашей стратегии, позволяя вам почувствовать свободу и творчество в
              каждом ходу.
            </div>
            <div className="specification-item__icon">
              <img src={spec1} alt="" />
            </div>
          </div>
          <div className="specification-item">
            <div className="specification-item__title">
              Увлекательный
              <br /> игровой процесс
            </div>
            <div className="specification-item__text">
              Погрузитесь в захватывающий мир чисел и стратегий с игрой "2048",
              где каждый ход становится ключом к вашей победе.
            </div>
            <div className="specification-item__icon">
              <img src={spec2} alt="" />
            </div>
          </div>
          <div className="specification-item">
            <div className="specification-item__title">
              Гибкая система
              <br /> управления
            </div>
            <div className="specification-item__text">
              Система управления в игре "2048" разработана для максимальной
              гибкости и контроля, позволяя вам выбирать свой собственный стиль
              игры и доминировать на игровом поле.
            </div>
            <div className="specification-item__icon">
              <img src={spec3} alt="" />
            </div>
          </div>
          <div className="specification-item">
            <div className="specification-item__title">
              Эксклюзивные <br />
              бонусы и награды
            </div>
            <div className="specification-item__text">
              Получайте эксклюзивные бонусы и награды в игре "2048", расширяйте
              свои возможности и прокладывайте путь к победе с легкостью.
            </div>
            <div className="specification-item__icon">
              <img src={spec4} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Specification
