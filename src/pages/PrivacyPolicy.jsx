import React, { useLayoutEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-[#f6f7fb] text-gray-900 pt-28">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-6 pb-20">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-xs font-bold text-red-650 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                        Legal
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mt-4 text-gray-900">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-gray-500 text-sm">
                        Last Updated: June 26, 2026
                    </p>
                </div>

                {/* Content Container */}
                <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-150 shadow-xs space-y-8 leading-relaxed">
                    
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            1. Introduction
                        </h2>
                        <p className="text-gray-650 text-md">
                            Welcome to <strong>BudgetCarHub</strong> ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices regarding your personal information, please contact us at <a href="mailto:budgetcar.hub.pune01@gmail.com" className="text-red-650 hover:underline">budgetcar.hub.pune01@gmail.com</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            2. Information We Collect
                        </h2>
                        <p className="text-gray-650 text-md mb-3">
                            We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-650 text-md">
                            <li><strong>Personal Details:</strong> Name, phone number, email address, physical address, and WhatsApp number.</li>
                            <li><strong>Car Specifications:</strong> When selling your car, we collect details about your vehicle (make, model, year, run kilometers, price expectation, etc.).</li>
                            <li><strong>Communication Data:</strong> Inquiries sent through our contact forms or via WhatsApp/phone requests.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            3. How We Use Your Information
                        </h2>
                        <p className="text-gray-650 text-md mb-3">
                            We use the personal information collected via our website for various business purposes described below:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-650 text-md">
                            <li>To facilitate car bookings, inquiries, and book test drives.</li>
                            <li>To connect buyers and sellers of certified pre-owned vehicles.</li>
                            <li>To send you updates, answers to your inquiries, or marketing materials (with your consent).</li>
                            <li>To request feedback or review comments regarding our dealership.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            4. Information Sharing & Disclosure
                        </h2>
                        <p className="text-gray-650 text-md">
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell, rent, or trade your personal details to third parties for marketing purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            5. Security of Your Information
                        </h2>
                        <p className="text-gray-650 text-md">
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            6. Your Choices & Rights
                        </h2>
                        <p className="text-gray-650 text-md">
                            Depending on your location, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please submit a request by contacting us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            7. Contact Us
                        </h2>
                        <p className="text-gray-650 text-md mb-4">
                            If you have questions or comments about this policy, you may contact us at:
                        </p>
                        <div className="bg-gray-50 border border-gray-150 p-6 rounded-xl space-y-2 text-sm text-gray-750">
                            <p className="font-bold text-gray-900 text-base">BudgetCarHub Pune</p>
                            <p><strong>Address:</strong> Sr.No 30, Pune Nagar Rd, opp. Canara Bank, Viman Nagar, Pune 411014</p>
                            <p><strong>Phone:</strong> +91 99228 01959</p>
                            <p><strong>Email:</strong> budgetcar.hub.pune01@gmail.com</p>
                        </div>
                    </section>

                </div>
            </div>

            <Footer />
        </main>
    );
};

export default PrivacyPolicy;
