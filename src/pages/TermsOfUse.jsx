import React, { useLayoutEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfUse = () => {
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
                        Terms of Use
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
                            1. Agreement to Terms
                        </h2>
                        <p className="text-gray-650 text-md">
                            By accessing or using the Budget Car website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            2. Use License
                        </h2>
                        <p className="text-gray-650 text-md mb-3">
                            Permission is granted to temporarily download one copy of the materials (information or software) on Budget Car's website for personal, non-commercial transitory viewing only. Under this license, you may not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-650 text-md">
                            <li>Modify or copy the materials.</li>
                            <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial).</li>
                            <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
                            <li>Remove any copyright or other proprietary notations from the materials.</li>
                            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            3. Disclaimers & Vehicle Listings
                        </h2>
                        <p className="text-gray-650 text-md mb-3">
                            Budget Car acts as Pune's most trusted preowned car dealership. However:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-650 text-md">
                            <li>Vehicle details, pricing, and availability are subject to change without prior notice.</li>
                            <li>While we make every effort to display accurate details (make, model, year, condition, specifications), some details may contain technical or typographical errors.</li>
                            <li>All preowned cars are certified, but buyers are highly encouraged to inspect vehicles physically and take test drives before completing a purchase.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            4. Bookings & Test Drives
                        </h2>
                        <p className="text-gray-650 text-md">
                            Booking a test drive or submitting an offer through the website does not constitute a binding legal contract of sale. Sale agreements are subject to physical verification, completion of paperwork, and full payment processing directly at our physical dealership office.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            5. Limitations of Liability
                        </h2>
                        <p className="text-gray-650 text-md">
                            In no event shall Budget Car or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Budget Car website, even if Budget Car or an authorized representative has been notified orally or in writing of the possibility of such damage.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            6. Governing Law
                        </h2>
                        <p className="text-gray-650 text-md">
                            Any claim relating to Budget Car's website shall be governed by the laws of India, specifically under the jurisdiction of courts in Pune, Maharashtra, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gray-900 rounded-full inline-block"></span>
                            7. Contact Information
                        </h2>
                        <p className="text-gray-650 text-md mb-4">
                            If you have questions or wish to clarify any parts of these terms, please contact us at:
                        </p>
                        <div className="bg-gray-50 border border-gray-150 p-6 rounded-xl space-y-2 text-sm text-gray-750">
                            <p className="font-bold text-gray-900 text-base">Budget Car Pune</p>
                            <p><strong>Address:</strong> Sr.No 30, Pune Nagar Rd, opp. Canara Bank, Viman Nagar, Pune 411014</p>
                            <p><strong>Phone:</strong> +91 99228 01959</p>
                            <p><strong>Email:</strong> budgetcar.pune@gmail.com</p>
                        </div>
                    </section>

                </div>
            </div>

            <Footer />
        </main>
    );
};

export default TermsOfUse;
