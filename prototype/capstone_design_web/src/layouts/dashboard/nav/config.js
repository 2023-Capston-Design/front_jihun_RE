// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [[
  {
    title: '회원 권한 관리',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: '부서 관리',
    path: '/dashboard/department',
    icon: icon('ic_cart'),
  },
  {
    title: '수업 관리',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: '수업 검색',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  }],
  [ {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  }]
];

export default navConfig;
