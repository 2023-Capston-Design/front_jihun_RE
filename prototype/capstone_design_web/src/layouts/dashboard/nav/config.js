// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [[
  {
    title: '회원 권한 관리',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: '부서 관리',
    path: '/dashboard/department',
    icon: icon('ic_cart'),
  },
  {
    title: '이미지 관리',
    path: '/dashboard/classImage',
    icon: icon('ic_user'),
  },
  {
    title: '수업 관리',
    path: '/dashboard/classManage',
    icon: icon('ic_user'),
  },
  {
    title: '클래스 룸',
    path: '/dashboard/classRoom',
    icon: icon('ic_user'),
  },
],
[
  {
    title: '수업 관리',
    path: '/dashboard/classManage',
    icon: icon('ic_user')
  },
  {
    title: '강의용 이미지 관리',
    path: '/dashboard/classImage',
    icon: icon('ic_user')
  }
],
[
  {
    title: '클래스룸',
    path: '/dashboard/classRoom',
    icon: icon('ic_user')
  },
  {
    title: '수강 신청',
    path: '/dashboard/classManage',
    icon: icon('ic_user')
  }
]
];

export default navConfig;
