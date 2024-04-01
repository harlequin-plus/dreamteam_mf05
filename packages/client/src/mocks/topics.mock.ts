import { CommentType, TopicType } from '../types'

const mockComments: CommentType[] = [
  {
    content: `у того кто шил не спросил... прошился так сказать по случаю + пару раз 
	за последние пол года ошибка катализатора загоралась,
	но люди напугали, что после прошивки катализатор точно помрет и его надо удалять, потому и спрашиваю`,
    date: new Date('2021-01-26'),
    user: {
      id: 278,
      first_name: 'Freddy',
      second_name: 'Lay',
      display_name: 'Guru',
      login: 'freddy',
      avatar: 'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
    id: 1,
  },
  {
    content: `И машиной, едущей сзади

	По теме: у меня катализатор предыдущим хозяином выбит, звук... не нравится.
	Пока катализатор не забит (что выразится в заметном падении мощности), ИМХО, лучше его не трогать.`,
    date: new Date('2021-03-26'),
    user: {
      id: 278,
      first_name: 'Freddy',
      second_name: 'Lay',
      display_name: 'Guru',
      login: 'freddy',
      avatar: 'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
    id: 2,
  },
  {
    content: `Не вижу связи

	После прошивки что то изменилось?`,
    date: new Date('2021-08-10'),
    user: {
      id: 278,
      first_name: 'Freddy',
      second_name: 'Lay',
      display_name: 'Guru',
      login: 'freddy',
      avatar:
        'https://i1.sndcdn.com/artworks-cX44g79njVzhFJPS-lLjMsw-t500x500.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
    id: 3,
  },
]

const mockToics: TopicType[] = [
  {
    name: 'Как набрать 2048?',
    comments: mockComments,
  },
]

export const getTopics = () => {
  return mockToics
}
