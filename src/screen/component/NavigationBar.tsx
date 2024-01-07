import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import LogoWoodify from "../../assets/logo_woodify.svg";
import { useAuthenticationUserWebsite } from '../../tools/tools';
import Arrow from "../../assets/setting_arrow.svg"
import doorIcon from "../../assets/Logout-icon.svg"

const HomeIcon = ({ color = "#A1A1A1" }) => {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.625 20.2127V11.4191C23.625 10.0568 23.0179 8.76656 21.9714 7.90484L16.3464 3.27301C14.6899 1.90899 12.3101 1.909 10.6536 3.27302L5.02859 7.90484C3.9821 8.76656 3.375 10.0568 3.375 11.4191V20.2127C3.375 22.7186 5.38972 24.75 7.875 24.75H19.125C21.6103 24.75 23.625 22.7186 23.625 20.2127Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11.25 20.25H15.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const AccountIcon = ({ color = "#A1A1A1" }) => {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.25 7.875C17.25 9.94607 15.5711 11.625 13.5 11.625V13.125C16.3995 13.125 18.75 10.7745 18.75 7.875H17.25ZM13.5 11.625C11.4289 11.625 9.75 9.94607 9.75 7.875H8.25C8.25 10.7745 10.6005 13.125 13.5 13.125V11.625ZM9.75 7.875C9.75 5.80393 11.4289 4.125 13.5 4.125V2.625C10.6005 2.625 8.25 4.9755 8.25 7.875H9.75ZM13.5 4.125C15.5711 4.125 17.25 5.80393 17.25 7.875H18.75C18.75 4.9755 16.3995 2.625 13.5 2.625V4.125ZM20.625 19.6875C20.625 20.3377 20.0784 21.1282 18.7331 21.8009C17.4326 22.4512 15.5834 22.875 13.5 22.875V24.375C15.7658 24.375 17.8542 23.9174 19.4039 23.1426C20.9087 22.3901 22.125 21.2119 22.125 19.6875H20.625ZM13.5 22.875C11.4166 22.875 9.56745 22.4512 8.26694 21.8009C6.92158 21.1282 6.375 20.3377 6.375 19.6875H4.875C4.875 21.2119 6.0913 22.3901 7.59612 23.1426C9.14581 23.9174 11.2342 24.375 13.5 24.375V22.875ZM6.375 19.6875C6.375 19.0373 6.92158 18.2468 8.26694 17.5741C9.56745 16.9238 11.4166 16.5 13.5 16.5V15C11.2342 15 9.14581 15.4576 7.59612 16.2324C6.0913 16.9849 4.875 18.1631 4.875 19.6875H6.375ZM13.5 16.5C15.5834 16.5 17.4326 16.9238 18.7331 17.5741C20.0784 18.2468 20.625 19.0373 20.625 19.6875H22.125C22.125 18.1631 20.9087 16.9849 19.4039 16.2324C17.8542 15.4576 15.7658 15 13.5 15V16.5Z" fill={color} />
    </svg>
  )
}

