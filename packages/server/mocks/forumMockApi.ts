import type { Express } from 'express'
import express from 'express'

//******************************************************************************
// Types
//******************************************************************************

export type TUser = {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  phone: string
  login: string
  avatar: string | null
  email: string
}

export type TTopic = {
  id: number
  title: string
  TS: string
  last_message: TLastMessage
}

export type TLastMessage = {
  user: TUser
  time: string
}

export type TTopics = Array<TTopic>

export type TComment = {
  commentId: number // TODO rename to id
  content: string
  date: string
  author: TUser
  // replies: TComment[]
}

export type TComments = Array<TComment>

//******************************************************************************
// Mock data
//******************************************************************************

let mockComments1: TComment[] = [
  {
    content: `у того кто шил не спросил... прошился так сказать по случаю + пару раз
	за последние пол года ошибка катализатора загоралась,
	но люди напугали, что после прошивки катализатор точно помрет и его надо удалять, потому и спрашиваю`,
    date: new Date('2021-01-26').toISOString(),
    author: {
      id: 278,
      first_name: 'Freddy',
      second_name: 'Lay',
      display_name: 'Guru',
      login: 'Дмитрий Самолетов',
      avatar: 'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
    commentId: 1,
  },
  {
    content: `По теме: у меня катализатор предыдущим хозяином выбит, звук... не нравится.
	Пока катализатор не забит (что выразится в заметном падении мощности), ИМХО, лучше его не трогать.`,
    date: new Date('2021-03-26').toISOString(),
    author: {
      id: 278,
      first_name: 'Freddy',
      second_name: 'Lay',
      display_name: 'Guru',
      login: 'Дмитрий Самолетов',
      avatar: 'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
    commentId: 2,
  },
  {
    content: `Не вижу связи

	После прошивки что то изменилось?`,
    date: new Date('2021-08-10').toISOString(),
    author: {
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
    commentId: 3,
  },
]

let mockComments2: TComment[] = [
  {
    content:
      'За два сезона угробил зимнюю резину. Была Gislaved Nord Frost III, на время покупки была одной из лучших по соотношению цена/качество. Поискал свежих тестов - пока нет. Наверняка лучшей по показателям будет Nokian Hakkapelita 5 (пять - я не ошибся), но и стоить будет за 4000 рублей. А вот собственно и вопрос - кто какую резину планирует приобретать?',
    author: {
      id: 278,
      first_name: 'Freddy',
      second_name: 'Lay',
      display_name: 'Guru',
      login: 'Дмитрий Самолетов',
      avatar: 'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
      email: 'freddy@lot.fn',
      phone: '98765432155',
    },
    commentId: 4,
    date: new Date('2023-12-10').toISOString(),
  },
  {
    content: `NF3 как-то мне после UG500 совсем не понравился. А покупать новомодную (ту же NH5) я бы не стал именно из-за неоптимального цена/качество.`,
    date: new Date('2023-12-11').toISOString(),
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
    commentId: 5,
  },
]

let mockTopics: TTopics = [
  {
    id: 6,
    title: 'Как набрать 2048?',
    TS: 'Наталья Морпеховна',
    last_message: {
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
      time: new Date('2023-12-10').toISOString(),
    },
  },
  {
    id: 7,
    title: 'Выбираем зимнюю резину',
    TS: 'Дмитрий Самолетов',
    last_message: {
      user: {
        id: 277,
        first_name: 'Freddy',
        second_name: 'Lay',
        display_name: 'Дмитрий Самолетов',
        login: 'Дмитрий Самолетов',
        avatar:
          'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
        email: 'freddy@lot.fn',
        phone: '98765432155',
      },
      time: new Date('2023-12-10').toISOString(),
    },
  },
]

export const getTopics = () => {
  return mockTopics
}

export const addTopic = (topic: TTopic) => {
  mockTopics.push(topic)
}

//******************************************************************************
// Mock api
//******************************************************************************

export function forumMockApi(app: Express) {
  app.use(express.json())

  // getTopics
  app.get('/api/v2/forum/topic', (_, res) => {
    res.json(getTopics())
  })

  // createTopic
  app.post('/api/v2/forum/topic', (req, res) => {
    const topic = {
      id: new Date().getTime(),
      title: req.body.title,
      TS: 'Текущий Юзер',
      last_message: {
        user: {
          id: 277,
          first_name: 'tek',
          second_name: 'user',
          display_name: 'Текущий Юзер',
          login: 'Текущий Юзер',
          avatar:
            'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
          email: 'freddy@lot.fn',
          phone: '98765432155',
        },
        time: new Date('2023-12-10').toISOString(),
      },
    }
    addTopic(topic)
    res.json({
      id: topic.id,
    })
  })

  // getCommentsByTopicId
  app.get('/api/v2/forum/topic/:id/comments', (req, res) => {
    switch (req.params.id) {
      case '6':
        res.json(mockComments1)
        break
      case '7':
        res.json(mockComments2)
        break
      default:
        res.status(400)
    }
  })

  // deleteTopicById
  app.delete('/api/v2/forum/topic/:id', (req, res) => {
    mockTopics = mockTopics.filter(topic => topic.id !== Number(req.params.id))
    res.json('')
  })

  // getCommentById
  app.get('/api/v2/forum/comment/:id', (req, res) => {
    for (const comment of [...mockComments1, ...mockComments2]) {
      if (comment.commentId === Number(req.params.id)) {
        res.json(comment)
        return
      }
    }
    res.status(400)
  })

  // deleteCommentById
  app.delete('/api/v2/forum/comment/:id', (req, res) => {
    mockComments1 = mockComments1.filter(
      comment => comment.commentId !== Number(req.params.id)
    )
    mockComments2 = mockComments2.filter(
      comment => comment.commentId !== Number(req.params.id)
    )
    res.json('')
  })

  // createComment
  app.post('/api/v2/forum/comment', (req, res) => {
    const comment = {
      content: req.body.content,
      date: new Date().toISOString(),
      author: {
        id: 277,
        first_name: 'tek',
        second_name: 'user',
        display_name: 'Текущий Юзер',
        login: 'Текущий Юзер',
        avatar:
          'https://s00.yaplakal.com/pics/pics_original/5/9/3/13161395.jpg',
        email: 'freddy@lot.fn',
        phone: '98765432155',
      },
      commentId: new Date().getTime(),
    }

    switch (req.body.topicId) {
      case 6:
        mockComments1.push(comment)
        break
      case 7:
        mockComments2.push(comment)
        break
      default:
        res.status(400)
    }
    res.json('')
  })
}
