import express, {Request, Response} from "express";
import multer from "multer"
import cloudinary from "cloudinary";
import Hotel from "../models/hotels";
import  { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})

// api/my-hotels

router.post("/", 
    verifyToken,
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required"),
        body("facilities").notEmpty().isArray().withMessage("facilities are required"),
    ],
    upload.array("imageFiles", 6),
    async (req: Request, res:Response)=>{
        try {
            const imageFiles = req.files as Express.Multer.File[]
            const newHotel: HotelType = req.body;
            
            // 1. upload the images to cloudinary

            const imageUrls = await uploadImages(imageFiles);

            // 2. if upload was successfull, add the urls to the new hotel

            newHotel.imageUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;
            
            // 3. save the new hotel in our database

            const hotel = new Hotel(newHotel);
            await hotel.save();
            // 4. return 201 status

            res.status(201).send(hotel)
        } catch (e) {
            console.log("Error creating hotel: ", e);
            res.status(500).json({message: "Something went wrong"})
        }
})

router.get("/", verifyToken, async(req: Request, res:Response)=>{
    try {
        const hotels= await Hotel.find({userId: req.userId});
    res.json(hotels);
    } catch (error) {
        res.status(500).json({message:"Error fetching hotels"})
    }
})

router.get("/:id", verifyToken, async (req:Request, res: Response)=>{
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req.userId
        });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({message: "Error fetching hotels"})
    }
})

router.put("/:hotelId", verifyToken, upload.array("imageFiles"),
async (req:Request, res:Response) =>{
    try {
        const updateHotel: HotelType = req.body;
        updateHotel.lastUpdated = new Date();

        const hotel = await Hotel.findOneAndUpdate({
            _id: req.params.hotelId,
            userId: req.userId,
        },
       updateHotel,
       {new: true}
    );
    if(!hotel){
        return res.status(404).json({message: "Hotel not found"})
    }
    const files = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(files);

    hotel.imageUrls = [...updatedImageUrls, ...(updateHotel.imageUrls || [])]
    await hotel.save();


    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
} 

)



async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = `data:image/${image.mimetype.split('/')[1]};base64,${b64}`;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;