const SettingIcon = ({ color = "#A1A1A1" }) => {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.3369 17.6856L22.6973 17.294L23.3369 17.6856ZM22.263 19.4393L22.9026 19.831V19.831L22.263 19.4393ZM3.6631 9.31434L3.02349 8.92268H3.02349L3.6631 9.31434ZM4.73697 7.56064L5.37658 7.9523V7.9523L4.73697 7.56064ZM7.67083 6.81944L8.02941 6.16072L8.02941 6.16071L7.67083 6.81944ZM4.44923 12.0805L4.09065 12.7393H4.09065L4.44923 12.0805ZM19.3292 20.1805L18.9706 20.8393L18.9706 20.8393L19.3292 20.1805ZM22.5508 14.9194L22.1922 15.5782L22.5508 14.9194ZM4.73697 19.4394L4.09736 19.831H4.09736L4.73697 19.4394ZM3.6631 17.6857L4.30271 17.294H4.30271L3.6631 17.6857ZM22.263 7.56066L22.9026 7.169V7.169L22.263 7.56066ZM23.3369 9.31436L22.6973 9.70602V9.70602L23.3369 9.31436ZM22.5508 12.0806L22.9094 12.7393L22.5508 12.0806ZM19.3292 6.81946L19.6878 7.47818V7.47818L19.3292 6.81946ZM4.44923 14.9195L4.80781 15.5782H4.80781L4.44923 14.9195ZM7.67083 20.1806L7.31225 19.5218L7.31225 19.5218L7.67083 20.1806ZM19.215 6.8816L18.8564 6.22287L19.215 6.8816ZM7.785 6.88159L7.42642 7.54032H7.42642L7.785 6.88159ZM19.215 20.1184L19.5736 19.4597L19.215 20.1184ZM7.785 20.1184L8.14358 20.7771L8.14358 20.7771L7.785 20.1184ZM12.4261 4.125H14.5739V2.625H12.4261V4.125ZM14.5739 22.875H12.4261V24.375H14.5739V22.875ZM12.4261 22.875C11.612 22.875 11.0284 22.2632 11.0284 21.6H9.5284C9.5284 23.1736 10.8679 24.375 12.4261 24.375V22.875ZM15.9716 21.6C15.9716 22.2632 15.388 22.875 14.5739 22.875V24.375C16.1321 24.375 17.4716 23.1736 17.4716 21.6H15.9716ZM14.5739 4.125C15.388 4.125 15.9716 4.7368 15.9716 5.4H17.4716C17.4716 3.82644 16.1321 2.625 14.5739 2.625V4.125ZM12.4261 2.625C10.8679 2.625 9.5284 3.82644 9.5284 5.4H11.0284C11.0284 4.7368 11.612 4.125 12.4261 4.125V2.625ZM22.6973 17.294L21.6234 19.0477L22.9026 19.831L23.9765 18.0773L22.6973 17.294ZM4.30271 9.706L5.37658 7.9523L4.09736 7.16898L3.02349 8.92268L4.30271 9.706ZM5.37658 7.9523C5.75112 7.34066 6.61872 7.10064 7.31225 7.47817L8.02941 6.16071C6.66844 5.41986 4.90898 5.84354 4.09736 7.16898L5.37658 7.9523ZM4.80781 11.4218C4.13768 11.057 3.94541 10.2895 4.30271 9.706L3.02349 8.92268C2.19463 10.2763 2.70628 11.9857 4.09065 12.7393L4.80781 11.4218ZM21.6234 19.0477C21.2489 19.6593 20.3813 19.8993 19.6878 19.5218L18.9706 20.8393C20.3316 21.5801 22.091 21.1564 22.9026 19.831L21.6234 19.0477ZM23.9765 18.0773C24.8054 16.7237 24.2937 15.0143 22.9094 14.2607L22.1922 15.5782C22.8623 15.943 23.0546 16.7105 22.6973 17.294L23.9765 18.0773ZM5.37658 19.0477L4.30271 17.294L3.02349 18.0773L4.09736 19.831L5.37658 19.0477ZM21.6234 7.95232L22.6973 9.70602L23.9765 8.9227L22.9026 7.169L21.6234 7.95232ZM22.6973 9.70602C23.0546 10.2895 22.8623 11.057 22.1922 11.4218L22.9094 12.7393C24.2937 11.9857 24.8054 10.2763 23.9765 8.9227L22.6973 9.70602ZM19.6878 7.47818C20.3813 7.10066 21.2489 7.34067 21.6234 7.95232L22.9026 7.169C22.091 5.84356 20.3316 5.41988 18.9706 6.16073L19.6878 7.47818ZM4.30271 17.294C3.94541 16.7105 4.13768 15.943 4.80781 15.5782L4.09064 14.2607C2.70628 15.0143 2.19463 16.7237 3.02349 18.0773L4.30271 17.294ZM4.09736 19.831C4.90898 21.1565 6.66844 21.5801 8.02941 20.8393L7.31225 19.5218C6.61872 19.8994 5.75112 19.6593 5.37658 19.0477L4.09736 19.831ZM19.5736 7.54032L19.6878 7.47818L18.9706 6.16073L18.8564 6.22287L19.5736 7.54032ZM7.31225 7.47817L7.42642 7.54032L8.14358 6.22286L8.02941 6.16072L7.31225 7.47817ZM19.6878 19.5218L19.5736 19.4597L18.8564 20.7771L18.9706 20.8393L19.6878 19.5218ZM7.42642 19.4597L7.31225 19.5218L8.02941 20.8393L8.14358 20.7771L7.42642 19.4597ZM4.09065 12.7393C4.69335 13.0674 4.69335 13.9326 4.09064 14.2607L4.80781 15.5782C6.45429 14.6819 6.4543 12.3181 4.80781 11.4218L4.09065 12.7393ZM8.14358 20.7771C8.76788 20.4373 9.5284 20.8892 9.5284 21.6H11.0284C11.0284 19.7512 9.05024 18.5757 7.42642 19.4597L8.14358 20.7771ZM17.4716 21.6C17.4716 20.8892 18.2321 20.4373 18.8564 20.7771L19.5736 19.4597C17.9498 18.5757 15.9716 19.7512 15.9716 21.6H17.4716ZM22.9094 14.2607C22.3067 13.9326 22.3067 13.0674 22.9094 12.7393L22.1922 11.4218C20.5457 12.3181 20.5457 14.6819 22.1922 15.5782L22.9094 14.2607ZM7.42642 7.54032C9.05025 8.42426 11.0284 7.24883 11.0284 5.4H9.5284C9.5284 6.1108 8.76788 6.5627 8.14358 6.22286L7.42642 7.54032ZM18.8564 6.22287C18.2321 6.56272 17.4716 6.11081 17.4716 5.4H15.9716C15.9716 7.24883 17.9498 8.42427 19.5736 7.54032L18.8564 6.22287ZM16.125 13.5C16.125 14.9497 14.9498 16.125 13.5 16.125V17.625C15.7782 17.625 17.625 15.7782 17.625 13.5H16.125ZM13.5 16.125C12.0503 16.125 10.875 14.9497 10.875 13.5H9.37501C9.37501 15.7782 11.2218 17.625 13.5 17.625V16.125ZM10.875 13.5C10.875 12.0503 12.0503 10.875 13.5 10.875V9.375C11.2218 9.375 9.37501 11.2218 9.37501 13.5H10.875ZM13.5 10.875C14.9498 10.875 16.125 12.0503 16.125 13.5H17.625C17.625 11.2218 15.7782 9.375 13.5 9.375V10.875Z" fill={color} />
    </svg>
  )
}

