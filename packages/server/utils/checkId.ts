const checkId = (reqId: string, res: any) => {
  const id = Number(reqId)
  if (!id) {
    res.status(400).send({ reason: 'Id is not a number' })
    return
  }
  return id
}

export default checkId
