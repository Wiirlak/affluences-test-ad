import {Router} from 'express';
import * as moment from 'moment';
import * as request from 'request';

const bookRouter = Router();
const url = 'http://localhost:8080/';

bookRouter.get('/', (req, res, next) => {
    if (!req.query.date) return res.status(400).send({"error": "date is required"});

    let date = new Date(req.query.date.toString());
    if (isNaN(date.getDate())) return res.status(400).send({"error": "wrong date format"});

    const params = {date: date, resourceId: 1337}
    request({url: `${url}timetables`, qs: params}, ((error, response, body) => {
        if (error) return res.status(400).send({"error": "invalid endpoint"});

        let ttJSON = JSON.parse(response.body);
        let timetable = ttJSON.timetables;
        if (!ttJSON.open) return res.send({"available": false});
        request({url: `${url}reservations`, qs: params}, ((error, response, body) => {
            if (error) return res.status(400).send({"error": "invalid endpoint"});

            let resJSON = JSON.parse(response.body);
            let reservations = resJSON.reservations;
            for (const i in timetable) {
                console.log(timetable[i])
                let tmpStart = timetable[i]['opening'];
                for (const j in reservations) {
                    if(reservations[j]['reservationStart']
                        .diff(tmpStart) === 0)
                        tmpStart = reservations[j]['reservationEnd']
                    else

                    console.log(reservations[j])
                }
            }
        }))
    }))
})


export default bookRouter;