const DotIcon = ({ color = "#D9D9D9" }) => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="6" fill={color} fillOpacity="0.85098" />
    </svg>
  )
}

const ClassifyIcon = ({ color = "#A1A1A1" }) => {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.75 15.75L21.4436 13.3694C19.7255 12.1324 17.3775 12.2602 15.8039 13.6765L11.1961 17.8235C9.62248 19.2398 7.27447 19.3676 5.55638 18.1306L2.25 15.75M6.75 24.75H20.25C22.7353 24.75 24.75 22.7353 24.75 20.25V6.75C24.75 4.26472 22.7353 2.25 20.25 2.25H6.75C4.26472 2.25 2.25 4.26472 2.25 6.75V20.25C2.25 22.7353 4.26472 24.75 6.75 24.75ZM12.375 9.5625C12.375 11.1158 11.1158 12.375 9.5625 12.375C8.0092 12.375 6.75 11.1158 6.75 9.5625C6.75 8.0092 8.0092 6.75 9.5625 6.75C11.1158 6.75 12.375 8.0092 12.375 9.5625Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const ArrowIcon = ({ color = "#A1A1A1" }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 17L14 12L10 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}


const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [submenuFocus, setSubmenuFocus] = useState(false)
  const contentRef = useRef<HTMLUListElement | null>(null);
  const { authenticationUser } = useAuthenticationUserWebsite();
  const menus = [
    {
      name: "หน้าหลัก",
      icon: HomeIcon,
      path: "dashboard"
    },
    {
      name: "บัญชี",
      icon: AccountIcon,
      path: "account"
    },
    {
      name: "จัดการข้อมูล",
      icon: SettingIcon,
      submenu: [
        {
          name: "ไม้แต่ละพันธุ์",
          icon: DotIcon,
          path: "information_wood"
        },
        {
          name: "คู่มือใช้งานเบื้องต้น",
          icon: DotIcon,
          path: "manual"
        },
      ]
    },
    {
      name: "ตรวจสอบพันธุ์ไม้",
      icon: ClassifyIcon,
      path: "classify_wood"
    },
  ]

  const location = useLocation();

  useEffect(() => {
    authenticationUser();
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : '0';
    }
    const currentMenu = menus.find(menu => "/admin/" + menu.path === location.pathname);
    let submenuFound = false;
    if (currentMenu) {
      setTitle(currentMenu.name);
    } else {
      for (const menu of menus) {
        if (menu.submenu) {
          const foundSubmenu = menu.submenu.find(sub => "/admin/" + sub.path === location.pathname);
          if (foundSubmenu) {
            setTitle(foundSubmenu.name);
            submenuFound = true;
            break;
          }
        }
      }
    }
    if (!submenuFound) {
      setSubmenuFocus(false);
    } else {
      setSubmenuFocus(true);
    }

  }, [isOpen, location.pathname]);

  return (
    <div className="flex Kanit h-screen">
      <nav className='w-96 h-screen pt-4 border-r-2 flex flex-col justify-between'>
        <div>
          <div className='flex justify-center pb-6'>
            <img className='max-w-[84px]' src={LogoWoodify} alt="" />
          </div>
          <ul className='text-[#A1A1A1]'>
            {
              menus.map(menu => {
                const active = menu.name == title;
                const IconFucntion = menu.icon;
                if (menu.submenu == undefined) {
                  return (
                    <div key={menu.name} className='flex relative'>
                      {active && <div className='bg-[#61876E] w-1.5 h-full rounded-full absolute top-0 left-0 z-50'></div>}
                      <li className={`py-4 pl-7 ${active ? 'bg-gradient-to-r from-[#F1EFEF]' : ''} w-full`}>
                        <Link to={menu.path} className={`flex items-center gap-5 ${active ? 'text-[#3C6255]' : ''}`}>
                          <IconFucntion color={`${active ? '#3C6255' : '#A1A1A1'}`} />
                          <p className='text-lg'>
                            {menu.name}
                          </p>
                        </Link>
                      </li>
                    </div>
                  )
                }
                else {
                  return (
                    <li key={menu.name}>
                      <div className='flex relative'>
                        {submenuFocus && <div className='bg-[#61876E] w-1.5 h-full rounded-full absolute top-0 left-0 z-50'></div>}
                        <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center gap-5 w-full relative pl-7 py-4 ${submenuFocus ? 'bg-gradient-to-r from-[#F1EFEF]' : ''}`}>
                          <IconFucntion color={`${submenuFocus ? '#3C6255' : '#A1A1A1'}`} />
                          <p className='text-lg'>
                            {menu.name}
                          </p>
                          <img className={`absolute right-6 duration-500 ${isOpen ? 'rotate-90' : ''}`} src={Arrow} alt="" />
                        </button>
                      </div>
                      <ul
                        ref={contentRef}
                        className="transition-max-height duration-500 overflow-hidden"
                        style={{ maxHeight: 0 }}
                      >
                        {menu.submenu.map(submenu => {
                          const submenuActive = submenu.name == title;
                          const SubmenuIconFunction = submenu.icon;
                          return (
                            <li key={submenu.name} className='py-4 pl-9 text-lg'><Link to={submenu.path} className={`flex items-center gap-7 ${submenuActive ? 'text-[#3C6255]' : ''}`}><SubmenuIconFunction color={`${submenuActive ? '#3C6255' : '#D9D9D9'}`} /> {submenu.name}</Link></li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                }
              })
            }
          </ul>
        </div>
        <div className="border py-9 shadow-[0px_-1px_4px_0px_rgba(0,0,0,0.25)]">
          <div className="flex items-center mb-6 pl-7 ">
            <div className="w-50">
              <div className="w-20 h-20 rounded-full bg-[#D9D9D9]"></div>
            </div>
            <div className="py-2 pl-7">
                <p className="pb-2 font-semibold text-xl">ภูฟ้า รุจิภาสวัฒน์</p>
                <p className="text-lg font-semibold text-[#3C6255]">admin</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
              <div className="flex justify-center items-center">
                <img className='h-8' src={doorIcon} alt="" />
                <p className="pl-2 font-semibold text-xl">ออกจากระบบ</p>
              </div>
          </div>
        </div>
      </nav>
      <div className='px-7 w-full bg-[#F5F6FA] overflow-y-auto'>
        <div id="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;