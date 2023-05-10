import mongoose, {Schema, Document, ObjectId} from "mongoose";
export interface IProfile{
    data?: any;
    userId ?:   mongoose.Types.ObjectId,
    college?: String,
    percentage?: Number,
    photo?: any
}
const profileSchema:Schema =  new Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    college: {
        type: "string"
    },
    percentage: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})
export default mongoose.model<IProfile>('Profile', profileSchema);