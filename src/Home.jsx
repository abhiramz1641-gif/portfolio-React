import React from 'react'
import LiquidEther from './LiquidEther';
import GlassSurface from './component/GlassSurface';
import { CodeBlock } from './components/animate-ui/primitives/animate/code-block';
import TiltedCard from './component/TitledCard';
import ShiningButton from '../components/animata/button/shining-button'
import Flipcard from '../components/animata/card/flip-card'


const Home = () => {

    return (
        <div>
            {/* Sticky Glass Header */}
            <div
                style={{
                    position: "sticky",
                    top: 100,
                    zIndex: 50,
                    paddingTop: "0px",
                }}
                className="w-full h-0 flex justify-center bg-black "
            >
                <div
                    style={{
                        marginTop: '-80px',
                        width: "60vw",
                        height: "auto",
                    }}
                >
                    <GlassSurface width="100%" height="100%" borderRadius={15}>
                        <div className="flex justify-between items-center text-white w-full sm:p-2 px-2 md:px-10">
                            <h1 style={{ fontFamily: "Anton" }} className=' text-2xl'>ABHIRAM</h1>
                            <div className=" lg:flex gap-8 hidden">
                                <a>Home</a>
                                <a>About</a>
                                <a>Projects</a>
                                <a>Skills</a>
                                <a>Contact</a>
                            </div>
                            <div className=' lg:hidden'>
                                <button className=' p-2 rounded border'>menu</button>
                            </div>
                        </div>
                    </GlassSurface>
                </div>
            </div>

            {/* LiquidEther Background Section */}
            <div
                className="bg-black"
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <LiquidEther
                    colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />

                <div style={{
                    top: '15%',
                    width: "95vw",
                    height: "80vh",
                }} className=' absolute mx-3 md:mx-7 grid xl:grid-cols-[3fr_2fr]'>
                    <div className=' py-10'>
                        <div id='glass' className=' grid md:grid-cols-2 items-center rounded-2xl lg:w-full lg:h-full pe-5 '>
                            <div className=' hidden lg:flex flex-wrap h-fit bg-transparent'>
                                <CodeBlock
                                    theme="dark"
                                    code="       import React from 'react';
    
        const Intro=()=> {
        
        const aboutMe = {
            name: 'Abhiram S Manoj',
            role: 'MERN Stack Developer',
        };
        console.log(aboutMe);
        
        return (
            <div>
                <p>Hi, Welcome to my Portfolio</p>
            </div>
        );
        }      
        export default Intro "
                                    lang="javascript"
                                    writing={true}
                                    charInterval={60}   // 60ms per char
                                    humanize={true}     // add small jitter
                                    jitter={40}         // up to ±40ms per step
                                    cursorChar={'|'}    // visual cursor
                                    delay={100}         // initial delay before typing starts
                                />

                                {/* single typing demo (original state) */}
                            </div>
                            <div className=' lg:hidden ps-10 text-white grid items-center justify-center'>
                                <h1 className=' mt-10 text-3xl font-bold mb-2'>Hi, I'am ABHIRAM S MANOJ</h1>
                                <h4 className=' text-2xl mb-5'>MERN STACK DEVELOPER</h4>
                                <p>Welcome To My Portfolio.</p>
                            </div>
                            <div>

                                <div className=' xl:hidden w-full h-full flex-wrap flex items-center p-10'>
                                    <img src="/images/me.png" alt="" className=' rounded-2xl' />
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className=' hidden w-full h-full xl:flex items-center p-10'>
                        <img src="/images/me.png" alt="" className=' w-full rounded-2xl' />
                    </div>
                </div>
            </div>

            {/* Content Below */}
            <div>
                <div style={{
                    width: '100%', height: "auto", background:
                        "linear-gradient(#000000, #1c1c1c, #000000)",
                }} className=" text-white grid md:grid-cols-2 gap-5 px-5 md:pt-20 md:pb-20 pb-10 lg:pe-20">

                    <div className=' justify-center pt-20'>

                        <div className='  flex justify-center justify-items-center md:block p-5 md:p-0'>
                            <TiltedCard
                                imageSrc="/images/about.png"
                                altText=""
                                captionText=""
                                containerHeight="420px"
                                containerWidth="300px"
                                imageHeight="420px"
                                imageWidth="300px"
                                rotateAmplitude={15}
                                scaleOnHover={1.2}
                                showMobileWarning={false}
                                showTooltip={true}
                                displayOverlayContent={true}
                                overlayContent={
                                    <p className="tilted-card-demo-text">

                                    </p>
                                }
                            />
                        </div>

                    </div>


                    <div className=' md:pt-20 p-5 md:p-0'>
                        <h1 style={{ fontFamily: "Anton" }} className=' text-xl sm:text-5xl md:text-8xl'>&lt; ABOUT ME /&gt;</h1>
                        <div style={{ fontFamily: 'Lato' }} className=' sm:text-2xl sm:mt-10'>
                            <p className=''>
                                Computer Science graduate and MERN stack developer skilled in building responsive web applications using
                                modern JavaScript frameworks. Proficient in React.js, Redux, and Tailwind CSS, with experience in developing
                                full-stack projects that integrate APIs and dynamic UI components.
                            </p>
                            <div className=' mt-3'><ShiningButton /></div>

                        </div>
                    </div>
                </div>
            </div>


            <div className=' bg-linear-to-b from-[#000000] to-[#1c1c1c] min-h-screen'>


                <div className=' pt-40 '>
                    <div className=' grid xl:grid-cols-[5fr_11fr]'>
                        <div className=' flex flex-col text-white justify-center items-center'>

                            <h1 style={{ fontFamily: "Anton" }} className=' text-white text-5xl md:text-6xl'>&lt; MY WORKS /&gt;</h1>
                            <p tyle={{ fontFamily: 'Lato' }} className=' text-xl p-5'>I have worked on multiple full-stack and front-end projects, with React, Redux, and REST APIs for efficient state and data management.Across all projects, I focused on clean UI design, optimized performance, reusable components, and modern JavaScript frameworks to deliver smooth and responsive user experiences.</p>


                        </div>
                        <div className=' grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                            <div className=' flex justify-center items-center'><Flipcard image='/images/p1.png' title='' description='An E-library Webapp using React,redux and Json server' link='https://book-store-redux-frontend.vercel.app/' /></div>
                            <div className=' flex justify-center items-center'><Flipcard image='/images/p2.png' title='' description='A job portal using React and json-server' link='https://jobify-app-tau.vercel.app/' /></div>
                            <div className=' flex justify-center items-center'><Flipcard image='/images/p3.png' title='' description='A Resume builder webapp using React json-server' link='https://resume-build-red-gamma.vercel.app/' /></div>
                            <div className=' flex justify-center items-center'><Flipcard image='/images/p4.png' title='' description='A parallax website on porsche 911 evolution' link='https://porsche-evolution-parallax-webpage.vercel.app/' /></div>
                            <div className=' flex justify-center items-center'><Flipcard image='/images/p5.png' title='' description='Weather app using REST API' link='https://weather-app-seven-beryl-49.vercel.app/' /></div>
                            <div className=' flex justify-center items-center'><Flipcard image='/images/p6.png' title='' description='Simple intrest calculator using React' link='https://simple-interest-calculator-six-chi.vercel.app/' /></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home