'use client';
import React, { useState, useEffect, useRef } from 'react';
import './Navbar.scss';
import Image from 'next/image';
import { logoModal, streakHungryCat } from '@/app/assets/exportData';
import Link from 'next/link';
import { NavbarProps } from '@/app/types/global.types';

export const Navbar: React.FC<NavbarProps> = ({ treatCount = 0 }) => {
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Auto-hide mobile search when going to tablet or desktop
      if (window.innerWidth >= 768) {
        // tablet and desktop breakpoints
        setIsMobileSearchVisible(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileSearchVisible(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      document.addEventListener('mousedown', handleClickOutside);
      handleResize();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, []);

  const toggleMobileSearch = () => {
    setIsMobileSearchVisible(!isMobileSearchVisible);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          {/* Only show button on mobile */}
          {windowWidth < 768 && (
            <button
              ref={searchButtonRef}
              className="navbar__search-button navbar__icon-button"
              onClick={toggleMobileSearch}
              aria-label="Toggle search"
            >
              <svg
                className="navbar__icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <Link href="/" className="navbar__logo-link">
            <Image
              src={logoModal}
              width={32}
              height={32}
              alt="Superboard"
              className="navbar__logo"
            />
          </Link>
        </div>

        <div
          ref={searchContainerRef}
          className={`navbar__center navbar__search-container ${isMobileSearchVisible ? 'mobile-visible' : ''}`}
        >
          <div className="navbar__search">
            <svg
              className="navbar__search-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="search"
              placeholder="Search Quests"
              className="navbar__search-input"
              aria-label="Search quests"
            />
          </div>
        </div>

        <div className="navbar__right">
          <div className="navbar__treat-counter">
            <div className="navbar__treat-icon">
              <div className="navbar__treat-icon-wrapper">
                <div className="fade h-full w-full" data-loaded="true">
                  <Image
                    src={streakHungryCat}
                    alt="Treats"
                    width={1080}
                    height={720}
                    className="navbar__treat-icon-img"
                  />
                </div>
              </div>
            </div>
            <div className="navbar__treat-content">
              <span className="navbar__treat-text">
                <span className="navbar__treat-text-main">TREAT</span>
                <span className="navbar__treat-text-sub">COUNT</span>
              </span>
              <span className="navbar__treat-count">{treatCount}</span>
            </div>
          </div>

          <button className="navbar__user-menu">
            <div className="navbar__user-avatar">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};
