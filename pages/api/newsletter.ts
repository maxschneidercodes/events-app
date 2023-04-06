import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const userEmail = req.body.email

    if (!userEmail && !userEmail.includes('@')) {
      res.status(422).json({ message: "Invalid Email" })
      return
    }

    res.status(200).json({ message: "success" })
  } else {
    res.status(401).json({ message: 'ERROR API ROUTE NOT FOUND' })
  }
}
