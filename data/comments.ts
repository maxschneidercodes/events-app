import { readFileSync, writeFileSync } from 'fs';
import Comment from '../types/Comment';

export function saveComment(comment: Comment) {
    const commentsArray = getComments()
    commentsArray.push(comment)

    const commentsData = JSON.stringify(commentsArray)

    writeFileSync(`data/comments.json`, commentsData);
}

export function getComments(): Comment[] {
    const commentsArray = readFileSync(`data/comments.json`).toString()
    const arr = JSON.parse(commentsArray)
    return arr
}

export function getCommentsFor(eventID: string) {
    const commentsArray = readFileSync(`data/comments.json`).toString()
    const arr: Comment[] = JSON.parse(commentsArray)
    return arr.filter((comment) => { return comment.id === eventID })
}