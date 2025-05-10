'use client';
import "@/app/shadow-top.css";
import Link from 'next/link';
import Image from 'next/image';
import { EmailIcon, InstagramIcon, LocationIcon, PhoneIcon, WhatsAppIcon } from './FooterIcons';
import { Copy } from 'lucide-react';
import React, { useState } from 'react';
import { email, phoneNumber, spaceInNumber } from '../utils';

const Footer = () => {
    const [copied, setCopied] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(phoneNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    }; return (
        <footer className="shadow-top mt-10 bg-white border-t border-t-red-700 text-red-900 py-8 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_3fr] gap-10 lg:gap-16 items-start">
                    {/* Logo and About */}
                    <div className="space-y-2 flex flex-col items-start md:col-span-1">
                        <div className="flex items-center">
                            <div className="relative mr-2">
                                <Image
                                    src="/Logo.png"
                                    alt="Blood Heroes Society Logo"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl text-red-900">Blood Heroes</span>
                        </div>
                        <p className="text-red-800 text-left">
                            Bringing people together to save lives, spread awareness, and make blood donation a habit through the Blood Heroes community                        </p>
                        <div className="flex space-x-4 mt-2">
                            <SocialIcon href="https://www.instagram.com/bloodheroesgmc?igsh=MWhvYTFxbm9lOWNjZw==" icon="instagram" />
                            <SocialIcon href="https://chat.whatsapp.com/HKQ4CswhYjJKlGkozmus0g" icon="whatsapp" />
                        </div>
                    </div>

                    {/* Contact Us */}
                    <div className="flex flex-col lg:mt-4 items-start w-full md:col-span-2 lg:col-span-1">
                        <h3 className="font-semibold text-lg mb-4 text-red-900">Contact Us</h3>
                        <address className="not-italic space-y-4 text-red-800 w-full">
                            <p className="flex items-start">
                                <LocationIcon className="mt-1 mr-2 flex-shrink-0" />
                                <span>Gondalanwala Village, Ali pur Chatha Road, Gujranwala Punjab Pakistan</span>
                            </p>
                            <p className="flex items-center flex-wrap">
                                <EmailIcon className="mr-2 flex-shrink-0" />
                                <div>
                                    <a href="mailto:gmcislamicsociety1199@gmail.com" className="hover:text-red-600 transition-colors break-all">
                                        {email}
                                    </a>
                                    <button onClick={handleCopyEmail} className="ml-2 cursor-pointer hover:text-red-600 text-red-800 transition" aria-label="Copy email address">
                                        <Copy size={18} />
                                    </button>
                                </div>
                                {copiedEmail && (
                                    <span className="ml-2 text-xs bg-red-100 text-red-900 px-2 py-1 rounded shadow animate-bounce">Copied!</span>
                                )}
                            </p>
                            <p className="flex items-center flex-wrap">
                                <PhoneIcon className="mr-2 flex-shrink-0" />
                                <div>
                                    <span className="text-red-900 font-semibold">Dr. Kashif Shahzad: &nbsp;</span>
                                    <a href={`tel:${phoneNumber}`} className="hover:text-red-600 transition-colors">
                                        {spaceInNumber(phoneNumber)}
                                    </a>
                                    <button onClick={handleCopy} className="ml-2 cursor-pointer hover:text-red-600 text-red-800 transition" aria-label="Copy phone number">
                                        <Copy size={18} />
                                    </button>
                                </div>
                                {copied && (
                                    <span className="ml-2 text-xs bg-red-100 text-red-900 px-2 py-1 rounded shadow animate-bounce">Copied!</span>
                                )}
                            </p>
                        </address>
                        <div className="mt-4 rounded max-w-[800px] overflow-hidden shadow-lg w-full h-48 md:h-56">
                            <iframe
                                title="Gujranwala Medical College Map"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d54017.51389275296!2d74.13238!3d32.201681!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f2f2c72a3040b%3A0x73d5df7d05f93168!2sGujranwala%20Medical%20College!5e0!3m2!1sen!2sus!4v1745758103569!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Footer Link Component
const FooterLink = ({ href, label }: { href: string; label: string }) => {
    return (
        <li>
            <Link href={href} className="text-red-800 hover:text-red-600 transition-colors">
                {label}
            </Link>
        </li>
    );
};

// Social Media Icon Component
const SocialIcon = ({ href, icon }: { href: string; icon: string }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-full bg-red-900 flex items-center justify-center hover:bg-red-700 transition-colors"
        >
            {icon === 'instagram' && <InstagramIcon />}
            {icon === 'whatsapp' && <WhatsAppIcon />}
        </a>
    );
};


export default Footer;