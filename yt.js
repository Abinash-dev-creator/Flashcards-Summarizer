const { YoutubeTranscript } = require('youtube-transcript');

function extractVideoId(url) {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/) ||
        url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/);
    return match ? match[1] : null;
}

const url = "https://youtu.be/AdBzzpq3xV4?si=WGeMpFfsesY1uIg9";

const getSubtitle = async (url) => {

    if (!url) {
        // Changed from alert to console.log
        console.log("Please enter a YouTube URL");

    }

    try {
        // Extract video ID from URL
        const videoId = extractVideoId(url);
        if (!videoId) {
            // Changed from alert to console.log
            console.log("Invalid YouTube URL");

        }

        // Fetch transcript using youtube-transcript library
        let transcriptData;
        try {
            transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
        } catch (error) {
            console.error("Error fetching transcript with library:", error);
            // Changed from alert to console.log
            console.log("Failed to fetch transcript. Ensure video has captions enabled, and that there is no rate limit.");

        }

        if (!transcriptData || transcriptData.length === 0) {
            // Changed from alert to console.log
            console.log("Transcript not available for this video.");

        }

        // Process transcript into sentences for flashcards
        const sentences = transcriptData
            .map(item => item.text)
            .join(" ")
            .split(".")
            .filter(sentence => sentence.trim().length > 1)
            .slice(0, 12); // Limit to 12 sentences for flashcards

        // console.log(sentences)
        // console.log("Data Source: YouTube Transcript");
        return sentences;
    } catch (error) {
        console.error("Error fetching YouTube transcript:", error);
        // Changed from alert to console.log
        console.log("An error occurred while fetching the transcript. Check the console for details.");
    }

}

module.exports = { getSubtitle };