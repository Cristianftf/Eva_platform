import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CourseHeader from './components/CourseHeader';
import CourseNavigation from './components/CourseNavigation';
import CourseOverview from './components/CourseOverview';
import CourseContent from './components/CourseContent';
import CourseAssignments from './components/CourseAssignments';
import CourseDiscussions from './components/CourseDiscussions';
import CourseGrades from './components/CourseGrades';
import MediaPlayer from './components/MediaPlayer';
import CourseSidebar from './components/CourseSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import CoursesCatalog from './components/CoursesCatalog';
 
const CourseDetailPages = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedContent, setSelectedContent] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCourseSidebar, setShowCourseSidebar] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use AuthContext to get user info
  const { user } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
  const client = axios.create({ baseURL: API_URL });
  // attach token from localStorage if present
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // read course id from query: ?course=ID
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('course');

  // If no courseId provided, render a courses catalog (list) instead
  if (!courseId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex pt-16">
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

          <main className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}>
            <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 max-w-7xl mx-auto">
              <CoursesCatalog />
            </div>
          </main>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!courseId) {
      setError('No course id specified in URL');
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        const [courseRes, modulesRes, assignmentsRes, discussionsRes, gradesRes, statsRes] = await Promise.all([
          client.get(`/courses/${courseId}`),
          client.get(`/courses/${courseId}/modules`),
          client.get(`/courses/${courseId}/assignments`),
          client.get(`/courses/${courseId}/discussions`),
          client.get(`/courses/${courseId}/grades`),
          client.get(`/courses/${courseId}/stats`)
        ]);

        const courseServer = courseRes.data || {};
        setCourseData({
          id: courseServer.id,
          title: courseServer.title,
          description: courseServer.description || courseServer.description || '',
          instructor: courseServer.instructorName || courseServer.instructor || '',
          category: courseServer.category || courseServer.category || 'General',
          level: courseServer.level || 'Intermedio',
          duration: courseServer.duration || 'N/A',
          enrolledStudents: courseServer.enrolledStudents || courseServer.studentsCount || 0,
          rating: courseServer.rating || 0,
          reviews: courseServer.reviews || 0,
          thumbnail: courseServer.thumbnail || courseServer.thumbnail || null,
          thumbnailAlt: courseServer.thumbnailAlt || ''
        });

        // map modules
        setModulesData((modulesRes.data || []).map(m => ({
          id: m.id,
          title: m.title,
          completed: m.completed,
          totalDuration: m.totalDuration,
          completedLessons: m.completedLessons,
          lessons: (m.lessons || []).map(l => ({
            id: l.id,
            title: l.title,
            type: l.type,
            duration: l.duration,
            completed: l.completed,
            isPreview: l.isPreview,
            isLocked: l.isLocked,
            hasNotes: l.hasNotes
          }))
        })));

        // map assignments
        setAssignmentsData((assignmentsRes.data || []).map(a => ({
          id: a.id,
          title: a.title,
          description: a.description,
          fullDescription: a.fullDescription,
          dueDate: a.dueDate,
          points: a.points,
          status: a.status,
          requirements: a.requirements || [],
          rubric: a.rubric || []
        })));

        // discussions
        setDiscussionsData(discussionsRes.data || []);

        // grades
        setGradesData(gradesRes.data || []);

        // stats
        setCourseStatsData(statsRes.data || {});

      } catch (err) {
        console.error('Error loading course details', err);
        setError(err?.response?.data?.message || err.message || 'Error loading course');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId]);

  // local state that previously was mocked
  const [courseData, setCourseData] = useState(null);
  const [progressData, setProgressData] = useState({ completed: 0, total: 0 });
  const [modulesData, setModulesData] = useState([]);
  


  const [assignmentsData, setAssignmentsData] = useState([]);


  const [discussionsData, setDiscussionsData] = useState([]);


  const [gradesData, setGradesData] = useState([]);


  const [courseStatsData, setCourseStatsData] = useState({});

  const handleEnroll = async () => {
    try {
      await client.post(`/courses/${courseId}/enroll`);
      setIsEnrolled(true);
    } catch (err) {
      console.error('Error enrolling in course', err);
      setError(err?.response?.data?.message || err.message || 'Error al inscribirse en el curso');
    }
  };

  const handleContentSelect = (content) => {
    setSelectedContent(content);
  };

  const handleSubmitAssignment = (assignmentId) => {
    console.log('Submitting assignment:', assignmentId);
    // Handle assignment submission logic
  };

  const handleCreatePost = async (postData) => {
    try {
      const payload = { title: postData.title, content: postData.content, authorId: user?.id };
      const res = await client.post(`/courses/${courseId}/discussions`, payload);
      // prepend new discussion
      setDiscussionsData(prev => [res.data, ...(prev || [])]);
    } catch (err) {
      console.error('Error creating discussion', err);
      setError(err?.response?.data?.message || err.message || 'Error creating discussion');
    }
  };

  const handleReplyToPost = async (postId, replyContent) => {
    try {
      const payload = { authorId: user?.id, content: replyContent };
      const res = await client.post(`/discussions/${postId}/replies`, payload);
      // update the discussion in state
      setDiscussionsData(prev => (prev || []).map(d => d.id === res.data.id ? res.data : d));
    } catch (err) {
      console.error('Error adding reply', err);
      setError(err?.response?.data?.message || err.message || 'Error replying to discussion');
    }
  };

  const handleChatToggle = (isOpen) => {
    console.log('Chat toggled:', isOpen);
  };

  const handleResourceDownload = (resource) => {
    console.log('Downloading resource:', resource);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <CourseOverview course={courseData} />;
      case 'content':
        return (
          <CourseContent
            modules={modulesData}
            onContentSelect={handleContentSelect} />);


      case 'assignments':
        return (
          <CourseAssignments
            assignments={assignmentsData}
            onSubmitAssignment={handleSubmitAssignment} />);


      case 'discussions':
        return (
          <CourseDiscussions
            discussions={discussionsData}
            onCreatePost={handleCreatePost}
            onReplyToPost={handleReplyToPost} />);


      case 'grades':
        return (
          <CourseGrades
            grades={gradesData}
            courseStats={courseStatsData} />);


      default:
        return <CourseOverview course={courseData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        
        <main className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'}`
        }>
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Main Content Area */}
            <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
            showCourseSidebar ? 'mr-80' : 'mr-0'}`
            }>
              <div className="p-6">
                {/* Course Header */}
                <CourseHeader
                  course={courseData}
                  onEnroll={handleEnroll}
                  isEnrolled={isEnrolled} />


                {/* Course Navigation */}
                <CourseNavigation
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  progress={progressData} />


                {/* Selected Content Player */}
                {selectedContent && selectedContent?.type === 'video' &&
                <div className="mb-6">
                    <MediaPlayer
                    content={{
                      title: selectedContent?.title,
                      description: "Video explicativo sobre " + selectedContent?.title?.toLowerCase(),
                      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                      thumbnail: "https://images.unsplash.com/photo-1646254827100-28ad0a7a0420",
                      views: 1247,
                      publishedAt: "2025-10-15T10:00:00"
                    }}
                    onProgress={(currentTime, duration) => {

                      // Handle progress tracking
                    }} onComplete={() => {

                      // Handle completion
                    }} />
                  </div>
                }

                {/* Tab Content */}
                {renderTabContent()}
              </div>
            </div> 

            {/* Course Sidebar */}
            {showCourseSidebar &&
            <CourseSidebar
              course={courseData}
              onChatToggle={handleChatToggle}
              onResourceDownload={handleResourceDownload} />

            }

            {/* Sidebar Toggle Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowCourseSidebar(!showCourseSidebar)}
              className="fixed right-4 top-24 z-40 bg-card border border-border academic-shadow">

              <Icon name={showCourseSidebar ? "ChevronRight" : "ChevronLeft"} size={20} />
            </Button>
          </div>
        </main>
      </div>
    </div>);

};

export default CourseDetailPages;