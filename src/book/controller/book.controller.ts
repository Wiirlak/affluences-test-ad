import {Router} from 'express';
import * as moment from 'moment';
import * as BookService from "../service/book.service";

const bookRouter = Router();

bookRouter.get('/', async (req, res, next) => {
    if (!req.query.date) return res.status(400).send({error: "date is required"});
    const date : string = req.query.date.toString();
    const mDate = moment(date);
    if (!mDate.isValid()) return res.status(400).send({error: "wrong date format"});
    try {
        const available: Boolean = await BookService.dateAvailable(mDate);
        return res.send({available: available});
    } catch (err) {
        return res.status(400).send(err);
    }
})

export default bookRouter;