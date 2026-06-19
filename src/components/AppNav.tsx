import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../types';
import {
  HomeIcon,
  ClipboardListIcon,
  BarChart2Icon,
  BookOpenIcon,
  EyeIcon,
  UploadIcon,
  PenLineIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  CheckSquareIcon,
  LogOutIcon,
  FileQuestionIcon,
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const studentNav: NavItem[] = [
  { path: '/student', label: '主页', icon: <HomeIcon size={20} /> },
  { path: '/student/pretest', label: '前测', icon: <ClipboardListIcon size={20} /> },
  { path: '/student/pretest-analysis', label: '分析', icon: <BarChart2Icon size={20} /> },
  { path: '/student/courses', label: '课程', icon: <BookOpenIcon size={20} /> },
];

const teacherNav: NavItem[] = [
  { path: '/teacher', label: '主页', icon: <HomeIcon size={20} /> },
  { path: '/teacher/monitor', label: '监控', icon: <EyeIcon size={20} /> },
  { path: '/teacher/analysis', label: '学情', icon: <BarChart2Icon size={20} /> },
  { path: '/teacher/upload-course', label: '上传课', icon: <UploadIcon size={20} /> },
  { path: '/teacher/upload-question', label: '出题', icon: <PenLineIcon size={20} /> },
];

const adminNav: NavItem[] = [
  { path: '/admin', label: '主页', icon: <ShieldCheckIcon size={20} /> },
  { path: '/admin/data', label: '数据', icon: <DatabaseIcon size={20} /> },
  { path: '/admin/course-review', label: '审课', icon: <CheckSquareIcon size={20} /> },
  { path: '/admin/question-review', label: '审题', icon: <FileQuestionIcon size={20} /> },
];

interface AppNavProps {
  role?: UserRole;
  userName?: string;
  userAvatar?: string;
}

const AppNav: React.FC<AppNavProps> = ({
  role = 'student',
  userName = '小朋友',
  userAvatar = '🐻',
}) => {
  const location = useLocation();
  const navMap: Record<UserRole, NavItem[]> = {
    student: studentNav,
    teacher: teacherNav,
    admin: adminNav,
  };
  const navItems = navMap[role] ?? studentNav;

  return (
    <nav
      data-cmp="AppNav"
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: 'rgba(255,255,255,0.97)',
        borderTop: '1.5px solid rgba(126,200,227,0.3)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around px-2 pt-1.5 pb-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path) && item.path.split('/').length === location.pathname.split('/').length);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              style={{ textDecoration: 'none', color: isActive ? '#fff' : '#5A8EA0' }}
            >
              <span style={{ lineHeight: 1 }}>{item.icon}</span>
              <span className="font-bold" style={{ fontSize: '10px', lineHeight: 1.2 }}>{item.label}</span>
            </Link>
          );
        })}

        {/* Return to portal */}
        <Link
          to="/"
          className="bottom-nav-item"
          style={{ textDecoration: 'none', color: '#5A8EA0' }}
        >
          <LogOutIcon size={20} />
          <span className="font-bold" style={{ fontSize: '10px', lineHeight: 1.2 }}>切换</span>
        </Link>
      </div>
    </nav>
  );
};

export default AppNav;
