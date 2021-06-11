import * as moment from "moment";
import {
    Reservation,
    ReservationsResponse,
    TimeTable,
    TimeTablesResponse
} from "../../external/reservation/interface/reservation.interface";
import * as ReservationApi from "../../external/reservation/reservation.service";

function isAvailable(date: moment.Moment, timetables: TimeTable[], reservations: Reservation[]): Boolean {
    for (const i in timetables) {
        const opening = moment(timetables[i].opening);
        const closing = moment(timetables[i].closing);
        if (date.isBetween(opening, closing, null, '[]')) {
            for (const j in reservations) {
                const reservationStart = moment(reservations[j].reservationStart);
                const reservationEnd = moment(reservations[j].reservationEnd);
                if (reservationStart.isSameOrAfter(opening)
                    && reservationEnd.isSameOrBefore(closing)
                    && date.isBetween(reservationStart, reservationEnd, null, '[)'))
                    return false;
            }
            return true;
        }
    }
    return false;
}

export async function dateAvailable(date: moment.Moment): Promise<Boolean> {
    let params = {date: date.format('YYYY-MM-DD'), resourceId: 1337};
    try {
        const timetableBody = await ReservationApi.get<TimeTablesResponse>('timetables', params);
        if (!timetableBody.open) return false;
        const reservationBody = await ReservationApi.get<ReservationsResponse>('reservations', params);
        return isAvailable(date, timetableBody.timetables, reservationBody.reservations);
    } catch (err) {
        await Promise.reject({error: err.message});
    }
}