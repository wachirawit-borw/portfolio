"use client";
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaClock, FaLanguage } from 'react-icons/fa';
import AnimateOnScroll from '@/components/AnimateOnScroll';

export default function Contact() {
    const contactInfo = [
        {
            icon: <FaEnvelope className="w-5 h-5" />,
            label: "Email",
            value: "wachirawit.borw@gmail.com",
            href: "mailto:wachirawit.borw@gmail.com"
        },
        {
            icon: <FaLinkedin className="w-5 h-5" />,
            label: "LinkedIn",
            value: "linkedin.com/in/zurfrk",
            href: "https://linkedin.com/in/zurfrk"
        },
        {
            icon: <FaGithub className="w-5 h-5" />,
            label: "GitHub",
            value: "github.com/wachirawit-borw",
            href: "https://github.com/wachirawit-borw"
        }
    ];

    const personalInfo = [
        {
            icon: <FaMapMarkerAlt className="w-5 h-5" />,
            label: "Location",
            value: "Bangkok, Thailand",
            subtext: "GMT+7 (ICT)"
        },
        {
            icon: <FaClock className="w-5 h-5" />,
            label: "Availability",
            value: "Open to opportunities",
            subtext: "Remote & On-site"
        },
        {
            icon: <FaLanguage className="w-5 h-5" />,
            label: "Languages",
            value: "Thai (Native), English (Intermediate)",
            subtext: "Ready for global collaboration"
        }
    ];

    const interests = [
        {
            title: "🚀 Space Technology",
            description: "Following SpaceX missions and space exploration developments"
        },
        {
            title: "🤖 AI & Machine Learning",
            description: "Exploring the latest in AI advancements and LLM technologies"
        },
        {
            title: "🌱 Open Source",
            description: "Contributing to the developer community and open-source projects"
        },
        {
            title: "🎮 Gaming Tech",
            description: "Interest in game development and interactive web experiences"
        },
        {
            title: "📱 Mobile Innovation",
            description: "Keeping up with mobile development trends and PWA technologies"
        },
        {
            title: "🌍 Sustainability",
            description: "Passionate about green technology and sustainable development"
        }
    ];

    return (
        <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <AnimateOnScroll>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#84e0ff] to-[#dabaff]">
                            Let&apos;s Connect
                        </h2>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            Ready to collaborate on your next project? Let&apos;s build something amazing together.
                        </p>
                    </div>
                </AnimateOnScroll>

                <div className="max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <AnimateOnScroll>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {contactInfo.map((contact, index) => (
                                <a
                                    key={index}
                                    href={contact.href}
                                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="group bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:bg-black/60 hover:scale-105"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#84e0ff] to-[#dabaff] rounded-lg flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform duration-300">
                                            {contact.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-400 mb-1">
                                                {contact.label}
                                            </p>
                                            <p className="text-white font-semibold truncate group-hover:text-[#84e0ff] transition-colors duration-300 text-sm">
                                                {contact.value}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </AnimateOnScroll>

                    {/* Personal Information */}
                    <AnimateOnScroll>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {personalInfo.map((info, index) => (
                                <div
                                    key={index}
                                    className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#84e0ff] to-[#dabaff] rounded-lg flex items-center justify-center text-slate-900">
                                            {info.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-400 mb-1">
                                                {info.label}
                                            </p>
                                            <p className="text-white font-semibold text-sm mb-1">
                                                {info.value}
                                            </p>
                                            <p className="text-gray-400 text-xs">
                                                {info.subtext}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimateOnScroll>

                    {/* Interests & Passions */}
                    <AnimateOnScroll>
                        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                Interests & Passions
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {interests.map((interest, index) => (
                                    <div
                                        key={index}
                                        className="bg-black/30 rounded-xl p-4 hover:bg-black/50 transition-all duration-300 group"
                                    >
                                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#84e0ff] transition-colors duration-300">
                                            {interest.title}
                                        </h4>
                                        <p className="text-gray-300 text-sm">
                                            {interest.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}