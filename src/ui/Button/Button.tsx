import  { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import styles from './Button.module.scss'
import cn from 'classnames';
import { motion } from 'framer-motion';
import {VscArrowLeft,VscArrowRight} from "react-icons/vsc";
export interface ButtonProps extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
	children: React.ReactNode;
	appearance: 'primary' | 'ghost';
	arrow?: 'right' | 'left'| 'none';
}

const Button = ({appearance, arrow='none', className, children,...props}: ButtonProps) => {
  return (
    <button
        className={cn(styles.button, className, {
            [styles.primary]: appearance == 'primary',
            [styles.ghost]: appearance == 'ghost',
        })}
        {...props}
    >
         {arrow =='left'&& <VscArrowLeft/> }
        
        {children}
        {arrow =='right'&& <VscArrowRight/> }
    </button>
  )
}

export default Button