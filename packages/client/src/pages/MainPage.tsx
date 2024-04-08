import Intro from './partical/MainPage/Intro'
import Rectangles from './partical/MainPage/Rectangles/Rectangles'
import Specification from './partical/MainPage/Specifications'

function MainPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Intro />
      <Rectangles />
      <Specification />
    </div>
  )
}

export default MainPage
