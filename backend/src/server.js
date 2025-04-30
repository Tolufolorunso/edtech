import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import trackRoutes from './routes/track.routes.js';
import enrollmentRoutes from './routes/enrollment.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import resourceRoutes from './routes/resource.routes.js';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/resources', resourceRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error:', err));
