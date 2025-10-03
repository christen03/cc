import { Indie_Flower, Caveat } from 'next/font/google';

export const Indie = Indie_Flower({
    subsets: ['latin'],
    weight: '400', // Single weight for simplicity
    variable: '--font-indie',
});


export const CaveatFont = Caveat({
    subsets: ['latin'],
    weight: ['400', '700'], // Light to bold for emphasis
    variable: '--font-caveat', // Optional: For Tailwind CSS vars
});
