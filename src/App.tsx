import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import StudentHome from './pages/student/StudentHome';
import PreTest from './pages/student/PreTest';
import PreTestAnalysis from './pages/student/PreTestAnalysis';
import StudentCourses from './pages/student/StudentCourses';
import TeacherHome from './pages/teacher/TeacherHome';
import TeacherMonitor from './pages/teacher/TeacherMonitor';
import TeacherAnalysis from './pages/teacher/TeacherAnalysis';
import UploadCourse from './pages/teacher/UploadCourse';
import UploadQuestion from './pages/teacher/UploadQuestion';
import AdminHome from './pages/admin/AdminHome';
import DataMonitor from './pages/admin/DataMonitor';
import CourseReview from './pages/admin/CourseReview';
import QuestionReview from './pages/admin/QuestionReview';

function App() {
  return (
    <HashRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/student/pretest" element={<PreTest />} />
        <Route path="/student/pretest-analysis" element={<PreTestAnalysis />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/teacher" element={<TeacherHome />} />
        <Route path="/teacher/monitor" element={<TeacherMonitor />} />
        <Route path="/teacher/analysis" element={<TeacherAnalysis />} />
        <Route path="/teacher/upload-course" element={<UploadCourse />} />
        <Route path="/teacher/upload-question" element={<UploadQuestion />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/data" element={<DataMonitor />} />
        <Route path="/admin/course-review" element={<CourseReview />} />
        <Route path="/admin/question-review" element={<QuestionReview />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
