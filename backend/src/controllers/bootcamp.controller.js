import Bootcamp from '../models/Bootcamp.js';

// ✅ GET /api/bootcamps
export const getAllBootcamps = async (req, res) => {
  const bootcamps = await Bootcamp.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: true,
    message: 'Bootcamps fetched successfully',
    bootcamps,
  });
};

export const getAllBootcampsForDashboard = async (req, res) => {
  const { role, userId } = req.user;
  let query = {};
  // If user is instructor, only fetch their created bootcamps
  if (role === 'instructor') {
    query = { creator: userId };
  }
  const bootcamps = await Bootcamp.find(query)
    .sort({ createdAt: -1 })
    .populate('creator', 'name email');

  res.status(200).json({
    status: true,
    message: 'Bootcamps fetched successfully',
    bootcamps,
  });
};

// POST /api/bootcamps
export const createBootcamp = async (req, res) => {
  const {
    title,
    slug,
    subtitle,
    description,
    duration,
    schedule,
    startDate,
    price,
    level,
    prerequisites,
    image,
    instructors,
    curriculum,
    faqs,
  } = req.body;

  // Check if bootcamp with this slug already exists
  const existingBootcamp = await Bootcamp.findOne({ slug });
  if (existingBootcamp) {
    return res.status(400).json({
      status: false,
      message: 'Slug already exists',
      field: 'slug', // Indicate which field caused the error
    });
  }

  const formattedCurriculum = (curriculum || []).map((week) => ({
    weekNumber: week.week || week.weekNumber || 0,
    title: week.title || '',
    description: week.description || '',
    videos: week.videos || [],
    resources: week.resources || [],
    liveClass: week.liveClass || null,
    quizzes: week.quizzes || [],
    completed: false,
  }));

  const bootcamp = await Bootcamp.create({
    title,
    slug,
    subtitle,
    description,
    duration,
    schedule,
    startDate,
    price,
    level,
    prerequisites,
    image,
    instructors,
    curriculum: formattedCurriculum,
    faqs,
  });

  return res.status(201).json({
    status: true,
    message: 'Bootcamp created successfully',
    bootcamp,
  });
};

export const getBootcampById = async (req, res) => {
  const { id } = req.params;
  const bootcamp = await Bootcamp.findById(id);

  if (!bootcamp) {
    return res.status(404).json({ message: 'Bootcamp not found' });
  }

  res
    .status(200)
    .json({ status: true, message: 'Bootcamp fetched successfully', bootcamp });
};
