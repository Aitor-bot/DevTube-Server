import Mongoose from "mongoose"

const VideoSchema = new Mongoose.Schema({
    channelName: {
        type: String,
        required: true
    },
    channelAvatar: {
        type: String,
        required: true
    },
    videoTitle: {
        type: String,
        required: true
    },
    videoThumbnail: {
        type: String,
        required: true
    },
    publishData: {
        type: Date,
        required: true
    },
    transcribedText: {
        type: String,
        required: false
    },
    videoId: {
        type: String,
        required: true,
    },
    viewCount: {
        type: Number,
        required: true

    }

});

const Video = Mongoose.model("Video", VideoSchema);

export default Video;