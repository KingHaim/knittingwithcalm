import React from 'react';
import { Heart, Sparkles, Wind, BookOpen } from 'lucide-react';

export default function About() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gray-50 overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl lg:text-6xl font-primary mb-6 text-gray-900 leading-tight">
                            About Knitting with Calm
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed font-light">
                            Behind the name Knitting with Calm you will find <span className="font-semibold text-gray-900">Ainhoa Sanchez</span>,
                            who develops knitting patterns for babies, children, and women.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-24">

                        {/* Intro & Origin */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                                    <Heart size={14} /> The Origin
                                </div>
                                <h2 className="text-3xl font-primary text-gray-900">Sharing Designs with Soul</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Knitting with Calm was established to share designs that are not just beautiful to wear, but peaceful to make.
                                    I have always felt a deep connection between creativity and the work of my hands.
                                    Combining my two great passions—Design and Knitting—felt like a natural evolution.
                                </p>
                            </div>
                            <div className="bg-gray-50 aspect-square rounded-3xl flex items-center justify-center p-12 border border-gray-100">
                                <div className="text-center">
                                    <p className="text-4xl font-primary text-gray-300 italic">"Knitting is more than a hobby; it is a way of grounding myself."</p>
                                </div>
                            </div>
                        </div>

                        {/* Questions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">

                            {/* Q1 */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                                    <Wind className="text-primary" size={24} />
                                    When and where did you start knitting?
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Whether I am designing a cozy set for a newborn or an elegant top for myself, the process is always rooted in a sense of tranquility. For me, creativity is a journey of grounding and self-discovery through yarn and needles.
                                </p>
                            </div>

                            {/* Q2 */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                                    <Sparkles className="text-primary" size={24} />
                                    What is your design philosophy?
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    As the name suggests, I believe knitting should be a calming experience. When I design, I look for a balance between engaging techniques and a rhythmic flow that allows you to relax into the stitches.
                                </p>
                            </div>

                            {/* Detail section */}
                            <div className="md:col-span-2 bg-gray-50 rounded-[2.5rem] p-10 lg:p-16 border border-gray-100">
                                <div className="max-w-2xl">
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        For my children’s patterns, practicality is key. I know how fast little ones grow, so I often design garments with thoughtful details—like foldable cuffs or adjustable waistbands—that allow the knitwear to grow alongside the child.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed font-medium text-lg italic text-primary">
                                        "For women, I focus on feminine silhouettes, delicate details like lace ruffles or bobbles, and seamless top-down construction that makes the process intuitive."
                                    </p>
                                </div>
                            </div>

                            {/* Q3 */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                                    <BookOpen className="text-primary" size={24} />
                                    Where do you find inspiration?
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Inspiration often comes from the world around me here in Spain. It might be the lush greenery of a forest that inspires a textured cardigan, or the intricate architectural arches of the Alhambra in Granada that find their way into a lace motif. I try to translate these visual impressions into stitches that tell a story.
                                </p>
                            </div>

                            {/* Q4 */}
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-gray-900">
                                    What is the most important thing?
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    It is essential to me that a pattern is not just a set of instructions, but a guide that anyone can follow with confidence. I put a lot of effort into ensuring my patterns are clear and accessible, often accompanying them with detailed video tutorials.
                                </p>
                            </div>
                        </div>

                        {/* Closing */}
                        <div className="text-center pt-10 border-t border-gray-100">
                            <p className="text-2xl font-primary text-gray-900 mb-4 max-w-2xl mx-auto">
                                "I want the final result to be something you treasure—a garment knitted with calm, to be worn with love."
                            </p>
                            <p className="text-gray-500 font-medium">
                                My goal is for you to feel supported every step of the way.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
