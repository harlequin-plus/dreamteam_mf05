import { CommentType, TopicType } from '../types'
import { v4 as uuid } from 'uuid'

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
      login: 'Дмитрий Самолетов',
      avatar: 'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
    id: uuid(),
  },
  {
    content: `По теме: у меня катализатор предыдущим хозяином выбит, звук... не нравится.
	Пока катализатор не забит (что выразится в заметном падении мощности), ИМХО, лучше его не трогать.`,
    date: new Date('2021-03-26'),
    user: {
      id: 278,
      first_name: 'Freddy',
      second_name: 'Lay',
      display_name: 'Guru',
      login: 'Дмитрий Самолетов',
      avatar: 'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
    id: uuid(),
  },
  {
    content: `Не вижу связи

	После прошивки что то изменилось?`,
    date: new Date('2021-08-10'),
    user: {
      id: 278,
      first_name: 'Наталья Морпеховна',
      second_name: 'Lay',
      display_name: 'Guru',
      login: 'Наталья Морпеховна',
      avatar:
        'https://i1.sndcdn.com/artworks-cX44g79njVzhFJPS-lLjMsw-t500x500.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
    id: uuid(),
  },
]

const mockComments1: CommentType[] = [
  {
    content:
      'За два сезона угробил зимнюю резину. Была Gislaved Nord Frost III, на время покупки была одной из лучших по соотношению цена/качество. Поискал свежих тестов - пока нет. Наверняка лучшей по показателям будет Nokian Hakkapelita 5 (пять - я не ошибся), но и стоить будет за 4000 рублей. А вот собственно и вопрос - кто какую резину планирует приобретать?',
    user: {
      id: 278,
      first_name: 'Freddy',
      second_name: 'Lay',
      display_name: 'Guru',
      login: 'Дмитрий Самолетов',
      avatar: 'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
    id: uuid(),
    date: new Date('2023-12-10'),
  },
  {
    content: `NF3 как-то мне после UG500 совсем не понравился. А покупать новомодную (ту же NH5) я бы не стал именно из-за неоптимального цена/качество.`,
    date: new Date('2023-12-11'),
    user: {
      id: 278,
      first_name: 'Наталья Морпеховна',
      second_name: 'Lay',
      display_name: 'Наталья Морпеховна',
      login: 'Наталья Морпеховна',
      avatar:
        'https://i1.sndcdn.com/artworks-cX44g79njVzhFJPS-lLjMsw-t500x500.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
    id: uuid(),
  },
]

const mockToics: TopicType[] = [
  {
    id: uuid(),
    name: 'Как набрать 2048?',
    comments: mockComments,
    author: {
      id: 278,
      first_name: 'Наталья Морпеховна',
      second_name: 'Lay',
      display_name: 'Наталья Морпеховна',
      login: 'Наталья Морпеховна',
      avatar:
        'https://i1.sndcdn.com/artworks-cX44g79njVzhFJPS-lLjMsw-t500x500.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
  },
  {
    id: uuid(),
    name: 'Выбираем зимнюю резину',
    comments: mockComments1,
    author: {
      id: 277,
      first_name: 'Freddy',
      second_name: 'Lay',
      display_name: 'Дмитрий Самолетов',
      login: 'Дмитрий Самолетов',
      avatar: 'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
  },
]

export const getTopics = () => {
  return mockToics
}

export const addTopic = (topic: TopicType) => {
  mockToics.push(topic)
}
