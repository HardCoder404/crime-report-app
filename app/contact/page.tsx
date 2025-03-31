"use client"
import useWindowSize from '@/hooks/useWindowSize';
import { MapPin, Phone, Mail, Printer } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const { width } = useWindowSize();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess('Thank you for reaching out. We will shortly connect with you.');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => {
            setSuccess('');
        }, 3000);
    };

    return (
        <>
            <section className="relative overflow-hidden rounded-2xl p-8 sm:p-12">
                <div className="absolute inset-0 bg-zinc-900 -z-10" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Section */}
                    {
                        width > 768 &&
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Visit Office */}
                            <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                                <MapPin size={28} className="text-blue-400" />
                                <p className="text-white text-lg font-semibold mt-2">Visit office</p>
                                <p className="text-zinc-400 text-sm text-center">
                                    123 Main Street, Delhi, India
                                </p>
                            </div>

                            {/* Call Us */}
                            <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                                <Phone size={28} className="text-blue-400" />
                                <p className="text-white text-lg font-semibold mt-2">Call us</p>
                                <p className="text-zinc-400 text-sm">+91 9854786525</p>
                            </div>

                            {/* Chat to Us */}
                            <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                                <Mail size={28} className="text-blue-400" />
                                <p className="text-white text-lg font-semibold mt-2">Chat to us</p>
                                <p className="text-zinc-400 text-sm">support@SafeReport.com</p>
                            </div>

                            {/* Fax */}
                            <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                                <Printer size={28} className="text-blue-400" />
                                <p className="text-white text-lg font-semibold mt-2">Fax</p>
                                <p className="text-zinc-400 text-sm">+1-548-2588</p>
                            </div>
                        </div> 
                    }

                    {/* Right Section */}
                    <div className='p-5 rounded-2xl bg-gradient-to-br from-sky-500/20 via-blue-500/10 to-transparent backdrop-blur-md'>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Contact Us
                        </h2>
                        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone No."
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                required
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                rows={4}
                                className="w-full resize-none rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                required
                            />
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                            >
                                Send Message
                            </button>
                        </form>
                        {success && (
                            <div className="mt-4 text-green-500 text-center text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                {success}
                            </div>
                        )}
                    </div>

                    {
                        width <= 768 &&
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Visit Office */}
                            <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                                <MapPin size={28} className="text-blue-400" />
                                <p className="text-white text-lg font-semibold mt-2">Visit office</p>
                                <p className="text-zinc-400 text-sm text-center">
                                    123 Main Street, Delhi, India
                                </p>
                            </div>

                            {/* Call Us */}
                            <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                                <Phone size={28} className="text-blue-400" />
                                <p className="text-white text-lg font-semibold mt-2">Call us</p>
                                <p className="text-zinc-400 text-sm">+91 9854786525</p>
                            </div>

                            {/* Chat to Us */}
                            <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                                <Mail size={28} className="text-blue-400" />
                                <p className="text-white text-lg font-semibold mt-2">Chat to us</p>
                                <p className="text-zinc-400 text-sm">support@SafeReport.com</p>
                            </div>

                            {/* Fax */}
                            <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                                <Printer size={28} className="text-blue-400" />
                                <p className="text-white text-lg font-semibold mt-2">Fax</p>
                                <p className="text-zinc-400 text-sm">+1-548-2588</p>
                            </div>
                        </div>
                    }
                </div>
            </section>

            <section className="bg-transparent">
                <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                    <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                        <div className="px-5 py-2">
                            <a href="#" className="text-base leading-6 hover:text-white text-gray-500">
                                About
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="#" className="text-base leading-6 text-gray-500 hover:text-white">
                                Blog
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="#" className="text-base leading-6 text-gray-500 hover:text-white">
                                Team
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="#" className="text-base leading-6 text-gray-500 hover:text-white">
                                Pricing
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a href="#" className="text-base leading-6 text-gray-500 hover:text-white">
                                Terms
                            </a>
                        </div>
                    </nav>
                    <div className="flex justify-center mt-8 space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Facebook</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Instagram</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Twitter</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                        </a>
                    </div>
                    <p className="mt-8 text-base leading-6 text-center text-gray-400">
                        © {new Date().getFullYear()} SafeReport, Inc. All rights reserved.
                    </p>
                </div>
            </section>
        </>
    );
}
