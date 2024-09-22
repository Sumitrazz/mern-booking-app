import express, {Request, Response} from 'express';
import verifyToken from '../middleware/auth';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';

const router = express.Router();
router.get("/", verifyToken, async(req: Request , res: Response)=> {
try {
    const hotels= await Hotel.find({
        bookings: {$elemMatch: {userId: req.userId}},
    });

    const results = hotels.map((hotel)=> {
        const userBooking = hotel.bookings.filter(
            (booking)=> booking.userId === req.userId
        );

        const hotelWithUserBooking: HotelType={
            ...hotel.toObject(),
            bookings: userBooking,
        }
        return hotelWithUserBooking;
    });
    res.status(200).send(results);
} catch (error) {
    console.log(error);
    res.status(500).json({message: "Unable to fetch booking"});
}
})

export default router;