import Video from '../models/videosModel.js';
import { createWriteStream } from 'fs';
import ytdl from 'ytdl-core';


async function downloadVideo(url) {
  try {
    const videoInfo = await ytdl.getInfo(url)
    const videoId = videoInfo.videoDetails.videoId;
    const fileName = `${videoId}.mp3`;

    const audioStream = ytdl(url, { filter: 'audioonly' });
    const outputStream = createWriteStream(fileName);

    await new Promise((resolve, reject) => {
      audioStream.pipe(outputStream);
      outputStream.on('finish', resolve);
      outputStream.on('error', reject);
    });

    const videoData = new Video({
      channelName: videoInfo.videoDetails.author.name,
      channelAvatar: videoInfo.videoDetails.author.thumbnails[0].url,
      videoTitle: videoInfo.videoDetails.title,
      videoThumbnail: videoInfo.videoDetails.thumbnails[0].url,
      publishData: videoInfo.videoDetails.publishDate,
    });

    await videoData.save()
    console.log('Video data stored in MongoDB.');


    /*console.log('Audio downloaded successfully.');
    console.log('Channel Avatar:', videoInfo.videoDetails.author.thumbnails[0].url);
    console.log('Title:', videoInfo.videoDetails.title);
    console.log('Thumbnail:', videoInfo.videoDetails.thumbnails[0].url);
    console.log('Channel:', videoInfo.videoDetails.author.name);
    console.log('Publish Date:', videoInfo.videoDetails.publishDate)

    //transcribeLocalAudio(fileName)*/
    
  } catch (error) {
    console.error('Error downloading audio:', error);
  }
}

export default downloadVideo;