import React from 'react'

const SignUp = () => {
  return (
<>
  <div className="flex mt-2 min-h-screen flex-1 flex-col justify-center px-6 py-6 lg:px-8">
    <h2 className=" text-center text-3xl font-protest leading-9 tracking-tight text-white">
      Sign Up
    </h2>

    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="name" className="block text-sm font-medium font-protest leading-6 text-white">
            Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium font-protest leading-6 text-white">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block font-protest text-sm font-medium leading-6 text-white">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block font-protest text-sm font-medium leading-6 text-white">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 outline-none"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </div>
      </form>

      <p className=" text-start text-sm text-black font-protest">
        Already a member?{' '}
        <a href="#" className="leading-6 text-black hover:text-gray-600 font-protest">
          Sign In
        </a>
      </p>
      <p className='text-center mb-2 font-protest'>OR</p>
      <button
        type="submit"
        className="flex w-full  justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign Up with Google
      </button>
    </div>
  </div>
</>

  
  )
}

export default SignUp