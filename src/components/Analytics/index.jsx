'use client';

import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';

const Analytics = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_HOTJAR_ID) {
      Hotjar.init(Number(process.env.NEXT_PUBLIC_HOTJAR_ID), 6);
    }
  }, []);

  return null;
};

export default Analytics;
