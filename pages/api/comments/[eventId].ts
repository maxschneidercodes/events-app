import type { NextApiRequest, NextApiResponse } from 'next'
import Comment from '../../../types/Comment';

type Data = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | any>
) {
    if (req.method === "POST") {
        const eventId = req.query.eventId;
        const { email, name, text } = req.body;
        console.log(req.body)

        if (!email || !email.includes('@') || !name || !text) {
            res.status(422).json({ message: "Invalid Input" })
            return
        }

        const comment: Comment = {
            email: email,
            name: name,
            text: text
        }

        res.status(200).json({ message: "success", comment: comment })

    } else if (req.method === "GET") {
        const eventId = req.query.eventId;
        const { email, name, text } = req.body;

        const testComments: Comment[] = [{
            email: "test@gmail.com",
            name: "Max",
            text: "Nice Post!"
        }, {
            email: "test2@gmail.com",
            name: "Tim",
            text: "That sounds good!"
        },]

        res.status(200).json({ message: "success", comments: testComments })
    } else {
        res.status(401).json({ message: 'ERROR API ROUTE NOT FOUND' })
    }
}
