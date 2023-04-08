import type { NextApiRequest, NextApiResponse } from 'next'
import Comment from '../../../types/Comment';
import { getCommentsFor, saveComment } from '../../../data/comments';

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

        if (!email || !email.includes('@') || !name || !text) {
            res.status(422).json({ message: "Invalid Input" })
            return
        }

        const comment: Comment = {
            id: String(eventId),
            email: email,
            name: name,
            text: text
        }

        saveComment(comment)

        res.status(200).json({ message: "success", comment: comment })

    } else if (req.method === "GET") {
        const eventId = req.query.eventId;

        const comments = getCommentsFor(String(eventId))

        res.status(200).json({ message: "success", comments: comments })
    } else {
        res.status(401).json({ message: 'ERROR API ROUTE NOT FOUND' })
    }
}
