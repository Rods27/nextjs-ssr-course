'use client';

import Link from 'next/link';
import React from 'react';
import logoImg from '@/public/images/logo.png';
import Image from 'next/image';
import classes from './main-header.module.css';
import MainHeaderBackground from './header-background/main-header-background';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Browse Meals', href: '/meals' },
  { label: 'Foodies Community', href: '/community' },
];

export default function MainHeader() {
  const pathname = usePathname();

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg.src} alt="A plate with food on it" width={0} height={0} sizes="100vw" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={pathname === item.href ? classes.active : ''}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
