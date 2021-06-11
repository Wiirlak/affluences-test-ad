export interface TimeTablesResponse {
    open: boolean,
    timetables: TimeTable[]
}

export interface TimeTable {
    opening: Date,
    closing: Date,
}

export interface ReservationsResponse {
    reservations: Reservation[]
}

export interface Reservation {
    reservationStart: Date,
    reservationEnd: Date,
}