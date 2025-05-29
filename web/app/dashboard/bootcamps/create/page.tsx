'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/layout';
import { useAuthStore } from '@/store/auth-store';
import styles from './create-bootcamp.module.css';
import { useBootcampStore } from '@/store/bootcamp-store';
import { toast } from 'react-toastify';

// Define types for the bootcamp form
interface Instructor {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface CurriculumWeek {
  week: number;
  title: string;
  topics: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

interface BootcampFormData {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  duration: string;
  schedule: string;
  startDate: string;
  price: string;
  level: string;
  prerequisites: string[];
  image: string;
  instructors: Instructor[];
  curriculum: CurriculumWeek[];
  faqs: FAQ[];
}

export default function CreateBootcampPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { createBootcamp, isLoading } = useBootcampStore((state) => state);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<BootcampFormData>({
    title: 'React Native Bootcamp',
    slug: 'react',
    subtitle: '',
    description: 'Learn react',
    duration: '14 weeks',
    schedule: '',
    startDate: '32/32/23',
    price: 'N35,999',
    level: 'Beginner',
    prerequisites: [],
    image: '',
    instructors: [
      {
        name: 'Tolulope Kola',
        role: 'Lead Instructor',
        bio: 'my bio',
        avatar: '',
      },
    ],
    curriculum: [{ week: 1, title: 'javascript', topics: ['sasas'] }],
    faqs: [{ question: '', answer: '' }],
  });
  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if user has instructor permissions
  if (!user || !['instructor', 'admin', 'superadmin'].includes(user.role)) {
    return (
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.unauthorized}>
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding a prerequisite
  const handleAddPrerequisite = () => {
    if (newPrerequisite.trim() !== '') {
      setFormData({
        ...formData,
        prerequisites: [...formData.prerequisites, newPrerequisite.trim()],
      });
      setNewPrerequisite('');
    }
  };

  // Handle removing a prerequisite
  const handleRemovePrerequisite = (index: number) => {
    const updatedPrerequisites = [...formData.prerequisites];
    updatedPrerequisites.splice(index, 1);
    setFormData({ ...formData, prerequisites: updatedPrerequisites });
  };

  // Handle instructor changes
  const handleInstructorChange = (
    index: number,
    field: keyof Instructor,
    value: string
  ) => {
    const updatedInstructors = [...formData.instructors];
    updatedInstructors[index] = {
      ...updatedInstructors[index],
      [field]: value,
    };
    setFormData({ ...formData, instructors: updatedInstructors });
  };

  // Handle adding an instructor
  const handleAddInstructor = () => {
    setFormData({
      ...formData,
      instructors: [
        ...formData.instructors,
        { name: '', role: '', bio: '', avatar: '' },
      ],
    });
  };

  // Handle removing an instructor
  const handleRemoveInstructor = (index: number) => {
    const updatedInstructors = [...formData.instructors];
    updatedInstructors.splice(index, 1);
    setFormData({ ...formData, instructors: updatedInstructors });
  };

  // Handle curriculum week changes
  const handleWeekChange = (
    index: number,
    field: keyof CurriculumWeek,
    value: any
  ) => {
    const updatedCurriculum = [...formData.curriculum];
    updatedCurriculum[index] = { ...updatedCurriculum[index], [field]: value };
    setFormData({ ...formData, curriculum: updatedCurriculum });
  };

  // Handle adding a curriculum week
  const handleAddWeek = () => {
    const nextWeekNumber = formData.curriculum.length + 1;
    setFormData({
      ...formData,
      curriculum: [
        ...formData.curriculum,
        { week: nextWeekNumber, title: '', topics: [''] },
      ],
    });
  };

  // Handle removing a curriculum week
  const handleRemoveWeek = (index: number) => {
    const updatedCurriculum = [...formData.curriculum];
    updatedCurriculum.splice(index, 1);
    // Update week numbers
    updatedCurriculum.forEach((week, idx) => {
      week.week = idx + 1;
    });
    setFormData({ ...formData, curriculum: updatedCurriculum });
  };

  // Handle topic changes
  const handleTopicChange = (
    weekIndex: number,
    topicIndex: number,
    value: string
  ) => {
    const updatedCurriculum = [...formData.curriculum];
    updatedCurriculum[weekIndex].topics[topicIndex] = value;
    setFormData({ ...formData, curriculum: updatedCurriculum });
  };

  // Handle adding a topic
  const handleAddTopic = (weekIndex: number) => {
    const updatedCurriculum = [...formData.curriculum];
    updatedCurriculum[weekIndex].topics.push('');
    setFormData({ ...formData, curriculum: updatedCurriculum });
  };

  // Handle removing a topic
  const handleRemoveTopic = (weekIndex: number, topicIndex: number) => {
    const updatedCurriculum = [...formData.curriculum];
    updatedCurriculum[weekIndex].topics.splice(topicIndex, 1);
    setFormData({ ...formData, curriculum: updatedCurriculum });
  };

  // Handle FAQ changes
  const handleFaqChange = (index: number, field: keyof FAQ, value: string) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  // Handle adding an FAQ
  const handleAddFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: '', answer: '' }],
    });
  };

  // Handle removing an FAQ
  const handleRemoveFaq = (index: number) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs.splice(index, 1);
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim())
      newErrors.description = 'Description is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';

    // Validate instructors
    formData.instructors.forEach((instructor, index) => {
      if (!instructor.name.trim())
        newErrors[`instructor-${index}-name`] = 'Instructor name is required';
    });

    // Validate curriculum
    formData.curriculum.forEach((week, index) => {
      if (!week.title.trim())
        newErrors[`week-${index}-title`] = 'Week title is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const res = await createBootcamp(formData);

      if (res.status) {
        toast.success(`🦄 ${res.message}`);
        router.push('/dashboard/bootcamps');
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Create New Bootcamp</h1>
          <p>
            Set up your intensive learning program with all the details students
            need.
          </p>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${
                activeTab === 'basic' ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab('basic')}
            >
              Basic Info
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === 'instructors' ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab('instructors')}
            >
              Instructors
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === 'curriculum' ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === 'faqs' ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab('faqs')}
            >
              FAQs
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className={styles.tabContent}>
                <h2>Basic Information</h2>
                <p>Provide the essential details about your bootcamp.</p>

                <div className={styles.formGroup}>
                  <label htmlFor="title">Bootcamp Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={errors.title ? styles.inputError : ''}
                  />
                  {errors.title && (
                    <div className={styles.errorMessage}>{errors.title}</div>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="slug">Slug</label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subtitle">Subtitle</label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className={errors.description ? styles.inputError : ''}
                  ></textarea>
                  {errors.description && (
                    <div className={styles.errorMessage}>
                      {errors.description}
                    </div>
                  )}
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="duration">Duration *</label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      placeholder="e.g., 12 weeks"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className={errors.duration ? styles.inputError : ''}
                    />
                    {errors.duration && (
                      <div className={styles.errorMessage}>
                        {errors.duration}
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="schedule">Schedule</label>
                    <input
                      type="text"
                      id="schedule"
                      name="schedule"
                      placeholder="e.g., Mon-Fri, 6-9 PM"
                      value={formData.schedule}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="text"
                      id="startDate"
                      name="startDate"
                      placeholder="e.g., June 15, 2023"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="price">Price *</label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      placeholder="e.g., $999"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={errors.price ? styles.inputError : ''}
                    />
                    {errors.price && (
                      <div className={styles.errorMessage}>{errors.price}</div>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="level">Level</label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="image">Image URL</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Prerequisites</label>
                  <div className={styles.prerequisitesContainer}>
                    <div className={styles.prerequisiteInput}>
                      <input
                        type="text"
                        value={newPrerequisite}
                        onChange={(e) => setNewPrerequisite(e.target.value)}
                        placeholder="Add a prerequisite"
                      />
                      <button
                        type="button"
                        onClick={handleAddPrerequisite}
                        className={styles.addButton}
                      >
                        Add
                      </button>
                    </div>
                    <div className={styles.prerequisitesList}>
                      {formData.prerequisites.map((prerequisite, index) => (
                        <div key={index} className={styles.prerequisiteItem}>
                          <span>{prerequisite}</span>
                          <button
                            type="button"
                            onClick={() => handleRemovePrerequisite(index)}
                            className={styles.removeButton}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.navigationButtons}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('instructors')}
                    className={styles.nextButton}
                  >
                    Next: Instructors
                  </button>
                </div>
              </div>
            )}

            {/* Instructors Tab */}
            {activeTab === 'instructors' && (
              <div className={styles.tabContent}>
                <h2>Instructors</h2>
                <p>
                  Add information about the instructors who will be teaching
                  this bootcamp.
                </p>

                {formData.instructors.map((instructor, index) => (
                  <div key={index} className={styles.instructorCard}>
                    <div className={styles.instructorHeader}>
                      <h3>Instructor {index + 1}</h3>
                      {formData.instructors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveInstructor(index)}
                          className={styles.removeButton}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor={`instructor-${index}-name`}>
                          Name *
                        </label>
                        <input
                          type="text"
                          id={`instructor-${index}-name`}
                          value={instructor.name}
                          onChange={(e) =>
                            handleInstructorChange(
                              index,
                              'name',
                              e.target.value
                            )
                          }
                          className={
                            errors[`instructor-${index}-name`]
                              ? styles.inputError
                              : ''
                          }
                        />
                        {errors[`instructor-${index}-name`] && (
                          <div className={styles.errorMessage}>
                            {errors[`instructor-${index}-name`]}
                          </div>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor={`instructor-${index}-role`}>Role</label>
                        <input
                          type="text"
                          id={`instructor-${index}-role`}
                          placeholder="e.g., Lead Instructor"
                          value={instructor.role}
                          onChange={(e) =>
                            handleInstructorChange(
                              index,
                              'role',
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor={`instructor-${index}-bio`}>Bio</label>
                      <textarea
                        id={`instructor-${index}-bio`}
                        value={instructor.bio}
                        onChange={(e) =>
                          handleInstructorChange(index, 'bio', e.target.value)
                        }
                        rows={3}
                      ></textarea>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor={`instructor-${index}-avatar`}>
                        Avatar URL
                      </label>
                      <input
                        type="text"
                        id={`instructor-${index}-avatar`}
                        placeholder="https://example.com/avatar.jpg"
                        value={instructor.avatar}
                        onChange={(e) =>
                          handleInstructorChange(
                            index,
                            'avatar',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddInstructor}
                  className={styles.addInstructorButton}
                >
                  + Add Another Instructor
                </button>

                <div className={styles.navigationButtons}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('basic')}
                    className={styles.backButton}
                  >
                    Back: Basic Info
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('curriculum')}
                    className={styles.nextButton}
                  >
                    Next: Curriculum
                  </button>
                </div>
              </div>
            )}

            {/* Curriculum Tab */}
            {activeTab === 'curriculum' && (
              <div className={styles.tabContent}>
                <h2>Curriculum</h2>
                <p>
                  Plan your bootcamp curriculum by week. Add topics for each
                  week.
                </p>{' '}
                <p>
                  Plan your bootcamp curriculum by week. Add topics for each
                  week.
                </p>
                {formData.curriculum.map((week, weekIndex) => (
                  <div key={weekIndex} className={styles.weekCard}>
                    <div className={styles.weekHeader}>
                      <h3>Week {week.week}</h3>
                      {formData.curriculum.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveWeek(weekIndex)}
                          className={styles.removeButton}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor={`week-${weekIndex}-title`}>
                        Week Title *
                      </label>
                      <input
                        type="text"
                        id={`week-${weekIndex}-title`}
                        value={week.title}
                        onChange={(e) =>
                          handleWeekChange(weekIndex, 'title', e.target.value)
                        }
                        className={
                          errors[`week-${weekIndex}-title`]
                            ? styles.inputError
                            : ''
                        }
                      />
                      {errors[`week-${weekIndex}-title`] && (
                        <div className={styles.errorMessage}>
                          {errors[`week-${weekIndex}-title`]}
                        </div>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Topics</label>
                      {week.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className={styles.topicInput}>
                          <input
                            type="text"
                            value={topic}
                            onChange={(e) =>
                              handleTopicChange(
                                weekIndex,
                                topicIndex,
                                e.target.value
                              )
                            }
                            placeholder={`Topic ${topicIndex + 1}`}
                          />
                          {week.topics.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveTopic(weekIndex, topicIndex)
                              }
                              className={styles.removeButton}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddTopic(weekIndex)}
                        className={styles.addTopicButton}
                      >
                        + Add Topic
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddWeek}
                  className={styles.addWeekButton}
                >
                  + Add Another Week
                </button>
                <div className={styles.navigationButtons}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('instructors')}
                    className={styles.backButton}
                  >
                    Back: Instructors
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('faqs')}
                    className={styles.nextButton}
                  >
                    Next: FAQs
                  </button>
                </div>
              </div>
            )}

            {/* FAQs Tab */}
            {activeTab === 'faqs' && (
              <div className={styles.tabContent}>
                <h2>Frequently Asked Questions</h2>
                <p>
                  Add FAQs to help potential students learn more about your
                  bootcamp.
                </p>

                {formData.faqs.map((faq, index) => (
                  <div key={index} className={styles.faqCard}>
                    <div className={styles.faqHeader}>
                      <h3>FAQ {index + 1}</h3>
                      {formData.faqs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(index)}
                          className={styles.removeButton}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor={`faq-${index}-question`}>Question</label>
                      <input
                        type="text"
                        id={`faq-${index}-question`}
                        value={faq.question}
                        onChange={(e) =>
                          handleFaqChange(index, 'question', e.target.value)
                        }
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor={`faq-${index}-answer`}>Answer</label>
                      <textarea
                        id={`faq-${index}-answer`}
                        value={faq.answer}
                        onChange={(e) =>
                          handleFaqChange(index, 'answer', e.target.value)
                        }
                        rows={3}
                      ></textarea>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddFaq}
                  className={styles.addFaqButton}
                >
                  + Add Another FAQ
                </button>

                <div className={styles.navigationButtons}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('curriculum')}
                    className={styles.backButton}
                  >
                    Back: Curriculum
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    {isLoading ? 'Creating Bootcamp...' : 'Create Bootcamp'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
