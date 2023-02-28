import React from 'react';
import { motion } from 'framer-motion';

interface ITransistionAnimation extends React.PropsWithChildren {
  key?: any;
}
export default function TransistionAnimation({ key, children }: ITransistionAnimation) {
  return (
    <motion.div
      key={key}
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 32 }}
      exit={{ opacity: 0, x: -32 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
