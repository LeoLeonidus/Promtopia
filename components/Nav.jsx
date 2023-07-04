"use client"

import Link from "next/link"
import Image from "next/image"
import { useState , useEffect} from "react"
import { signIn,signOut,useSession,getProviders} from 'next-auth/react'

const Nav = () => {

    const  { data: session , status} = useSession(); // is logged in if exist session.user

    console.log("Nav.jsx status=",status,"---------");
 
    const [providers,setProviders] = useState(null)

    const [toggleDropDown , setToggleDropDown] = useState(false);

    
   useEffect(  () => {
        const fetchProviders = async () => {
            const response = await getProviders();
            console.log("response=",response,"-----------");
            setProviders(response);
        }
        
        fetchProviders();
   } , []);

   
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
                src="/assets/images/logo.svg" 
                alt="Promptopia Logo"
                width={30}
                height={30}
                className="object-contain"
            />
            <p className="logo_text">Promptopia</p>
        </Link>

        <Link href="/example">
            Example
        </Link>

        { console.log("providers=",providers)}

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">

            { session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href='/create-prompt' className="black_btn">
                        Create Post
                    </Link>
                    <button
                        type="button"
                        onClick={() => signOut({callbackUrl: '/'})}
                        className="outline_btn"
                    >
                        Sign Out
                    </button>
                    <Link href='/profile'>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="Profile"
                        />
                    </Link>
                </div>
            ) : (
                <>
                    { providers && Object.values(providers).map( provider => {
                        let imgSrc;
                        let imgAlt;
                        if (provider.id === "google") {
                            imgSrc = "btn_google.png";
                            imgAlt = "Google"
                        } else {
                            imgSrc = "btn_github.png"
                            imgAlt = "GitHub"
                        }

                            return (
                                <button
                                    type="button"
                                    key={provider.id}
                                    onClick={ () => signIn(provider.id)}
                                    // className="black_btn mr-2"
                                    className="mr-3"
                                >
                                    {/* <img src={`/assets/images/${imgSrc}`}
                                        alt={imgAlt} ></img> */}
                                        <Image 
                                            src={`/assets/images/${imgSrc}`}
                                            alt={imgAlt}
                                            width={200}
                                            height={100}
                                            className="object-contain"
                                        />
                                </button>
                                )
                        
                        }
                    )}
                </>
            )}

        </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">

            { session?.user ? (
                <div className="flex">
                    <Image 
                        src={session?.user.image}
                        alt="profile"
                        width={37}
                        height={37}
                        className="rounded-full"
                        onClick={ () => setToggleDropDown( (prev)  => !prev)}
                    />

                    {toggleDropDown && (
                        <div className="dropdown">
                            <Link
                                href='/profile'
                                className="dropdown_link"
                                onClick={() => setToggleDropDown(false)}
                            >
                                My Profile
                            </Link>
                            <Link
                                href='/create-prompt'
                                className="dropdown_link"
                                onClick={() => setToggleDropDown(false)}
                            >
                                Create Prompt
                            </Link>
                            <button
                                type="button"
                                className="mt-5 w-full black_btn"
                                onClick={ () => {
                                    setToggleDropDown(false)
                                    signOut({callbackUrl: '/'})
                                }}    
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    { providers && Object.values(providers).map( provider => {
                        let imgSrc;
                        let imgAlt;
                        if (provider.id === "google") {
                            imgSrc = "btn_google.png";
                            imgAlt = "Google"
                        } else {
                            imgSrc = "btn_github.png"
                            imgAlt = "GitHub"
                        }

                            return (
                                <button
                                    type="button"
                                    key={provider.id}
                                    onClick={ () => signIn(provider.id)}
                                    // className="black_btn mr-2"
                                    className="mr-3"
                                >
                                    {/* <img src={`/assets/images/${imgSrc}`}
                                        alt={imgAlt} ></img> */}
                                        <Image 
                                            src={`/assets/images/${imgSrc}`}
                                            alt={imgAlt}
                                            width={200}
                                            height={100}
                                            className="object-contain"
                                        />
                                </button>
                                )
                        
                        }
                    )}
                </>
            )}

        </div>
    </nav>
  )
}

export default Nav