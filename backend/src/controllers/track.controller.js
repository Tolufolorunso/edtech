import Track from '../models/Track.js';

/**
 * @desc Create a new track
 * @route POST /api/tracks
 * @access Protected (Instructor or Admin)
 */
export const createTrack = async (req, res) => {
  const { title, description } = req.body;

  try {
    const exists = await Track.findOne({ title });
    if (exists)
      return res
        .status(400)
        .json({ status: false, message: 'Track already exists' });

    const track = await Track.create({ title, description });
    res
      .status(201)
      .json({ track, message: 'Track created successfully', status: true });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

/**
 * @desc Get all tracks
 * @route GET /api/tracks
 * @access Public
 */
export const getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find();
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
