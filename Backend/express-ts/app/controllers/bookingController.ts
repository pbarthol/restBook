/**
 * Created by Peter on 12.11.2017.
 */
import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, Booking!');
    console.log('getBooking');
});

router.get('/:name', (req: Request, res: Response) => {
    let { name } = req.params;
    res.send(`Hello Booking, ${name}!`);
    console.log('getBookingByUser');
});

export const BookingController: Router = router;