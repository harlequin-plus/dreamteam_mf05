import Intro from './partical/MainPage/Intro'
import Rectangles from './partical/MainPage/Rectangles/Rectangles'
import Specification from './partical/MainPage/Specifications'
import { Helmet } from 'react-helmet'

function MainPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Лендинг-презентация для проекта 2048</title>
        <meta name="description" content="Описание страницы для проекта 2048" />
      </Helmet>
      <Intro />
      <Rectangles />
      <Specification />
    </div>
  )
}

export default MainPage
