import Video from '../../models/videosModel.js';
import TranscriptionMetrics from '../../models/transcriptionMetricsModel.js';

async function getTranscriptionDataForVideo(req, res) {
  try {
    const { videoId } = req.params;

    const video = await Video.findOne({ videoId });

    const transcriptionMetrics = await TranscriptionMetrics.findOne({ video: video._id }).populate('video');

    res.json(transcriptionMetrics);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export default getTranscriptionDataForVideo;
